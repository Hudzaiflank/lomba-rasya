import { create } from "zustand";

const STORAGE_KEY = "finedu_app_state_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // ignore quota errors
  }
}

const defaultState = {
  auth: {
    currentUserId: null,
    usersById: {}, // { [userId]: { id, name, createdAt } }
  },
  settings: {
    defaultDailyAllowance: 10000, // Rp10.000
    schoolDays: [1, 2, 3, 4, 5], // Mon-Fri (date-fns: 0=Sun)
    createdAt: Date.now(),
  },
  goals: {
    byId: {}, // { [goalId]: { id, title, targetAmount, savedAmount, createdAt, isActive, color } }
    allIds: [],
    activeGoalId: null,
  },
  wallet: {
    // keyed by yyyy-MM-dd
    days: {
      // '2025-10-15': { date, allowance: number, bonus: number, expenses: [{ id, label, amount }], leftoverAllocated: boolean }
    },
  },
};

function migrate(state) {
  if (!state) return defaultState;
  // basic shallow migration and defaults
  return {
    ...defaultState,
    ...state,
    auth: { ...defaultState.auth, ...(state.auth || {}) },
    settings: { ...defaultState.settings, ...(state.settings || {}) },
    goals: { ...defaultState.goals, ...(state.goals || {}) },
    wallet: { ...defaultState.wallet, ...(state.wallet || {}) },
  };
}

function formatYmd(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export const useAppStore = create((set, get) => {
  const initial = migrate(loadState());

  const persist = (recipe) => {
    set((prev) => {
      const next = typeof recipe === "function" ? recipe(prev) : recipe;
      const merged = { ...prev, ...next };
      saveState(merged);
      return merged;
    });
  };

  const api = {
    // state
    ...initial,

    // AUTH
    registerUser: (name, password) => {
      const id = `u_${
        crypto.randomUUID?.() || Math.random().toString(36).slice(2)
      }`;
      persist(({ auth }) => {
        const user = { id, name, password, createdAt: Date.now() };
        const usersById = { ...auth.usersById, [id]: user };
        return { auth: { currentUserId: id, usersById } };
      });
      return id;
    },
    loginUser: (name, password) => {
      const { auth } = get();
      const found = Object.values(auth.usersById).find((u) => u.name === name);
      if (found && (!found.password || found.password === password)) {
        persist({ auth: { ...auth, currentUserId: found.id } });
        return found.id;
      }
      return null;
    },
    logout: () =>
      persist(({ auth }) => ({ auth: { ...auth, currentUserId: null } })),

    // SETTINGS
    setDefaultDailyAllowance: (amount) =>
      persist(({ settings }) => ({
        settings: { ...settings, defaultDailyAllowance: Number(amount) || 0 },
      })),
    setSchoolDays: (days) =>
      persist(({ settings }) => ({
        settings: { ...settings, schoolDays: days },
      })),

    // GOALS
    addGoal: ({ title, targetAmount, color }) => {
      const id = `g_${
        crypto.randomUUID?.() || Math.random().toString(36).slice(2)
      }`;
      persist(({ goals }) => {
        const goal = {
          id,
          title,
          targetAmount: Number(targetAmount) || 0,
          savedAmount: 0,
          createdAt: Date.now(),
          isActive: false,
          color,
        };
        const byId = { ...goals.byId, [id]: goal };
        const allIds = [...goals.allIds, id];
        const activeGoalId = goals.activeGoalId || id; // first goal becomes active by default
        byId[activeGoalId] = { ...byId[activeGoalId], isActive: true };
        return { goals: { byId, allIds, activeGoalId } };
      });
      return id;
    },
    removeGoal: (goalId) => {
      persist(({ goals }) => {
        const byId = { ...goals.byId };
        const allIds = goals.allIds.filter((id) => id !== goalId);
        delete byId[goalId];
        let { activeGoalId } = goals;
        if (activeGoalId === goalId) {
          activeGoalId = allIds[0] || null;
          if (activeGoalId && byId[activeGoalId])
            byId[activeGoalId] = { ...byId[activeGoalId], isActive: true };
        }
        return { goals: { byId, allIds, activeGoalId } };
      });
    },
    setActiveGoal: (goalId) => {
      persist(({ goals }) => {
        const byId = Object.fromEntries(
          Object.entries(goals.byId).map(([id, g]) => [
            id,
            { ...g, isActive: id === goalId },
          ])
        );
        return { goals: { ...goals, byId, activeGoalId: goalId } };
      });
    },
    addSavingToGoal: (goalId, amount) => {
      persist(({ goals }) => {
        const g = goals.byId[goalId];
        if (!g) return { goals };
        const byId = {
          ...goals.byId,
          [goalId]: {
            ...g,
            savedAmount: (g.savedAmount || 0) + (Number(amount) || 0),
          },
        };
        return { goals: { ...goals, byId } };
      });
    },

    // WALLET / SPENDING
    ensureDay: (date) => {
      const d = formatYmd(date || Date.now());
      const { wallet, settings } = get();
      const existing = wallet.days[d];
      if (existing) return existing;
      const isSchoolDay = settings.schoolDays.includes(new Date(d).getDay());
      const day = {
        date: d,
        allowance: isSchoolDay ? settings.defaultDailyAllowance : 0,
        bonus: 0,
        expenses: [],
        leftoverAllocated: false,
      };
      persist(({ wallet: w }) => ({
        wallet: { ...w, days: { ...w.days, [d]: day } },
      }));
      return day;
    },
    addExpense: ({ date, label, amount }) => {
      const d = formatYmd(date || Date.now());
      persist(({ wallet }) => {
        const day = wallet.days[d] || {
          date: d,
          allowance: 0,
          bonus: 0,
          expenses: [],
          leftoverAllocated: false,
        };
        const expense = {
          id: `e_${Math.random().toString(36).slice(2)}`,
          label,
          amount: Number(amount) || 0,
        };
        const updated = {
          ...day,
          expenses: [...(day.expenses || []), expense],
        };
        return {
          wallet: { ...wallet, days: { ...wallet.days, [d]: updated } },
        };
      });
    },
    addBonus: ({ date, amount }) => {
      const d = formatYmd(date || Date.now());
      persist(({ wallet }) => {
        const day = wallet.days[d] || {
          date: d,
          allowance: 0,
          bonus: 0,
          expenses: [],
          leftoverAllocated: false,
        };
        const updated = {
          ...day,
          bonus: (day.bonus || 0) + (Number(amount) || 0),
        };
        return {
          wallet: { ...wallet, days: { ...wallet.days, [d]: updated } },
        };
      });
    },
    getRemainingForDay: (date) => {
      const d = formatYmd(date || Date.now());
      const { wallet } = get();
      const day = wallet.days[d];
      if (!day) return 0;
      const spent = (day.expenses || []).reduce(
        (s, e) => s + (Number(e.amount) || 0),
        0
      );
      return (Number(day.allowance) || 0) + (Number(day.bonus) || 0) - spent;
    },
    allocateLeftoverToActiveGoal: (date) => {
      const d = formatYmd(date || Date.now());
      const { goals } = get();
      const activeId = goals.activeGoalId;
      if (!activeId) return;
      const remaining = get().getRemainingForDay(d);
      if (remaining <= 0) return;
      get().addSavingToGoal(activeId, remaining);
      persist(({ wallet }) => {
        const day = wallet.days[d];
        if (!day) return { wallet };
        const updated = { ...day, leftoverAllocated: true };
        return {
          wallet: { ...wallet, days: { ...wallet.days, [d]: updated } },
        };
      });
    },

    // ANALYTICS / ESTIMATES
    getSavingsAverage14d: (endDate) => {
      const end = new Date(endDate || Date.now());
      const { wallet } = get();
      let total = 0;
      let days = 0;
      for (let i = 0; i < 14; i += 1) {
        const d = new Date(end);
        d.setDate(end.getDate() - i);
        const key = formatYmd(d);
        const day = wallet.days[key];
        if (!day) continue;
        const spent = (day.expenses || []).reduce(
          (s, e) => s + (Number(e.amount) || 0),
          0
        );
        const remaining =
          (Number(day.allowance) || 0) + (Number(day.bonus) || 0) - spent;
        total += Math.max(0, remaining);
        days += 1;
      }
      return days > 0 ? total / days : 0;
    },
    estimateGoalEta: (goalId) => {
      const { goals } = get();
      const g = goals.byId[goalId];
      if (!g) return null;
      const remaining = Math.max(
        0,
        (Number(g.targetAmount) || 0) - (Number(g.savedAmount) || 0)
      );
      const avg = get().getSavingsAverage14d();
      if (avg <= 0) return null;
      const days = Math.ceil(remaining / avg);
      const eta = new Date();
      eta.setDate(eta.getDate() + days);
      return { days, date: eta.toISOString() };
    },
  };

  // do not call get() or actions here; pages will ensure day lazily

  return api;
});

export function selectCurrentUser(state) {
  const { currentUserId, usersById } = state.auth;
  return currentUserId ? usersById[currentUserId] : null;
}

export function selectActiveGoal(state) {
  const activeGoalId = state?.goals?.activeGoalId;
  const byId = state?.goals?.byId || {};
  return activeGoalId ? byId[activeGoalId] : null;
}

export function selectGoalsList(state) {
  const ids = state?.goals?.allIds || [];
  const byId = state?.goals?.byId || {};
  return ids.map((id) => byId[id]).filter(Boolean);
}

export function formatCurrency(idr) {
  const n = Number(idr) || 0;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function brandColors() {
  return {
    primary: "#71CB90",
    greenLight: "#B5E8A4",
    coralLight: "#FFC8C4",
    pinkLight: "#FFB0C4",
    pink: "#FF97C4",
  };
}

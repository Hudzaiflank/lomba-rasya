import { useMemo, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  useAppStore,
  selectActiveGoal,
  formatCurrency,
  brandColors,
} from "../store/useAppStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const colors = brandColors();
  const activeGoal = useAppStore(selectActiveGoal);
  const goals = useAppStore((s) => s.goals);
  const settings = useAppStore((s) => s.settings);
  const getSavingsAverage14d = useAppStore((s) => s.getSavingsAverage14d);
  const estimateGoalEta = useAppStore((s) => s.estimateGoalEta);
  const setDefaultDailyAllowance = useAppStore(
    (s) => s.setDefaultDailyAllowance
  );
  const ensureDay = useAppStore((s) => s.ensureDay);
  const getRemainingForDay = useAppStore((s) => s.getRemainingForDay);

  const [simAllowance, setSimAllowance] = useState(
    settings.defaultDailyAllowance
  );
  const [simDailySaving, setSimDailySaving] = useState(
    Math.round(getSavingsAverage14d())
  );

  useEffect(() => {
    ensureDay();
  }, [ensureDay]);

  const progressPct = useMemo(() => {
    if (!activeGoal) return 0;
    const pct =
      (activeGoal.savedAmount / Math.max(1, activeGoal.targetAmount)) * 100;
    return Math.min(100, Math.round(pct));
  }, [activeGoal]);

  const eta = activeGoal ? estimateGoalEta(activeGoal.id) : null;

  const chartData = useMemo(() => {
    const labels = Array.from({ length: 14 }, (_, i) => `${14 - i}h lalu`);
    const avg = getSavingsAverage14d();
    const values = Array.from({ length: 14 }, () => Math.round(avg));
    return {
      labels,
      datasets: [
        {
          label: "Rata-rata tabungan harian (14 hari)",
          data: values,
          borderColor: colors.primary,
          backgroundColor: "#EAF9F0",
          tension: 0.3,
        },
      ],
    };
  }, [getSavingsAverage14d, colors.primary]);

  const simDaysToTarget = useMemo(() => {
    if (!activeGoal) return null;
    const remaining = Math.max(
      0,
      activeGoal.targetAmount - activeGoal.savedAmount
    );
    if (simDailySaving <= 0) return null;
    return Math.ceil(remaining / simDailySaving);
  }, [activeGoal, simDailySaving]);

  const todayRemaining = getRemainingForDay();

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <section className="p-4 rounded-xl bg-white shadow">
        <h2
          className="font-semibold text-lg mb-2"
          style={{ color: colors.primary }}
        >
          Ringkasan
        </h2>
        <div className="space-y-2 text-sm text-gray-700">
          <div>
            Uang jajan default:{" "}
            <b>{formatCurrency(settings.defaultDailyAllowance)}</b>
          </div>
          <div>
            Sisa uang hari ini: <b>{formatCurrency(todayRemaining)}</b>
          </div>
          <div>
            Tujuan aktif: <b>{activeGoal ? activeGoal.title : "Belum ada"}</b>
          </div>
        </div>
        {activeGoal && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progres</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full"
                style={{ width: `${progressPct}%`, background: colors.primary }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-700">
              Terkumpul {formatCurrency(activeGoal.savedAmount)} dari{" "}
              {formatCurrency(activeGoal.targetAmount)}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {eta
                ? `Perkiraan tercapai ${new Date(eta.date).toLocaleDateString(
                    "id-ID"
                  )} (~${eta.days} hari)`
                : "Belum ada estimasi"}
            </div>
          </div>
        )}
      </section>

      <section className="p-4 rounded-xl bg-white shadow">
        <h2
          className="font-semibold text-lg mb-2"
          style={{ color: colors.primary }}
        >
          Simulator Estimasi Real-time
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <label className="block">
            <span className="text-gray-700">Uang jajan default (Rp)</span>
            <input
              type="number"
              value={simAllowance}
              onChange={(e) => setSimAllowance(Number(e.target.value) || 0)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
            <button
              onClick={() => setDefaultDailyAllowance(simAllowance)}
              className="mt-2 px-3 py-1.5 rounded-md text-white"
              style={{ background: colors.primary }}
            >
              Simpan sebagai default
            </button>
          </label>
          <label className="block">
            <span className="text-gray-700">Tabungan harian (rata-rata)</span>
            <input
              type="number"
              value={simDailySaving}
              onChange={(e) => setSimDailySaving(Number(e.target.value) || 0)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
            <div className="text-xs text-gray-500 mt-1">
              Rata-rata saat ini:{" "}
              {formatCurrency(Math.round(getSavingsAverage14d()))}
            </div>
          </label>
        </div>
        <div className="mt-4">
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
            }}
          />
          {activeGoal && (
            <div className="text-sm text-gray-700 mt-2">
              Jika menabung {formatCurrency(simDailySaving)} per hari, estimasi
              tercapai dalam <b>{simDaysToTarget ?? "—"}</b> hari.
            </div>
          )}
        </div>
      </section>

      {!goals.allIds.length && (
        <div
          className="md:col-span-2 p-4 rounded-xl bg-[#FFF2F5] border"
          style={{ borderColor: colors.pink }}
        >
          Kamu belum punya tujuan. Ayo buat tujuan pertama di menu "Tujuan"!
        </div>
      )}
    </div>
  );
}

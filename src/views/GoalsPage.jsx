import { useMemo, useState } from "react";
import { shallow } from "zustand/shallow";
import {
  useAppStore,
  selectGoalsList,
  selectActiveGoal,
  formatCurrency,
  brandColors,
} from "../store/useAppStore";
import { confirmDialog, alertSuccess } from "../utils/alerts";

export default function GoalsPage() {
  const colors = brandColors();
  const allIds = useAppStore((s) => s.goals.allIds, shallow);
  const byId = useAppStore((s) => s.goals.byId, shallow);
  const goals = useMemo(
    () => allIds.map((id) => byId[id]).filter(Boolean),
    [allIds, byId]
  );
  const activeGoal = useAppStore(selectActiveGoal);
  const addGoal = useAppStore((s) => s.addGoal);
  const removeGoal = useAppStore((s) => s.removeGoal);
  const setActiveGoal = useAppStore((s) => s.setActiveGoal);
  const estimateGoalEta = useAppStore((s) => s.estimateGoalEta);

  const [title, setTitle] = useState("Laptop Gaming");
  const [targetAmount, setTargetAmount] = useState(20000000);
  const [color, setColor] = useState("#71CB90");

  const onAdd = () => {
    addGoal({ title: title.trim(), targetAmount, color });
    alertSuccess("Tujuan ditambahkan", "Semangat menabung!");
  };

  const onDelete = async (id) => {
    const res = await confirmDialog({
      title: "Hapus tujuan?",
      text: "Tindakan ini tidak bisa dibatalkan.",
    });
    if (res.isConfirmed) removeGoal(id);
  };

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <section className="p-4 rounded-xl bg-white shadow">
        <h2
          className="font-semibold text-lg mb-3"
          style={{ color: colors.primary }}
        >
          Buat Tujuan Baru
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <label className="block">
            <span className="text-gray-700">Nama tujuan</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Target (Rp)</span>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value) || 0)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Warna</span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-1 w-24 h-10 border rounded-md"
            />
          </label>
        </div>
        <button
          onClick={onAdd}
          className="mt-3 px-4 py-2 rounded-md text-white"
          style={{ background: colors.primary }}
        >
          Tambah Tujuan
        </button>
      </section>

      <section className="p-4 rounded-xl bg-white shadow">
        <h2
          className="font-semibold text-lg mb-3"
          style={{ color: colors.primary }}
        >
          Daftar Tujuan
        </h2>
        <div className="space-y-3">
          {goals.length === 0 && (
            <div className="text-sm text-gray-600">
              Belum ada tujuan. Tambahkan di sisi kiri.
            </div>
          )}
          {goals.map((g) => {
            const eta = estimateGoalEta(g.id);
            const progress = Math.min(
              100,
              Math.round((g.savedAmount / Math.max(1, g.targetAmount)) * 100)
            );
            return (
              <div key={g.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ background: g.color }}
                    />
                    <div>
                      <div className="font-medium">{g.title}</div>
                      <div className="text-xs text-gray-600">
                        {formatCurrency(g.savedAmount)} /{" "}
                        {formatCurrency(g.targetAmount)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {activeGoal?.id !== g.id && (
                      <button
                        onClick={() => setActiveGoal(g.id)}
                        className="text-xs px-3 py-1.5 rounded-md text-white"
                        style={{ background: colors.primary }}
                      >
                        Jadikan Aktif
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(g.id)}
                      className="text-xs px-3 py-1.5 rounded-md text-white"
                      style={{ background: colors.pink }}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded">
                  <div
                    className="h-full rounded"
                    style={{ width: `${progress}%`, background: g.color }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {eta
                    ? `Estimasi: ${new Date(eta.date).toLocaleDateString(
                        "id-ID"
                      )} (~${eta.days} hari)`
                    : "Belum ada estimasi"}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

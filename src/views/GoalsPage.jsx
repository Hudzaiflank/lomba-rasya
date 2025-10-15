import { useMemo, useState } from "react";
import { shallow } from "zustand/shallow";
import NumberInput from "../components/NumberInput";
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

  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState();
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
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <section className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100">
        <h2
          className="font-bold text-xl mb-4 flex items-center gap-2"
          style={{ color: colors.primary }}
        >
          <span className="text-2xl">✨</span>
          Buat Tujuan Baru
        </h2>
        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nama tujuan (contoh: Laptop Gaming)"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
          />
          <NumberInput
            value={targetAmount}
            onChange={setTargetAmount}
            placeholder="Target dalam Rupiah (contoh: 20000000)"
            className="w-full"
          />
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">
              Pilih Warna:
            </label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-12 border-2 border-gray-200 rounded-xl cursor-pointer hover:scale-110 transition-transform"
            />
            <div
              className="flex-1 h-12 rounded-xl shadow-inner"
              style={{ background: color }}
            />
          </div>
        </div>
        <button
          onClick={onAdd}
          className="mt-5 w-full px-4 py-3 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, #5AB376)`,
          }}
        >
          ➕ Tambah Tujuan
        </button>
      </section>

      <section className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100">
        <h2
          className="font-bold text-xl mb-4 flex items-center gap-2"
          style={{ color: colors.primary }}
        >
          <span className="text-2xl">🎯</span>
          Daftar Tujuan
        </h2>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {goals.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-5xl mb-3">📝</div>
              <div className="text-sm">
                Belum ada tujuan. Tambahkan di sisi kiri.
              </div>
            </div>
          )}
          {goals.map((g) => {
            const eta = estimateGoalEta(g.id);
            const progress = Math.min(
              100,
              Math.round((g.savedAmount / Math.max(1, g.targetAmount)) * 100)
            );
            const isActive = activeGoal?.id === g.id;
            return (
              <div
                key={g.id}
                className={`border-2 rounded-2xl p-4 transition-all hover:shadow-lg ${
                  isActive
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-5 h-5 rounded-lg shadow-md"
                      style={{ background: g.color }}
                    />
                    <div className="flex-1">
                      <div className="font-bold text-gray-800 flex items-center gap-2">
                        {g.title}
                        {isActive && (
                          <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                            Aktif
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        <span className="font-semibold text-green-600">
                          {formatCurrency(g.savedAmount)}
                        </span>{" "}
                        / {formatCurrency(g.targetAmount)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {!isActive && (
                      <button
                        onClick={() => setActiveGoal(g.id)}
                        className="text-xs px-3 py-1.5 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary}, #5AB376)`,
                        }}
                      >
                        ⭐ Aktifkan
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(g.id)}
                      className="text-xs px-3 py-1.5 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${colors.pink}, #FF6B9D)`,
                      }}
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="absolute h-full rounded-full transition-all duration-500 shadow-md"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${g.color}, ${g.color}dd)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-700">
                    {progress}%
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-600 flex items-center gap-1">
                  <span>📅</span>
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

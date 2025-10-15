import { useMemo, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import ProgressDonut from "../components/ProgressDonut";
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
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-xs font-medium text-green-600 mb-1">
            Uang Jajan Default
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {formatCurrency(settings.defaultDailyAllowance)}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-xs font-medium text-blue-600 mb-1">
            Sisa Hari Ini
          </div>
          <div className="text-2xl font-bold text-gray-800">
            {formatCurrency(todayRemaining)}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-xs font-medium text-pink-600 mb-1">
            Tujuan Aktif
          </div>
          <div className="text-lg font-bold text-gray-800 truncate">
            {activeGoal ? activeGoal.title : "Belum ada"}
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <section className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100">
          <h2
            className="font-bold text-xl mb-4 flex items-center gap-2"
            style={{ color: colors.primary }}
          >
            <span className="text-2xl">📊</span>
            Progress Tujuan
          </h2>
          {activeGoal ? (
            <div className="space-y-4">
              <div className="flex justify-center py-4">
                <ProgressDonut
                  percent={progressPct}
                  size={200}
                  stroke={20}
                  colors={[colors.primary, colors.pink]}
                />
              </div>
              <div className="text-center space-y-2">
                <div className="text-sm text-gray-600">
                  Terkumpul{" "}
                  <span className="font-bold text-green-600">
                    {formatCurrency(activeGoal.savedAmount)}
                  </span>{" "}
                  dari{" "}
                  <span className="font-bold text-gray-800">
                    {formatCurrency(activeGoal.targetAmount)}
                  </span>
                </div>
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                  <div className="text-xs text-gray-600">Estimasi Tercapai</div>
                  <div className="text-sm font-bold text-green-700">
                    {eta
                      ? `${new Date(eta.date).toLocaleDateString("id-ID")} (~${
                          eta.days
                        } hari)`
                      : "Belum ada estimasi"}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="text-5xl mb-3">🎯</div>
              <div className="text-sm">
                Belum ada tujuan aktif. Buat tujuan di menu Tujuan!
              </div>
            </div>
          )}
        </section>

        <section className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100">
          <h2
            className="font-bold text-xl mb-4 flex items-center gap-2"
            style={{ color: colors.primary }}
          >
            <span className="text-2xl">🎯</span>
            Simulator Estimasi Real-time
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <input
                type="number"
                value={simAllowance}
                onChange={(e) => setSimAllowance(Number(e.target.value) || 0)}
                placeholder="Uang jajan default (Rp)"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
              <button
                onClick={() => setDefaultDailyAllowance(simAllowance)}
                className="w-full px-4 py-2.5 rounded-xl text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, #5AB376)`,
                }}
              >
                💾 Simpan sebagai default
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="number"
                value={simDailySaving}
                onChange={(e) => setSimDailySaving(Number(e.target.value) || 0)}
                placeholder="Tabungan harian (rata-rata)"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
              <div className="px-4 py-2 bg-green-50 rounded-xl text-xs text-green-700 border border-green-100">
                💰 Rata-rata saat ini:{" "}
                <span className="font-bold">
                  {formatCurrency(Math.round(getSavingsAverage14d()))}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: "rgba(0,0,0,0.8)",
                    padding: 12,
                    cornerRadius: 8,
                  },
                },
                scales: {
                  y: { beginAtZero: true },
                  x: { grid: { display: false } },
                },
              }}
            />
            {activeGoal && (
              <div className="text-sm text-gray-700 mt-3 text-center p-3 bg-white rounded-lg shadow-sm">
                📅 Jika menabung{" "}
                <span className="font-bold text-green-600">
                  {formatCurrency(simDailySaving)}
                </span>{" "}
                per hari, estimasi tercapai dalam{" "}
                <span className="font-bold text-pink-600">
                  {simDaysToTarget ?? "—"}
                </span>{" "}
                hari.
              </div>
            )}
          </div>
        </section>
      </div>

      {!goals.allIds.length && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🎯</div>
            <div>
              <div className="font-bold text-pink-700 mb-1">
                Belum Ada Tujuan
              </div>
              <div className="text-sm text-pink-600">
                Kamu belum punya tujuan. Ayo buat tujuan pertama di menu
                "Tujuan"!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

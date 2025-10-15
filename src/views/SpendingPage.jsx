import { useMemo, useState } from "react";
import { useAppStore, formatCurrency, brandColors } from "../store/useAppStore";
import NumberInput from "../components/NumberInput";

function formatYmd(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function SpendingPage() {
  const colors = brandColors();
  const [date, setDate] = useState(formatYmd(Date.now()));
  const ensureDay = useAppStore((s) => s.ensureDay);
  const addExpense = useAppStore((s) => s.addExpense);
  const addBonus = useAppStore((s) => s.addBonus);
  const allocateLeftoverToActiveGoal = useAppStore(
    (s) => s.allocateLeftoverToActiveGoal
  );
  const getRemainingForDay = useAppStore((s) => s.getRemainingForDay);
  const wallet = useAppStore((s) => s.wallet);

  const day = useMemo(
    () => wallet.days[date] || ensureDay(date),
    [wallet, date, ensureDay]
  );
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState();
  const [bonusAmount, setBonusAmount] = useState();

  const remaining = getRemainingForDay(date);
  const spent = (day.expenses || []).reduce(
    (s, e) => s + (Number(e.amount) || 0),
    0
  );

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <section className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100 space-y-5">
        <div>
          <h2
            className="font-bold text-xl mb-3 flex items-center gap-2"
            style={{ color: colors.primary }}
          >
            <span className="text-2xl">💰</span>
            {new Date(date).toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
            <div className="text-xs text-green-600 mb-1">💵 Uang Jajan</div>
            <div className="text-sm font-bold text-gray-800">
              {formatCurrency(day.allowance)}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-100">
            <div className="text-xs text-yellow-600 mb-1">🎁 Bonus</div>
            <div className="text-sm font-bold text-gray-800">
              {formatCurrency(day.bonus)}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
            <div className="text-xs text-blue-600 mb-1">💎 Sisa</div>
            <div className="text-sm font-bold text-gray-800">
              {formatCurrency(remaining)}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100">
          <div className="text-xs text-pink-600 mb-1">
            🛒 Total Pengeluaran Hari Ini
          </div>
          <div className="text-2xl font-bold text-pink-700">
            {formatCurrency(spent)}
          </div>
        </div>

        {/* Add Expense */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <span>➕</span> Tambah Pengeluaran
          </h3>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Apa yang dibeli? (contoh: Snack)"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
          />
          <NumberInput
            value={amount}
            onChange={setAmount}
            placeholder="Harga dalam Rupiah (contoh: 5000)"
            className="w-full"
          />
          <button
            onClick={() => addExpense({ date, label, amount })}
            className="w-full px-4 py-3 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, #5AB376)`,
            }}
          >
            🛍️ Tambahkan Pengeluaran
          </button>
        </div>

        {/* Bonus & Savings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700 text-sm flex items-center gap-1">
              <span>🎁</span> Bonus Uang
            </h3>
            <NumberInput
              value={bonusAmount}
              onChange={setBonusAmount}
              placeholder="Bonus dalam Rupiah"
              className="w-full"
            />
            <button
              onClick={() => addBonus({ date, amount: bonusAmount })}
              className="w-full px-4 py-2.5 rounded-xl text-white font-medium shadow-md hover:shadow-lg transition-all"
              style={{
                background: `linear-gradient(135deg, ${colors.pink}, #FF6B9D)`,
              }}
            >
              Tambah Bonus
            </button>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700 text-sm flex items-center gap-1">
              <span>💎</span> Setor Tabungan
            </h3>
            <div className="h-[52px] flex items-center justify-center bg-green-50 rounded-xl border border-green-200 text-sm text-green-700">
              Sisa:{" "}
              <span className="font-bold ml-1">
                {formatCurrency(remaining)}
              </span>
            </div>
            <button
              onClick={() => allocateLeftoverToActiveGoal(date)}
              className="w-full px-4 py-2.5 rounded-xl text-white font-medium shadow-md hover:shadow-lg transition-all"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, #5AB376)`,
              }}
            >
              Setor ke Tujuan
            </button>
          </div>
        </div>
      </section>

      <section className="p-6 rounded-2xl bg-white shadow-xl border border-gray-100">
        <h2
          className="font-bold text-xl mb-4 flex items-center gap-2"
          style={{ color: colors.primary }}
        >
          <span className="text-2xl">📜</span>
          Riwayat Transaksi
        </h2>
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {(day.expenses || []).length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-5xl mb-3">🛒</div>
              <div className="text-sm">Belum ada transaksi hari ini.</div>
            </div>
          )}
          {(day.expenses || []).map((e, idx) => (
            <div
              key={e.id}
              className="flex items-center justify-between border-2 border-gray-100 rounded-xl px-4 py-3 hover:border-green-200 hover:shadow-md transition-all bg-gradient-to-r from-white to-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md">
                  {idx + 1}
                </div>
                <div>
                  <div className="text-gray-800 font-semibold">{e.label}</div>
                  <div className="text-xs text-gray-500">Pengeluaran</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-pink-600">
                  {formatCurrency(e.amount)}
                </div>
              </div>
            </div>
          ))}
        </div>
        {(day.expenses || []).length > 0 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-pink-700">
                Total Transaksi:
              </span>
              <span className="text-lg font-bold text-pink-700">
                {(day.expenses || []).length} item
              </span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

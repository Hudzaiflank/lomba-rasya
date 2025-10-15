import { useMemo, useState } from "react";
import { useAppStore, formatCurrency, brandColors } from "../store/useAppStore";

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
  const [label, setLabel] = useState("Snack");
  const [amount, setAmount] = useState(5000);
  const [bonusAmount, setBonusAmount] = useState(0);

  const remaining = getRemainingForDay(date);
  const spent = (day.expenses || []).reduce(
    (s, e) => s + (Number(e.amount) || 0),
    0
  );

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <section className="p-4 rounded-xl bg-white shadow">
        <h2
          className="font-semibold text-lg mb-2"
          style={{ color: colors.primary }}
        >
          Hari: {new Date(date).toLocaleDateString("id-ID")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <label className="block">
            <span className="text-gray-700">Pilih tanggal</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </label>
          <div className="self-end text-sm text-gray-700">
            Uang jajan: <b>{formatCurrency(day.allowance)}</b>
          </div>
          <div className="self-end text-sm text-gray-700">
            Bonus: <b>{formatCurrency(day.bonus)}</b>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-700">
          Dibeli hari ini: <b>{formatCurrency(spent)}</b> — Sisa:{" "}
          <b>{formatCurrency(remaining)}</b>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <label className="block">
            <span className="text-gray-700">Apa yang dibeli?</span>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Harga (Rp)</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </label>
          <div className="flex items-end">
            <button
              onClick={() => addExpense({ date, label, amount })}
              className="w-full px-4 py-2 rounded-md text-white"
              style={{ background: colors.primary }}
            >
              Tambahkan
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <label className="block">
            <span className="text-gray-700">Bonus uang (Rp)</span>
            <input
              type="number"
              value={bonusAmount}
              onChange={(e) => setBonusAmount(Number(e.target.value) || 0)}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </label>
          <div className="flex items-end">
            <button
              onClick={() => addBonus({ date, amount: bonusAmount })}
              className="w-full px-4 py-2 rounded-md text-white"
              style={{ background: colors.pink }}
            >
              Tambah Bonus
            </button>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => allocateLeftoverToActiveGoal(date)}
              className="w-full px-4 py-2 rounded-md text-white"
              style={{ background: colors.primary }}
            >
              Setor sisa ke tujuan aktif
            </button>
          </div>
        </div>
      </section>

      <section className="p-4 rounded-xl bg-white shadow">
        <h2
          className="font-semibold text-lg mb-2"
          style={{ color: colors.primary }}
        >
          Transaksi
        </h2>
        <div className="space-y-2">
          {(day.expenses || []).length === 0 && (
            <div className="text-sm text-gray-600">Belum ada transaksi.</div>
          )}
          {(day.expenses || []).map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between border rounded-lg px-3 py-2 text-sm"
            >
              <div className="text-gray-700">{e.label}</div>
              <div className="font-medium">{formatCurrency(e.amount)}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

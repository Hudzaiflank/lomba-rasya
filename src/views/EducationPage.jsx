import { brandColors } from "../store/useAppStore";

const topics = [
  {
    title: "Pemasukan & Pengeluaran",
    desc: "Pemasukan adalah uang yang kamu terima (uang jajan, hadiah), sedangkan pengeluaran adalah uang yang kamu keluarkan (jajan, beli alat tulis). Catat agar tahu kemana uangmu pergi.",
    color: "#B5E8A4",
  },
  {
    title: "Kebutuhan vs Keinginan",
    desc: "Kebutuhan adalah hal penting (makan, transport), sedangkan keinginan adalah hal yang menyenangkan tapi tidak wajib (game, mainan). Dahulukan kebutuhan ya!",
    color: "#FFC8C4",
  },
  {
    title: "Target & Menabung",
    desc: "Tentukan tujuan menabung (misal: sepatu baru). Sisihkan sisa uang jajan setiap hari agar pelan-pelan tercapai.",
    color: "#FFB0C4",
  },
];

export default function EducationPage() {
  const colors = brandColors();
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-bold text-3xl mb-2 bg-gradient-to-r from-green-600 to-pink-600 bg-clip-text text-transparent">
          📚 Edukasi Keuangan
        </h2>
        <p className="text-gray-600 text-sm">
          Belajar mengelola uang dengan cerdas dan menyenangkan!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topics.map((t, idx) => (
          <div
            key={t.title}
            className="rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-white"
            style={{
              background: `linear-gradient(135deg, ${t.color}, ${t.color}dd)`,
            }}
          >
            <div className="text-4xl mb-3">
              {idx === 0 ? "💵" : idx === 1 ? "🎯" : "🏆"}
            </div>
            <div className="font-bold text-lg mb-2 text-gray-800">
              {t.title}
            </div>
            <div className="text-gray-700 leading-relaxed text-sm">
              {t.desc}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg border-2 border-blue-100">
          <div className="text-3xl mb-3">💡</div>
          <h3 className="font-bold text-lg text-blue-800 mb-2">
            Tips Menabung
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>Sisihkan uang sebelum jajan, bukan sisanya</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>Buat target yang jelas dan realistis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>Catat semua pengeluaran harianmu</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border-2 border-purple-100">
          <div className="text-3xl mb-3">🚀</div>
          <h3 className="font-bold text-lg text-purple-800 mb-2">
            Ilustrasi Sederhana
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Bayangkan dompetmu seperti{" "}
            <strong className="text-purple-700">botol</strong>. Jika kamu
            menuang terlalu banyak untuk jajan, botol cepat habis. Kalau kamu{" "}
            <strong className="text-green-600">
              sisihkan sedikit setiap hari
            </strong>
            , botol akan perlahan penuh dan cukup untuk membeli barang impianmu!
            🎁
          </p>
        </div>
      </div>

      <div className="p-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl text-white text-center">
        <div className="text-5xl mb-4">🌟</div>
        <h3 className="text-2xl font-bold mb-2">Ingat Selalu!</h3>
        <p className="text-lg opacity-90">
          Menabung bukan soal berapa banyak yang kamu punya,
          <br />
          tapi tentang <strong>konsistensi</strong> dan{" "}
          <strong>komitmen</strong> untuk mencapai impianmu!
        </p>
      </div>
    </div>
  );
}

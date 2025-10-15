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
    <div>
      <h2
        className="font-semibold text-xl mb-4"
        style={{ color: colors.primary }}
      >
        Edukasi Keuangan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topics.map((t) => (
          <div
            key={t.title}
            className="rounded-xl p-4 text-sm shadow"
            style={{ background: t.color }}
          >
            <div className="font-semibold mb-1">{t.title}</div>
            <div className="text-gray-800 leading-relaxed">{t.desc}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm text-gray-700 bg-white rounded-xl p-4 shadow">
        Ilustrasi sederhana: bayangkan dompetmu seperti botol. Jika kamu menuang
        terlalu banyak untuk jajan, botol cepat habis. Kalau kamu sisihkan
        sedikit setiap hari, botol akan perlahan penuh dan cukup untuk membeli
        barang impianmu.
      </div>
    </div>
  );
}

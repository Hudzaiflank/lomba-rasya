import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAppStore,
  selectCurrentUser,
  brandColors,
} from "../store/useAppStore";
import { alertSuccess, alertError } from "../utils/alerts";

export default function AuthPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = useAppStore((s) => s.registerUser);
  const loginUser = useAppStore((s) => s.loginUser);
  const user = useAppStore(selectCurrentUser);
  const navigate = useNavigate();
  const colors = brandColors();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onRegister = () => {
    if (!name.trim())
      return alertError("Nama belum diisi", "Tulis namamu dulu ya!");
    if (!password)
      return alertError("Password belum diisi", "Isi password untuk keamanan.");
    registerUser(name.trim(), password);
    alertSuccess("Berhasil Daftar", "Selamat datang di FinEdu!");
    navigate("/");
  };

  const onLogin = () => {
    if (!name.trim())
      return alertError("Nama belum diisi", "Tulis namamu dulu ya!");
    if (!password)
      return alertError("Password belum diisi", "Masukkan password kamu.");
    const id = loginUser(name.trim(), password);
    if (!id) return alertError("Akun tidak cocok", "Nama atau password salah.");
    alertSuccess("Berhasil Masuk", "Senang bertemu lagi!");
    navigate("/");
  };

  return (
    <div className="min-h-dvh w-full bg-gradient-to-br from-green-50 via-emerald-50 to-pink-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-300/20 to-emerald-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-300/20 to-rose-400/20 rounded-full blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col lg:flex-row items-center gap-12 relative z-10 min-h-dvh">
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div>
            <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-green-600 to-pink-600 bg-clip-text text-transparent mb-4">
              FinEdu
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              Platform edukasi keuangan seru untuk siswa SMP 🎓
            </p>
          </div>

          <div className="space-y-4 max-w-lg mx-auto lg:mx-0">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
              <div className="text-3xl">💰</div>
              <div className="text-left">
                <div className="font-bold text-gray-800">Kelola Uang Jajan</div>
                <div className="text-sm text-gray-600">
                  Catat pengeluaran dan tabunganmu
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
              <div className="text-3xl">🎯</div>
              <div className="text-left">
                <div className="font-bold text-gray-800">Capai Tujuan</div>
                <div className="text-sm text-gray-600">
                  Wujudkan impianmu dengan menabung
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
              <div className="text-3xl">📚</div>
              <div className="text-left">
                <div className="font-bold text-gray-800">Belajar Seru</div>
                <div className="text-sm text-gray-600">
                  Pahami konsep keuangan dengan mudah
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm border-2 border-white">
            <div className="text-center mb-6">
              <div
                className="w-16 h-16 mx-auto rounded-2xl mb-3 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.pink})`,
                }}
              >
                F
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-pink-600 bg-clip-text text-transparent">
                Selamat Datang!
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Belajar kelola uang jajan dengan seru! 🚀
              </p>
            </div>

            <div className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Namamu (contoh: Rasya)"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (untuk keamanan)"
                type="password"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              />

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={onLogin}
                  className="px-4 py-3 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${colors.pink}, #FF6B9D)`,
                  }}
                >
                  🔐 Masuk
                </button>
                <button
                  onClick={onRegister}
                  className="px-4 py-3 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, #5AB376)`,
                  }}
                >
                  ✨ Daftar
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
              Dengan mendaftar, kamu setuju untuk belajar mengelola keuangan
              dengan bijak! 💪
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

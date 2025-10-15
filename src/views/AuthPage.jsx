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
    registerUser(name.trim());
    alertSuccess("Berhasil Daftar", "Selamat datang di FinEdu!");
    navigate("/");
  };

  const onLogin = () => {
    if (!name.trim())
      return alertError("Nama belum diisi", "Tulis namamu dulu ya!");
    const id = loginUser(name.trim());
    if (!id)
      return alertError("Akun tidak ditemukan", "Silakan daftar dahulu.");
    alertSuccess("Berhasil Masuk", "Senang bertemu lagi!");
    navigate("/");
  };

  return (
    <div
      className="min-h-dvh flex items-center justify-center"
      style={{ background: "#FFF7F9" }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <div className="text-center mb-4">
          <div
            className="w-12 h-12 mx-auto rounded-xl mb-2"
            style={{ background: colors.primary }}
          />
          <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>
            FinEdu
          </h1>
          <p className="text-sm text-gray-600">
            Belajar kelola uang jajan dengan seru!
          </p>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Namamu
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Rasya"
          className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#71CB90]"
        />

        <div className="flex gap-2">
          <button
            onClick={onLogin}
            className="flex-1 px-4 py-2 rounded-md text-white"
            style={{ background: colors.pink }}
          >
            Masuk
          </button>
          <button
            onClick={onRegister}
            className="flex-1 px-4 py-2 rounded-md text-white"
            style={{ background: colors.primary }}
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
}

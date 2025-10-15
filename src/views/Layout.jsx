import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  useAppStore,
  selectCurrentUser,
  brandColors,
} from "../store/useAppStore";

export default function Layout() {
  const user = useAppStore(selectCurrentUser);
  const logout = useAppStore((s) => s.logout);
  const navigate = useNavigate();
  const colors = brandColors();

  return (
    <div className="min-h-dvh flex flex-col bg-[#FDFCFD]">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="mx-auto w-full max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg"
              style={{ background: colors.primary }}
            />
            <div
              className="text-xl font-bold"
              style={{ color: colors.primary }}
            >
              FinEdu
            </div>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-[#EAF9F0] text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
              to="/"
            >
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-[#EAF9F0] text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
              to="/goals"
            >
              Tujuan
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-[#EAF9F0] text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
              to="/spending"
            >
              Pengeluaran
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-[#EAF9F0] text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
              to="/education"
            >
              Edukasi
            </NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-gray-700 hidden sm:block">
              Halo, {user?.name}
            </span>
            <button
              onClick={() => {
                logout();
                navigate("/auth");
              }}
              className="text-sm px-3 py-2 rounded-md text-white"
              style={{ background: colors.pink }}
            >
              Keluar
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} FinEdu
      </footer>
    </div>
  );
}

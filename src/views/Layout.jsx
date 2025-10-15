import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth");
    setMenuOpen(false);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-br from-[#FDFCFD] via-[#F8FFF9] to-[#FFF8FA]">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b shadow-sm">
        <div className="mx-auto w-full max-w-6xl px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl shadow-lg flex items-center justify-center text-white font-bold"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.pink})`,
              }}
            >
              F
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-pink-600 bg-clip-text text-transparent">
              FinEdu
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 text-sm">
            <NavLink
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
              to="/"
            >
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
              to="/goals"
            >
              Tujuan
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
              to="/spending"
            >
              Pengeluaran
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
              to="/education"
            >
              Edukasi
            </NavLink>
          </nav>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-gray-700 text-sm font-medium">
              Halo, {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
              style={{
                background: `linear-gradient(135deg, ${colors.pink}, #FF6B9D)`,
              }}
            >
              Keluar
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`h-0.5 bg-gray-700 rounded transition-all ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`h-0.5 bg-gray-700 rounded transition-all ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 bg-gray-700 rounded transition-all ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-3 space-y-2 bg-white/95 border-t">
            <NavLink
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
              to="/goals"
              onClick={() => setMenuOpen(false)}
            >
              Tujuan
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
              to="/spending"
              onClick={() => setMenuOpen(false)}
            >
              Pengeluaran
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
              to="/education"
              onClick={() => setMenuOpen(false)}
            >
              Edukasi
            </NavLink>
            <div className="pt-2 border-t">
              <div className="text-gray-700 text-sm font-medium px-4 py-2">
                Halo, {user?.name}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-sm px-4 py-2 rounded-lg text-white font-medium shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${colors.pink}, #FF6B9D)`,
                }}
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-white/50 backdrop-blur-sm py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} FinEdu - Mengelola Keuangan dengan
        Cerdas
      </footer>
    </div>
  );
}

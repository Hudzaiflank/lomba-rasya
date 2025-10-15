import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppStore, selectCurrentUser } from "../store/useAppStore";
import AuthPage from "../views/AuthPage";
import Dashboard from "../views/Dashboard";
import GoalsPage from "../views/GoalsPage";
import SpendingPage from "../views/SpendingPage";
import EducationPage from "../views/EducationPage";
import Layout from "../views/Layout";

function PrivateRoute({ children }) {
  const user = useAppStore(selectCurrentUser);
  if (!user) return <Navigate to="/auth" replace />;
  return children;
}

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="spending" element={<SpendingPage />} />
          <Route path="education" element={<EducationPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

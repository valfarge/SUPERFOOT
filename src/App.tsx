import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminRoute } from './routes/AdminRoute';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminGridsPage } from './pages/admin/AdminGridsPage';
import { AdminResultsPage } from './pages/admin/AdminResultsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminStatsPage } from './pages/admin/AdminStatsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Routes protégées d'administration */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="grids" element={<AdminGridsPage />} />
            <Route path="results" element={<AdminResultsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="stats" element={<AdminStatsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
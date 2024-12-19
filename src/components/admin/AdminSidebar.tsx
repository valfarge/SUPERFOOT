//src/components/admin/AdminSidebar.tsx
import { NavLink } from 'react-router-dom';
import { 
  LayoutGrid, 
  Trophy,
  Users,
  Settings,
  BarChart
} from 'lucide-react';

const navItems = [
  { to: '/admin/grids', icon: LayoutGrid, label: 'Grilles' },
  { to: '/admin/results', icon: Trophy, label: 'Résultats' },
  { to: '/admin/users', icon: Users, label: 'Utilisateurs' },
  { to: '/admin/stats', icon: BarChart, label: 'Statistiques' },
  { to: '/admin/settings', icon: Settings, label: 'Paramètres' },
];

export const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 min-h-screen p-4">
      <nav className="space-y-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
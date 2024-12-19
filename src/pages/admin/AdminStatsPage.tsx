//src/pages/admin/AdminStatsPage.tsx
import { BarChart3, TrendingUp, Users } from 'lucide-react';

export const AdminStatsPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Statistiques</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Utilisateurs</h3>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white">1,234</p>
          <p className="text-sm text-gray-400 mt-2">+12% cette semaine</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Grilles Jouées</h3>
            <BarChart3 className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white">456</p>
          <p className="text-sm text-gray-400 mt-2">+8% ce mois</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Gains Distribués</h3>
            <TrendingUp className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-white">789,012 €</p>
          <p className="text-sm text-gray-400 mt-2">+15% ce mois</p>
        </div>
      </div>
    </div>
  );
};
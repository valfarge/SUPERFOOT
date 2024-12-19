//src/pages/admin/AdminSettingsPage.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

export const AdminSettingsPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Paramètres</h2>
      
      <div className="bg-gray-800 p-6 rounded-lg space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Paramètres Généraux</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Nom du Site</label>
              <Input defaultValue="Grilles Sportives" className="bg-gray-700 text-white" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Email de Contact</label>
              <Input type="email" defaultValue="contact@grilles.com" className="bg-gray-700 text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Paramètres des Grilles</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Montant Minimum Garanti</label>
              <Input type="number" defaultValue="5000" className="bg-gray-700 text-white" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Délai Minimum (heures)</label>
              <Input type="number" defaultValue="24" className="bg-gray-700 text-white" />
            </div>
          </div>
        </div>

        <Button className="w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
};
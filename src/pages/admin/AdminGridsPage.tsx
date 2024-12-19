import { useState, useEffect } from "react";
import { Grid, Match } from "@/types/grid";
import { AdminGridForm } from "@/components/admin/grids/AdminGridForm";
import { AdminGridList } from "@/components/admin/grids/AdminGridList";
import { AdminMatchList } from "@/components/admin/grids/AdminMatchList";
import { api } from "@/services/api";
import { AlertBanner } from '@/components/ui/AlertBanner'; // Nouveau composant d'alerte

export const AdminGridsPage = () => {
  const [grids, setGrids] = useState<Grid[]>([]);
  const [selectedGrid, setSelectedGrid] = useState<Grid | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchGrids();
  }, []);

  const fetchGrids = async () => {
    try {
      const allGrids = await api.grids.getAll();
      setGrids(allGrids);
      if (selectedGrid) handleGridSelection(selectedGrid);
    } catch (error) {
      console.error("Error fetching grids:", error);
    }
  };

  const handleGridSelection = async (grid: Grid) => {
    setSelectedGrid(grid);
    try {
      const data = await api.matches.getByGridId(grid.id);
      setMatches(data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const handleGridCreated = async () => {
    await fetchGrids();
    const lastGrid = grids[grids.length - 1];
    if (lastGrid) {
      handleGridSelection(lastGrid);
    }
  };

  const handleDeleteAllData = async () => {
    if (!confirm("Êtes-vous sûr de vouloir tout supprimer ?")) return;
    try {
      await api.maintenance.deleteAllData();
      setAlertMessage(
        "Toutes les grilles et tous les matchs ont été supprimés."
      );
      setGrids([]);
      setMatches([]);
      setSelectedGrid(null);
    } catch (error) {
      console.error("Error deleting all data:", error);
      setAlertMessage("Erreur lors de la suppression de toutes les données.");
    }
  };

  return (
    <div className="space-y-6">
      <AlertBanner
        message={alertMessage}
        onClose={() => setAlertMessage(null)}
      />

      <div className="flex space-x-4">
        <AdminGridForm onGridCreated={handleGridCreated} />
        <button
          onClick={handleDeleteAllData}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 h-10 self-end"
        >
          Supprimer toutes les données
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <AdminGridList
            grids={grids}
            selectedGridId={selectedGrid?.id}
            onSelectGrid={handleGridSelection}
          />
        </div>
        <div className="col-span-8">
          <AdminMatchList
            gridId={selectedGrid?.id}
            matches={matches}
            onMatchesUpdated={() => handleGridSelection(selectedGrid!)}
          />
        </div>
      </div>
    </div>
  );
};

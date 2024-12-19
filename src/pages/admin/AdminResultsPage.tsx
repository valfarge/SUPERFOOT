// src/pages/admin/AdminResultsPage.tsx
import { useState, useEffect } from "react";
import { Grid } from "@/types/grid";
import { GridSelector } from "@/components/admin/results/GridSelector";
import { AdminResultsForm } from "@/components/admin/results/AdminResultsForm";
import { ResultsSummary } from "@/components/admin/results/ResultsSummary";
import { api } from "@/services/api";

export const AdminResultsPage = () => {
  const [activeGrids, setActiveGrids] = useState<Grid[]>([]);
  const [completedGrids, setCompletedGrids] = useState<Grid[]>([]);
  const [selectedGrid, setSelectedGrid] = useState<Grid | null>(null);
  const [gridData, setGridData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGrids();
  }, []);

  // Récupération des grilles actives et complétées
  const fetchGrids = async () => {
    setIsLoading(true);
    try {
      const [active, completed] = await Promise.all([
        api.grids.getByStatus("active"),
        api.grids.getByStatus("completed"),
      ]);
      setActiveGrids(active);
      setCompletedGrids(completed);
    } catch (error) {
      console.error("Error fetching grids:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGridSelection = async (grid: Grid) => {
    setSelectedGrid(grid);
    setIsLoading(true);
  
    try {
      if (grid.status === "completed") {
        const result = await api.results.getByGridId(grid.id);
        console.log("Résultats récupérés du backend :", result); // LOG IMPORTANT
        setGridData(result);
      } else {
        const matches = await api.matches.getByGridId(grid.id);
        console.log("Matchs récupérés du backend :", matches); // LOG IMPORTANT
        setGridData({ matches });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  // Mise à jour après soumission des résultats
  const handleResultsSubmitted = () => {
    fetchGrids(); // Rafraîchir les grilles
    setSelectedGrid(null);
    setGridData(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Gestion des Résultats</h2>

      <div className="grid grid-cols-12 gap-6">
        {/* Sélection des grilles */}
        <div className="col-span-4">
          <GridSelector
            activeGrids={activeGrids}
            completedGrids={completedGrids}
            selectedGridId={selectedGrid?.id}
            onSelectGrid={handleGridSelection}
            isLoading={isLoading}
          />
        </div>

        {/* Contenu de la grille sélectionnée */}
        <div className="col-span-8">
          {isLoading ? (
            // Spinner de chargement
            <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : selectedGrid && gridData ? (
            // Affichage du formulaire ou du récapitulatif selon le statut
            selectedGrid.status === "active" ? (
              <AdminResultsForm
                grid={selectedGrid}
                matches={gridData.matches}
                onResultsSubmitted={handleResultsSubmitted}
              />
            ) : (
              <ResultsSummary grid={selectedGrid} results={gridData} />
            )
          ) : (
            // Message par défaut si aucune grille n'est sélectionnée
            <div className="bg-gray-800 p-6 rounded-lg text-center text-gray-400">
              Sélectionnez une grille pour gérer ses résultats
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import { Grid } from "@/types/grid";
import { GridSelector } from "@/components/admin/results/GridSelector";
import { AdminResultsForm } from "./results/AdminResultsForm";
import { ResultsSummary } from "@/components/admin/results/ResultsSummary";
import { api } from "@/services/api";

// Composant principal pour la gestion des résultats des grilles
export const AdminResultsPage = () => {
  // États pour gérer les grilles actives et complétées
  const [activeGrids, setActiveGrids] = useState<Grid[]>([]);
  const [completedGrids, setCompletedGrids] = useState<Grid[]>([]);

  // État pour stocker la grille actuellement sélectionnée
  const [selectedGrid, setSelectedGrid] = useState<Grid | null>(null);

  // État pour stocker les données associées à une grille (matchs ou résultats)
  const [gridData, setGridData] = useState<any>(null);

  // États pour gérer le chargement et le mode édition
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Effet pour récupérer les grilles lors du montage du composant
  useEffect(() => {
    fetchGrids();
  }, []);

  // Fonction pour récupérer les grilles actives et complétées depuis l'API
  const fetchGrids = async () => {
    try {
      const [active, completed] = await Promise.all([
        api.grids.getByStatus("active"), // Grilles actives
        api.grids.getByStatus("completed"), // Grilles complétées
      ]);
      setActiveGrids(active); // Mise à jour des grilles actives
      setCompletedGrids(completed); // Mise à jour des grilles complétées
      setIsLoading(false); // Arrêt du chargement
    } catch (error) {
      console.error("Error fetching grids:", error);
      setIsLoading(false);
    }
  };

  // Fonction appelée lors de la sélection d'une grille
  const handleGridSelection = async (grid: Grid) => {
    setSelectedGrid(grid); // Mise à jour de la grille sélectionnée
    setIsEditing(false); // Sortie du mode édition si nécessaire
    setIsLoading(true);

    try {
      if (grid.status === "completed") {
        // Si la grille est complétée, récupérer les résultats associés
        const result = await api.results.getByGridId(grid.id);
        setGridData(result); // Stockage des résultats
      } else {
        // Sinon, récupérer les matchs associés
        const matches = await api.matches.getByGridId(grid.id);
        setGridData({ matches }); // Stockage des matchs
      }
    } catch (error) {
      console.error("Error fetching grid data:", error);
      setGridData(null); // Réinitialiser les données en cas d'erreur
    } finally {
      setIsLoading(false); // Arrêt du chargement
    }
  };

  // Fonction appelée après la soumission des résultats
  const handleResultsSubmitted = () => {
    fetchGrids(); // Rafraîchir les listes de grilles
    setSelectedGrid(null); // Désélectionner la grille
    setGridData(null); // Réinitialiser les données associées
    setIsEditing(false); // Sortie du mode édition
  };

  // Fonction pour activer le mode édition sur une grille complétée
  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      {/* Titre de la page */}
      <h2 className="text-2xl font-bold text-white">Gestion des Résultats</h2>

      <div className="grid grid-cols-12 gap-6">
        {/* Section gauche : sélection des grilles */}
        <div className="col-span-4">
          <GridSelector
            activeGrids={activeGrids} // Liste des grilles actives
            completedGrids={completedGrids} // Liste des grilles complétées
            selectedGridId={selectedGrid?.id} // ID de la grille sélectionnée
            onSelectGrid={handleGridSelection} // Fonction appelée lors de la sélection
            isLoading={isLoading} // État de chargement
          />

          {/* Liste des grilles complétées */}
          {completedGrids.length > 0 && (
            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">
                Résultats Publiés
              </h3>
              <div className="space-y-2">
                {completedGrids.map((grid) => (
                  <button
                    key={grid.id}
                    onClick={() => handleGridSelection(grid)} // Sélectionner une grille complétée
                    className={`w-full p-4 text-left rounded-lg transition-colors ${
                      selectedGrid?.id === grid.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{grid.name}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(grid.deadline).toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section droite : affichage des détails */}
        <div className="col-span-8">
          {isLoading ? (
            // Affichage d'un spinner de chargement
            <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : selectedGrid && gridData ? (
            // Si une grille est sélectionnée et des données sont disponibles
            selectedGrid.status === "active" || isEditing ? (
              <AdminResultsForm
                grid={selectedGrid} // Données de la grille
                matches={gridData.matches} // Matchs associés
                onResultsSubmitted={handleResultsSubmitted} // Action après soumission
              />
            ) : (
              <ResultsSummary
                grid={selectedGrid} // Données de la grille
                results={gridData} // Résultats associés
                onEdit={handleEdit} // Activer le mode édition
              />
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

/*
Points clés des commentaires :
Structure des sections :

Une section pour afficher et sélectionner les grilles.
Une autre pour afficher les détails ou le formulaire selon la grille sélectionnée.
Chargement des données :

Les grilles actives et complétées sont récupérées via des appels API parallèles.
Les données des grilles (matchs ou résultats) sont récupérées en fonction de leur statut.
Gestion des états :

Les états isLoading, isEditing, gridData, etc., permettent de gérer les interactions utilisateur et les affichages conditionnels.
Bouton d’édition :

Ajout d’une fonction pour repasser une grille complétée en mode édition, avec affichage du formulaire.
*/
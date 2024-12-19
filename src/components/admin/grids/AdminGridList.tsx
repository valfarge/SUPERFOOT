import React, { useState, useEffect } from 'react';
import { Grid } from '@/types/grid'; // Interface typée pour les grilles
import { api } from '@/services/api'; // Service API pour interagir avec le backend

// Définition des propriétés attendues par le composant
interface AdminGridListProps {
  grids: Grid[]; // Liste de grilles déjà chargée
  selectedGridId?: number; // ID de la grille actuellement sélectionnée (optionnel)
  onSelectGrid: (grid: Grid) => void; // Fonction de callback pour sélectionner une grille
}

// Composant AdminGridList : Liste des grilles en brouillon avec actions (modifier, valider, supprimer)
export const AdminGridList: React.FC<AdminGridListProps> = ({ grids, selectedGridId, onSelectGrid }) => {
  // État local pour stocker les grilles avec le statut "draft"
  const [draftGrids, setDraftGrids] = useState<Grid[]>([]);

  // Chargement initial : récupération des grilles "draft" depuis le backend
  useEffect(() => {
    const fetchDraftGrids = async () => {
      try {
        const g = await api.grids.getByStatus('draft'); // Appel API pour récupérer les grilles en brouillon
        setDraftGrids(g); // Met à jour l'état local avec les données récupérées
      } catch (error) {
        console.error('Error fetching draft grids:', error); // Gestion des erreurs
      }
    };

    fetchDraftGrids(); // Exécute la fonction
  }, []); // Le tableau vide signifie que cela s'exécute uniquement au montage du composant

  // Fonction pour soumettre une grille pour validation
  const handleSubmitForValidation = async (gridId: number) => {
    try {
      await api.grids.updateStatus(gridId, 'active'); // Met à jour le statut de la grille en "active" côté backend
      setDraftGrids((prev) => prev.filter((grid) => grid.id !== gridId)); // Retire la grille soumise de l'état local
    } catch (error) {
      console.error('Error submitting grid for validation:', error); // Gestion des erreurs
    }
  };

  // Fonction pour modifier une grille en brouillon
  const handleEditDraft = (grid: Grid) => {
    onSelectGrid(grid); // Appelle la fonction de callback pour indiquer la grille sélectionnée
  };

  // Fonction pour supprimer une grille
  const handleDeleteGrid = async (gridId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette grille ?')) return; // Confirmation avant suppression
    try {
      await api.grids.delete(gridId); // Appel API pour supprimer la grille
      setDraftGrids((prev) => prev.filter((grid) => grid.id !== gridId)); // Retire la grille supprimée de l'état local
    } catch (error) {
      console.error('Error deleting grid:', error); // Gestion des erreurs
      alert('Erreur lors de la suppression de la grille'); // Message utilisateur en cas d'erreur
    }
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      {/* En-tête */}
      <h2 className="text-xl font-semibold mb-4 text-white">Grilles (Brouillons)</h2>

      {/* Liste des grilles */}
      <div className="space-y-2">
        {draftGrids.map((grid) => (
          <div
            key={grid.id} // Clé unique pour chaque élément de la liste
            className="flex justify-between items-center bg-gray-600 p-4 rounded-lg"
          >
            {/* Informations sur la grille */}
            <div>
              <span className="text-white font-medium">{grid.name}</span>
              <div className="text-sm text-gray-400">
                {grid.deadline
                  ? `Date limite: ${new Date(grid.deadline).toLocaleString()}` // Affiche la date limite si elle existe
                  : 'Pas de date limite'} 
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex space-x-2">
              {/* Bouton Modifier */}
              <button
                onClick={() => handleEditDraft(grid)} // Appelle handleEditDraft avec la grille sélectionnée
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Modifier
              </button>

              {/* Bouton Soumettre */}
              <button
                onClick={() => handleSubmitForValidation(grid.id)} // Appelle handleSubmitForValidation avec l'ID de la grille
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Soumettre pour validation
              </button>

              {/* Bouton Supprimer */}
              <button
                onClick={() => handleDeleteGrid(grid.id)} // Appelle handleDeleteGrid avec l'ID de la grille
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
/*
Explication des principales parties :
useEffect :

Récupère les grilles en brouillon (statut draft) dès que le composant est monté.
Met à jour l'état local draftGrids avec les grilles récupérées.
handleSubmitForValidation :

Change le statut d'une grille en active via l'API.
Retire la grille de la liste des brouillons après sa mise à jour.
handleEditDraft :

Appelle la fonction onSelectGrid pour transmettre la grille sélectionnée au composant parent.
handleDeleteGrid :

Supprime la grille après confirmation de l'utilisateur.
Met à jour l'état pour retirer la grille supprimée.
Affichage des boutons d'action :

Modifier : Permet d'éditer la grille.
Soumettre : Change le statut de la grille en "active".
Supprimer : Supprime définitivement la grille après confirmation.
*/

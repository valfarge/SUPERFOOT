//src/components/GridList.tsx
import React from 'react';
import { Calendar, Trophy } from 'lucide-react';
import { Grid } from '@/types/grid'; // Importation du type Grid pour définir les propriétés des grilles

// Définition des propriétés attendues par le composant GridList
interface GridListProps {
  grids: Grid[]; // Liste des grilles à afficher
  onSelectGrid: (grid: Grid) => void; // Fonction appelée lorsqu'une grille est sélectionnée
  selectedGridId?: number; // ID de la grille actuellement sélectionnée (facultatif)
  showCompletedGrids?: boolean; // Indique si les grilles terminées doivent être affichées (par défaut, non)
}

// Composant fonctionnel GridList
export const GridList: React.FC<GridListProps> = ({ 
  grids, 
  onSelectGrid, 
  selectedGridId,
  showCompletedGrids = false // Valeur par défaut : n'affiche pas les grilles terminées
}) => {
  // Filtrer les grilles selon leur statut (actives ou terminées)
  const filteredGrids = showCompletedGrids 
    ? grids.filter(grid => grid.status === 'completed') // Si demandé, ne montre que les grilles terminées
    : grids.filter(grid => grid.status === 'active');   // Sinon, montre uniquement les grilles actives

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      {/* Titre indiquant le type de grilles affichées */}
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
        <Trophy className="w-5 h-5 mr-2" /> {/* Icône de trophée */}
        {showCompletedGrids ? 'Grilles Terminées' : 'Grilles en Cours'}
      </h2>

      {/* Liste des grilles filtrées */}
      <div className="space-y-2">
        {filteredGrids.map((grid) => (
          // Bouton pour chaque grille
          <button
            key={grid.id} // Clé unique basée sur l'ID de la grille
            onClick={() => onSelectGrid(grid)} // Appelle la fonction onSelectGrid lorsque le bouton est cliqué
            className={`w-full text-left p-4 rounded-lg transition-colors ${
              selectedGridId === grid.id // Vérifie si la grille est sélectionnée
                ? 'bg-blue-600 text-white' // Style si la grille est sélectionnée
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600' // Style par défaut
            }`}
          >
            {/* En-tête de la grille */}
            <div className="flex justify-between items-center">
              <span className="font-medium">{grid.name}</span> {/* Nom de la grille */}
              <Calendar className="w-4 h-4" /> {/* Icône de calendrier */}
            </div>

            {/* Informations supplémentaires sur la grille */}
            <div className="mt-2 text-sm">
              <div className={selectedGridId === grid.id ? 'text-blue-200' : 'text-gray-400'}>
                {grid.guaranteedSum.toLocaleString()} € garantis {/* Montant garanti */}
              </div>
              <div className={selectedGridId === grid.id ? 'text-blue-200' : 'text-gray-400'}>
                {new Date(grid.deadline).toLocaleDateString()} {/* Date limite formatée */}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

/*
Résumé des fonctionnalités :
Filtrage des grilles : Selon leur statut (active ou completed), les grilles sont affichées différemment.
Sélection d'une grille : Une fonction (onSelectGrid) est appelée avec les détails de la grille lorsqu'un bouton est cliqué.
Affichage conditionnel des styles :
Une grille sélectionnée est mise en évidence (fond bleu, texte blanc).
Les autres grilles ont un style différent (fond gris, texte gris).
Informations sur les grilles : Chaque bouton affiche :
Le nom de la grille
Le montant garanti
La date limite
Points forts :
Modularité : Le composant est bien structuré et peut être réutilisé.
Accessibilité : Les grilles sont cliquables et visuellement différenciées lorsqu'elles sont sélectionnées.
Lisibilité : Le code est clair, avec des noms explicites pour les variables et propriétés.
Améliorations possibles :
Améliorer les performances :
Utiliser React.memo si le composant est utilisé dans un contexte où les grilles ne changent pas fréquemment.
Ajouter des tests unitaires :
Vérifier le filtrage des grilles (active vs completed).
Tester le comportement lorsque onSelectGrid est appelé.
Responsivité :
Ajouter des classes CSS pour un meilleur rendu sur des écrans plus petits.
Cela garantit un composant robuste, réutilisable et facile à maintenir.
*/
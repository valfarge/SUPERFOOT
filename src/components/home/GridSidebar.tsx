// Importation du type Grid pour définir la structure des grilles
import { Grid } from '@/types/grid';

// Importation du composant GridSection pour gérer l'affichage de sections de grilles
import { GridSection } from './GridSection';

// Définition des props pour le composant GridSidebar
interface GridSidebarProps {
  grids: Grid[]; // Liste des grilles à afficher
  selectedGridId?: number; // ID de la grille actuellement sélectionnée (facultatif)
  onSelectGrid: (grid: Grid) => void; // Fonction appelée lorsqu'une grille est sélectionnée
}

// Définition du composant GridSidebar
export const GridSidebar = ({ grids, selectedGridId, onSelectGrid }: GridSidebarProps) => {
  // Filtre les grilles avec un statut "active" (en cours)
  const activeGrids = grids.filter(grid => grid.status === 'active');

  // Filtre les grilles avec un statut "completed" (terminées)
  const completedGrids = grids.filter(grid => grid.status === 'completed');

  return (
    <div className="col-span-3 flex flex-col space-y-6 overflow-auto">
      {/* Section pour les grilles en cours */}
      <GridSection
        title="Grilles en Cours" // Titre de la section
        grids={activeGrids} // Liste des grilles en cours
        selectedGridId={selectedGridId} // Grille sélectionnée actuellement
        onSelectGrid={onSelectGrid} // Callback pour gérer la sélection d'une grille
      />

      {/* Section pour les grilles terminées */}
      <GridSection
        title="Grilles Terminées" // Titre de la section
        grids={completedGrids} // Liste des grilles terminées
        selectedGridId={selectedGridId} // Grille sélectionnée actuellement
        onSelectGrid={onSelectGrid} // Callback pour gérer la sélection d'une grille
      />
    </div>
  );
};


/*
Division des grilles :

Les grilles sont séparées en deux catégories :
En cours (active) : Les grilles en cours d'activité.
Terminées (completed) : Les grilles ayant un statut complété.
Répartition des sections :

Chaque catégorie de grilles est affichée dans sa propre section à l'aide du composant GridSection.
Structure du conteneur principal :

Le conteneur principal utilise flex flex-col pour une disposition verticale.
space-y-6 ajoute un espacement uniforme entre les sections.
overflow-auto permet de scroller si le contenu dépasse la hauteur disponible.
Gestion de la sélection :

Le composant transmet l'ID de la grille sélectionnée (selectedGridId) et utilise une fonction de rappel (onSelectGrid) pour gérer les interactions.
Réutilisation du composant GridSection :

Le composant GridSection est utilisé pour afficher les deux catégories de grilles.
Cela garantit une séparation claire des responsabilités et une meilleure maintenabilité.
Ce composant agit comme une barre latérale pour afficher les grilles disponibles, divisées par statut, et permet de sélectionner une grille pour des actions ou des affichages supplémentaires.
*/
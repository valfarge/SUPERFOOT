// Importation des types nécessaires
import { Grid, Match } from "@/types/grid";

// Importation des composants pour afficher les grilles sélectionnées
import { MainGrid } from "../admin/grids/MainGrid"; // Affichage d'une grille en cours
import { CompletedGrid } from "../admin/grids/GridList"; // Affichage d'une grille terminée

// Définition des props pour le composant MainContent
interface MainContentProps {
  selectedGrid: Grid | null; // Grille actuellement sélectionnée (en cours) ou null
  selectedCompletedGrid: Grid | null; // Grille terminée sélectionnée ou null
  matches: Match[]; // Liste des matchs associés à la grille sélectionnée
}

// Définition du composant MainContent
export const MainContent = ({
  selectedGrid,
  selectedCompletedGrid,
  matches,
}: MainContentProps) => {
  return (
    <div className="col-span-6 flex flex-col">
      {/* Conteneur principal pour le contenu */}
      <div className="flex-1 bg-gray-800 p-6 rounded-lg overflow-auto">
        {selectedGrid ? (
          // Si une grille en cours est sélectionnée, afficher MainGrid
          <MainGrid grid={selectedGrid} matches={matches} />
        ) : selectedCompletedGrid ? (
          // Si une grille terminée est sélectionnée, afficher CompletedGrid
          <CompletedGrid grid={selectedCompletedGrid} matches={matches} />
        ) : (
          // Si aucune grille n'est sélectionnée, afficher un message par défaut
          <div className="h-full flex items-center justify-center text-gray-400">
            Sélectionnez une grille pour commencer
          </div>
        )}
      </div>
    </div>
  );
};

/*
Explications des commentaires :
Structure et dispositions :

Le composant utilise col-span-6 pour occuper 6 colonnes sur une grille CSS définie dans un conteneur parent.
flex flex-col permet une disposition verticale des éléments.
Affichage conditionnel :

Trois scénarios sont gérés :
selectedGrid non null : Affichage de la grille en cours avec le composant MainGrid.
selectedCompletedGrid non null : Affichage de la grille terminée avec le composant CompletedGrid.
Aucun des deux : Affichage d'un message informant l'utilisateur qu'il doit sélectionner une grille.
Composants réutilisables :

MainGrid : Gère l'affichage et les interactions pour une grille en cours.
CompletedGrid : Gère l'affichage des résultats ou des informations d'une grille terminée.
La séparation des responsabilités entre ces deux composants rend le code plus clair et maintenable.
Gestion des styles :

bg-gray-800 pour un arrière-plan sombre.
p-6 rounded-lg ajoute un espacement et des bords arrondis.
overflow-auto permet de scroller si le contenu dépasse la hauteur disponible.
Fallback (message par défaut) :

Si aucune grille n'est sélectionnée, un message centré informe l'utilisateur de sélectionner une grille.
Ce composant sert de contenu principal pour afficher soit une grille en cours, soit une grille terminée, ou un message par défaut si aucune grille n'est sélectionnée.
*/
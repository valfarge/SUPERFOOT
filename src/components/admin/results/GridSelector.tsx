// Importation des types et icônes nécessaires
import { Grid } from '@/types/grid'; // Type pour représenter une grille
import { Trophy, Calendar } from 'lucide-react'; // Icônes pour l'affichage

// Définition des propriétés acceptées par le composant `GridSelector`
interface GridSelectorProps {
  activeGrids: Grid[]; // Liste des grilles actives (en attente de résultats)
  completedGrids: Grid[]; // Liste des grilles terminées
  selectedGridId?: number; // ID de la grille actuellement sélectionnée
  onSelectGrid: (grid: Grid) => void; // Fonction appelée lorsqu'une grille est sélectionnée
  isLoading: boolean; // Indique si une action est en cours de chargement
}

// Composant principal `GridSelector`
export const GridSelector = ({
  activeGrids,
  completedGrids,
  selectedGridId,
  onSelectGrid,
  isLoading,
}: GridSelectorProps) => {
  // Composant interne pour afficher une liste de grilles avec un titre
  const GridList = ({ grids, title }: { grids: Grid[]; title: string }) => (
    <div className="bg-gray-800 p-4 rounded-lg">
      {/* Titre de la liste (par exemple, "Grilles en Attente de Résultats") */}
      <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
        <Trophy className="w-5 h-5 mr-2" /> {/* Icône de trophée */}
        {title}
      </h3>
      <div className="space-y-2">
        {/* Affichage d'un message si aucune grille n'est disponible */}
        {grids.length === 0 ? (
          <div className="text-gray-400 text-center py-4">
            Aucune grille disponible
          </div>
        ) : (
          // Affichage de chaque grille
          grids.map((grid) => (
            <button
              key={grid.id} // Identifiant unique de la grille
              onClick={() => onSelectGrid(grid)} // Appelle `onSelectGrid` avec la grille sélectionnée
              disabled={isLoading} // Désactive le bouton si une action est en cours
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                selectedGridId === grid.id
                  ? 'bg-blue-600 text-white' // Style pour la grille sélectionnée
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600' // Style pour les autres grilles
              }`}
            >
              <div className="flex justify-between items-center">
                {/* Nom de la grille */}
                <span className="font-medium">{grid.name}</span>
                <Calendar className="w-4 h-4" /> {/* Icône de calendrier */}
              </div>
              <div className="text-sm mt-1">
                {/* Montant garanti et date limite */}
                <div
                  className={
                    selectedGridId === grid.id
                      ? 'text-blue-200'
                      : 'text-gray-400'
                  }
                >
                  {grid.guaranteedSum.toLocaleString()} € garantis
                </div>
                <div
                  className={
                    selectedGridId === grid.id
                      ? 'text-blue-200'
                      : 'text-gray-400'
                  }
                >
                  {new Date(grid.deadline).toLocaleDateString()} {/* Formate la date */}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Liste des grilles actives */}
      <GridList title="Grilles en Attente de Résultats" grids={activeGrids} />
      {/* Liste des grilles terminées */}
      <GridList title="Grilles Terminées" grids={completedGrids} />
    </div>
  );
};

/*
Explication des fonctionnalités :
Deux sections principales :

Grilles actives : Représente les grilles en attente de résultats (statut actif).
Grilles terminées : Représente les grilles dont les résultats sont déjà publiés (statut terminé).
Sélection d'une grille :

Lorsque l'utilisateur clique sur une grille, la fonction onSelectGrid est appelée avec les détails de la grille.
Style dynamique :

La grille sélectionnée est mise en évidence avec un style différent (bg-blue-600).
Les autres grilles utilisent un style par défaut (bg-gray-700).
Gestion des états :

Si isLoading est vrai, les boutons sont désactivés pour éviter des actions multiples.
Message par défaut :

Si aucune grille n'est disponible dans une section, un message approprié est affiché ("Aucune grille disponible").
Améliorations possibles :
Accessibilité :

Ajouter des attributs ARIA pour indiquer l'état sélectionné ou non des grilles.
Gestion des erreurs :

Ajouter une vérification ou un message en cas d'erreur lors du chargement des grilles.
Optimisation des performances :

Utiliser React.memo pour éviter de re-render les composants si les grilles n'ont pas changé.
Modularité :

Extraire le bouton de grille dans un composant séparé pour améliorer la lisibilité.
Résumé :
Ce composant est bien structuré, affiche une liste de grilles filtrées et gère leur sélection efficacement. Avec quelques optimisations et une meilleure gestion de l'accessibilité, il serait encore plus robuste.
*/
// Importation des dépendances et des composants nécessaires
import { Grid } from "@/types/grid"; // Type pour la grille
import { ResultsAmount } from "@/components/client/ResultsAmount"; // Composant pour afficher les montants
import { WinningCombination } from "@/components/client/WinningCombination"; // Composant pour afficher la combinaison gagnante
import { WinnersByRank } from "@/components/client/WinnersByRank"; // Composant pour afficher les gagnants par rang
import { Trophy, Edit } from "lucide-react"; // Icônes pour l'interface
import { Button } from "@/components/ui/button"; // Bouton réutilisable

// Interface pour les propriétés du composant
interface ResultsSummaryProps {
  grid: Grid; // Informations sur la grille
  results: {
    totalCollected: number; // Montant total collecté
    rank1Amount: number; // Montant du rang 1
    guaranteedAmount: number; // Montant garanti
    winningCombination: ("1" | "N" | "2")[]; // Combinaison gagnante
    winners: {
      rank15: { count: number; prize: number }; // Gagnants et gains pour le rang 15
      rank14: { count: number; prize: number }; // Gagnants et gains pour le rang 14
      rank13: { count: number; prize: number }; // Gagnants et gains pour le rang 13
      rank12: { count: number; prize: number }; // Gagnants et gains pour le rang 12
    };
  };
  onEdit: () => void; // Fonction appelée lorsque l'utilisateur clique sur "Modifier"
}

// Composant principal pour afficher le résumé des résultats
export const ResultsSummary = ({
  grid, // Détails de la grille
  results, // Résultats associés
  onEdit, // Fonction pour éditer les résultats
}: ResultsSummaryProps) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      {/* En-tête avec le titre et le bouton "Modifier" */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Trophy className="w-6 h-6 text-yellow-400 mr-3" /> {/* Icône de trophée */}
          <h3 className="text-xl font-semibold text-white">
            Résultats - {grid.name} {/* Nom de la grille */}
          </h3>
        </div>
        <Button onClick={onEdit} variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" /> {/* Icône de modification */}
          Modifier
        </Button>
      </div>

      {/* Contenu des résultats */}
      <div className="space-y-6">
        {/* Debug : affichage des données pour vérifier leur contenu */}
        console.log("Données passées à ResultsSummary :", results);

        {/* Montants collectés, garantis et du rang 1 */}
        <ResultsAmount
          totalCollected={results?.totalCollected ?? 0} // Valeur par défaut : 0
          rank1Amount={results?.rank1Amount ?? 0} // Valeur par défaut : 0
          guaranteedAmount={results?.guaranteedAmount ?? 0} // Valeur par défaut : 0
        />

        {/* Combinaison gagnante */}
        <WinningCombination combination={results?.winningCombination ?? []} /> {/* Liste vide par défaut */}

        {/* Résultats par rang (avec valeurs par défaut si les données sont manquantes) */}
        <WinnersByRank
          winners={
            results?.winners ?? { // Si `results.winners` est absent, utilise ces valeurs par défaut
              rank15: { count: 0, prize: 0 },
              rank14: { count: 0, prize: 0 },
              rank13: { count: 0, prize: 0 },
              rank12: { count: 0, prize: 0 },
            }
          }
        />
      </div>
    </div>
  );
};

/*
Points clés du composant :
En-tête :

Affiche le nom de la grille et inclut un bouton "Modifier" pour permettre des ajustements.
Utilise une icône Trophy pour indiquer visuellement qu'il s'agit des résultats.
Résultats :

Affiche les montants collectés, garantis, et du rang 1 via le composant ResultsAmount.
Présente la combinaison gagnante à l'aide du composant WinningCombination.
Montre les gagnants par rang et leurs gains via le composant WinnersByRank.
Valeurs par défaut :

Utilisation de l'opérateur ?? pour s'assurer que des valeurs par défaut sont fournies si les données sont manquantes.
Composant réutilisable :

Les sous-composants (ResultsAmount, WinningCombination, WinnersByRank) sont intégrés, ce qui facilite leur gestion et réutilisation dans d'autres parties de l'application.
Suggestions d'amélioration :
Validation des données : Ajouter des vérifications pour s'assurer que les valeurs reçues via results sont valides (par exemple, totalCollected ne doit pas être négatif).
Gestion des erreurs : Si certaines données critiques manquent, afficher un message informatif ou un indicateur visuel.
Accessibilité : Ajouter des étiquettes pour les lecteurs d'écran aux boutons et sections critiques.
*/
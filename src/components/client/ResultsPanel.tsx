import React from "react";
import { Trophy, History } from "lucide-react"; // Import des icônes pour une meilleure UI
import { Button } from "@/components/ui/button"; // Bouton personnalisé
import { GridResult } from "@/types/grid"; // Type représentant les résultats d'une grille
import { ResultsAmount } from "./ResultsAmount"; // Composant pour afficher les montants
import { WinnersByRank } from "./WinnersByRank"; // Composant pour afficher les gagnants par rang
import { WinningCombination } from "./WinningCombination"; // Composant pour afficher la combinaison gagnante

// Props attendues par le composant ResultsPanel
interface ResultsPanelProps {
  result: GridResult | null; // Les résultats à afficher, ou null si aucun résultat
  onHistoryClick?: () => void; // Fonction pour gérer l'affichage des détails (optionnelle)
}

// Composant principal
export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  result,
  onHistoryClick,
}) => {
  // Affichage par défaut si aucun résultat n'est fourni
  if (!result) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg h-full">
        {/* En-tête */}
        <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Résultats
        </h2>
        {/* Message informatif */}
        <div className="text-gray-400 text-center mt-8">
          Sélectionnez une grille terminée pour voir les résultats
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      {/* En-tête avec le titre et un bouton pour les détails */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Résultats Grille #{result.gridId}
        </h2>
        {onHistoryClick && (
          // Bouton pour afficher les détails historiques
          <Button variant="outline" size="sm" onClick={onHistoryClick}>
            <History className="w-4 h-4 mr-2" />
            Détails
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Montants collectés, reportés et garantis */}
        <ResultsAmount
          totalCollected={result.totalCollected}
          rank1Amount={result.rank1Amount}
          guaranteedAmount={result.guaranteedAmount}
        />

        {/* Combinaison gagnante */}
        {result.winningCombination && result.winningCombination.length > 0 && (
          <WinningCombination combination={result.winningCombination} />
        )}

        {/* Liste des gagnants par rang */}
        {result.winners && <WinnersByRank winners={result.winners} />}
      </div>
    </div>
  );
};

/*
Points importants des commentaires :
Structure conditionnelle :

Si result est null, un message informatif est affiché à l'utilisateur.
Si result est fourni, les données de la grille sont affichées à travers des composants spécifiques (ResultsAmount, WinningCombination, WinnersByRank).
Bouton de détails :

Si onHistoryClick est fourni (facultatif), un bouton apparaît pour afficher des détails supplémentaires.
Utilisation des composants enfants :

ResultsAmount : Affiche les montants financiers de la grille.
WinningCombination : Affiche la combinaison gagnante si elle existe.
WinnersByRank : Affiche les informations des gagnants par rang.
Style et accessibilité :

Utilisation des icônes pour une interface claire et intuitive.
Gestion de classes CSS (text-gray-400, bg-gray-800) pour maintenir un style cohérent.
Réutilisabilité :

Ce composant est conçu pour être utilisé dans différentes parties de l'application où les résultats de grilles sont affichés.
*/
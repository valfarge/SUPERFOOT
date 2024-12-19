// Composant React pour afficher les résultats d'une grille
import React from "react";
import { GridResult } from "../../types/match"; // Type des résultats de grille
import { Trophy, TrendingUp, Users } from "lucide-react"; // Icônes pour l'interface

// Interface pour définir les propriétés du composant
interface ResultsPanelProps {
  result: GridResult | null; // Les résultats d'une grille ou null si aucun résultat sélectionné
}

// Déclaration du composant principal
export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
  // Si aucun résultat n'est sélectionné, affiche un message par défaut
  if (!result) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg h-full">
        {/* Titre de la section */}
        <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2" /> {/* Icône de trophée */}
          Résultats
        </h2>
        {/* Message par défaut */}
        <div className="text-gray-400 text-center mt-8">
          Sélectionnez une grille terminée pour voir les résultats
        </div>
      </div>
    );
  }

  // Affichage des résultats pour une grille sélectionnée
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      {/* Titre avec l'ID de la grille */}
      <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
        <Trophy className="w-5 h-5 mr-2" /> {/* Icône de trophée */}
        Résultats Grille #{result.gridId}
      </h2>

      <div className="space-y-6">
        {/* Section des montants collectés et garantis */}
        <div className="bg-gray-700 p-4 rounded-lg">
          {/* Titre de la section */}
          <div className="flex items-center text-blue-400 mb-2">
            <TrendingUp className="w-4 h-4 mr-2" /> {/* Icône de tendance */}
            <h3 className="font-medium">Montants</h3>
          </div>
          {/* Montants affichés */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Collecté :</span>
              <span className="text-white font-medium">
                {result.totalCollected.toLocaleString()} € {/* Montant collecté formaté */}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Report rang 1 :</span>
              <span className="text-white font-medium">
                {result.rank1Amount.toLocaleString()} € {/* Montant reporté */}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Garanti :</span>
              <span className="text-white font-medium">
                {result.guaranteedAmount.toLocaleString()} € {/* Montant garanti */}
              </span>
            </div>
          </div>
        </div>

        {/* Section de la combinaison gagnante */}
        <div className="bg-gray-700 p-4 rounded-lg">
          {/* Titre de la section */}
          <div className="flex items-center text-green-400 mb-2">
            <Users className="w-4 h-4 mr-2" /> {/* Icône de groupe */}
            <h3 className="font-medium">Combinaison Gagnante</h3>
          </div>
          {/* Affichage de la combinaison sous forme de grille */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {result.winningCombination.map((result, index) => (
              <div
                key={index}
                className="bg-gray-600 p-2 rounded text-center text-white font-medium"
              >
                {result} {/* Résultat individuel de la combinaison */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/*
Points clés du composant
Gestion des états vides : Si aucun résultat n'est fourni (result est null), un message par défaut est affiché.
Affichage des montants : Le composant affiche les montants collectés, garantis, et reportés dans une section dédiée.
Combinaison gagnante : Présente la combinaison gagnante sous forme de grille.
Structure réutilisable : Le composant est bien structuré et peut être facilement étendu ou modifié.
Suggestions d'amélioration
Accessibilité : Ajouter des aria-labels aux éléments interactifs ou visuels pour améliorer l'accessibilité.
Gestion des erreurs : Prévoir un comportement en cas de données incomplètes (exemple : si une clé manque dans result).
Personnalisation : Ajouter des styles dynamiques ou des couleurs spécifiques pour les résultats gagnants afin de rendre l'interface plus engageante.
*/
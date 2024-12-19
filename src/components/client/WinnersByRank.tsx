// Importation de l'icône Award pour une meilleure interface utilisateur
import { Award } from 'lucide-react';

// Interface pour représenter les props d'un rang spécifique
interface WinnersRankProps {
  rank: string; // Le nom du rang, par exemple "15/15"
  count: number; // Nombre de gagnants pour ce rang
  prize: number; // Montant gagné pour ce rang
}

// Composant fonctionnel pour afficher un rang et ses détails
const WinnersRank = ({ rank, count, prize }: WinnersRankProps) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-600 last:border-0">
    <div className="flex items-center">
      {/* Affiche le nom du rang et le nombre de gagnants */}
      <span className="text-gray-400">{rank}</span>
      <span className="text-white ml-2">({count} gagnants)</span>
    </div>
    {/* Affiche le montant gagné par gagnant pour ce rang */}
    <span className="text-green-400 font-medium">{prize.toLocaleString()} €</span>
  </div>
);

// Interface pour représenter les props passées au composant WinnersByRank
interface WinnersByRankProps {
  winners: {
    rank15: { count: number; prize: number }; // Détails pour le rang 15/15
    rank14: { count: number; prize: number }; // Détails pour le rang 14/15
    rank13: { count: number; prize: number }; // Détails pour le rang 13/15
    rank12: { count: number; prize: number }; // Détails pour le rang 12/15
  };
}

// Composant principal pour afficher les détails des gagnants par rang
export const WinnersByRank = ({ winners }: WinnersByRankProps) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      {/* En-tête de la section avec l'icône Award */}
      <div className="flex items-center text-yellow-400 mb-4">
        <Award className="w-4 h-4 mr-2" />
        <h3 className="font-medium">Gains par Rang</h3>
      </div>
      {/* Liste des rangs et leurs détails */}
      <div className="space-y-1">
        {/* Utilisation du composant WinnersRank pour chaque rang */}
        <WinnersRank rank="15/15" count={winners.rank15.count} prize={winners.rank15.prize} />
        <WinnersRank rank="14/15" count={winners.rank14.count} prize={winners.rank14.prize} />
        <WinnersRank rank="13/15" count={winners.rank13.count} prize={winners.rank13.prize} />
        <WinnersRank rank="12/15" count={winners.rank12.count} prize={winners.rank12.prize} />
      </div>
    </div>
  );
};

/*
WinnersRank :

Ce composant est dédié à l'affichage d'un seul rang avec son nombre de gagnants et le montant gagné.
Il applique un style cohérent avec une bordure inférieure sauf pour le dernier élément.
WinnersByRank :

Ce composant utilise WinnersRank pour afficher chaque rang.
Les données pour les rangs (comme rank15, rank14, etc.) sont passées via la prop winners.
Structure hiérarchique :

WinnersByRank encapsule la logique d'affichage pour chaque rang en utilisant un sous-composant (WinnersRank), ce qui améliore la lisibilité et la modularité du code.
Responsabilité unique :

WinnersByRank se concentre sur l'affichage global de la section "Gains par Rang".
WinnersRank est responsable de l'affichage individuel pour un seul rang.
*/
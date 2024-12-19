// Composant pour gérer la distribution des gains parmi les gagnants d'une grille
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrendingUp, Save } from "lucide-react";

// Interface pour définir les propriétés du composant
interface PrizeDistributionProps {
  winners: {
    rank15: { count: number; prize: number }; // Gagnants et gains pour le rang 15/15
    rank14: { count: number; prize: number }; // Gagnants et gains pour le rang 14/15
    rank13: { count: number; prize: number }; // Gagnants et gains pour le rang 13/15
    rank12: { count: number; prize: number }; // Gagnants et gains pour le rang 12/15
  };
  totalCollected: number; // Montant total collecté pour la grille
  guaranteedAmount: number; // Montant garanti pour les gains
  onTotalCollectedChange: (amount: number) => void; // Fonction pour mettre à jour le montant collecté
  onPrev: () => void; // Fonction pour retourner à l'étape précédente
  onSubmit: () => void; // Fonction pour soumettre les résultats finaux
  isSubmitting: boolean; // Indicateur de soumission en cours
}

// Déclaration du composant principal
export const PrizeDistribution = ({
  winners,
  totalCollected,
  guaranteedAmount,
  onTotalCollectedChange,
  onPrev,
  onSubmit,
  isSubmitting,
}: PrizeDistributionProps) => {
  // Fonction pour calculer les gains par gagnant
  const calculatePrizes = () => {
    const totalToDistribute = Math.max(totalCollected, guaranteedAmount); // On distribue le plus élevé entre le montant collecté et garanti
    const totalWinners = Object.values(winners).reduce(
      (sum, { count }) => sum + count, // Total des gagnants sur tous les rangs
      0
    );

    if (totalWinners === 0) return; // Si aucun gagnant, ne calcule pas les gains

    // Distribution des gains par rang (exemple arbitraire)
    const distribution = {
      rank15: 0.4, // 40% pour les gagnants du rang 15/15
      rank14: 0.3, // 30% pour les gagnants du rang 14/15
      rank13: 0.2, // 20% pour les gagnants du rang 13/15
      rank12: 0.1, // 10% pour les gagnants du rang 12/15
    };

    // Calcul des gains par rang
    return Object.entries(winners).reduce((acc, [rank, { count }]) => {
      if (count > 0) {
        const rankShare = totalToDistribute * distribution[rank as keyof typeof distribution]; // Part pour ce rang
        const prizePerWinner = Math.floor(rankShare / count); // Gain par gagnant
        acc[rank as keyof typeof winners] = {
          ...winners[rank as keyof typeof winners],
          prize: prizePerWinner, // Mise à jour du gain dans l'accumulateur
        };
      }
      return acc;
    }, {} as typeof winners);
  };

  const prizes = calculatePrizes(); // Calcul des gains pour affichage

  return (
    <div className="space-y-6">
      {/* Titre de la section */}
      <div className="flex items-center text-green-400 mb-4">
        <TrendingUp className="w-5 h-5 mr-2" />
        <h3 className="text-lg font-medium">Distribution des Gains</h3>
      </div>

      {/* Saisie du montant collecté */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">
            Montant Total Collecté
          </label>
          <Input
            type="number"
            min="0"
            value={totalCollected} // Affiche le montant actuel
            onChange={(e) =>
              onTotalCollectedChange(parseInt(e.target.value) || 0) // Met à jour le montant collecté
            }
            className="bg-gray-700 text-white"
          />
        </div>

        {/* Affichage des gains calculés par rang */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="space-y-4">
            {prizes &&
              Object.entries(prizes).map(([rank, { count, prize }]) => (
                <div key={rank} className="flex justify-between items-center">
                  <span className="text-gray-300">
                    {rank.replace("rank", "")}/15 ({count} gagnants) {/* Affiche le rang et le nombre de gagnants */}
                  </span>
                  <span className="text-green-400 font-medium">
                    {prize.toLocaleString()} € par gagnant {/* Affiche le gain par gagnant */}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Boutons pour navigation entre étapes et soumission */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrev}>
          Retour {/* Bouton pour revenir à l'étape précédente */}
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? "Validation..." : "Valider les Résultats"} {/* Bouton pour valider */}
        </Button>
      </div>
    </div>
  );
};
/*
Résumé des fonctionnalités
Saisie du montant collecté : Permet de modifier le montant total collecté.
Calcul des gains par rang : Distribue les gains entre les rangs en fonction d'un pourcentage prédéfini.
Affichage dynamique : Montre le nombre de gagnants et leurs gains calculés par rang.
Navigation : Offre des boutons pour revenir à l'étape précédente ou soumettre les résultats.
Points d'amélioration possibles
Gestion des erreurs : Ajouter une vérification si prizes est vide ou si calculatePrizes échoue.
Personnalisation des pourcentages : Permettre à l’utilisateur de modifier les parts de distribution directement dans l’interface.
Optimisation des calculs : Sauvegarder les résultats dans un état local pour éviter de recalculer à chaque rendu.
*/
// Importation des composants pour le dialogue et les icônes
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Grid, Match, GridResult } from "@/types/grid";
import { ResultsAmount } from "@/components/client/ResultsAmount";
import { WinningCombination } from "@/components/client/WinningCombination";
import { WinnersByRank } from "@/components/client/WinnersByRank";
import { HistoryMatchList } from "./HistoryMatchList";
import { Trophy, Calendar, Users } from "lucide-react";

// Définition des props pour le composant GridHistoryModal
interface GridHistoryModalProps {
  isOpen: boolean; // Indique si le modal est ouvert ou non
  onClose: () => void; // Fonction pour fermer le modal
  grid: Grid | null; // La grille sélectionnée (null si aucune grille n'est sélectionnée)
  matches: Match[]; // Liste des matchs de la grille
  result: GridResult | null; // Résultats de la grille
}

// Définition du composant GridHistoryModal
export const GridHistoryModal = ({
  isOpen,
  onClose,
  grid,
  matches,
  result,
}: GridHistoryModalProps) => {
  // Si aucune grille ou résultat n'est fourni, le composant ne renvoie rien
  if (!grid || !result) return null;

  return (
    // Utilisation du composant Dialog pour créer une fenêtre modale
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-800 text-white p-6">
        {/* En-tête du modal */}
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-400" />
            {grid.name} {/* Nom de la grille */}
          </DialogTitle>
        </DialogHeader>

        {/* Contenu principal du modal */}
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {/* Informations générales sur la grille */}
          <div className="grid grid-cols-2 gap-4">
            {/* Bloc pour les informations de la grille */}
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center text-blue-400 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <h3 className="font-medium text-sm">Informations</h3>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Date :</span>
                  <span className="text-white">
                    {new Date(grid.deadline).toLocaleDateString()} {/* Date de la grille */}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Garanti :</span>
                  <span className="text-white">
                    {grid.guaranteedSum.toLocaleString()} € {/* Montant garanti */}
                  </span>
                </div>
              </div>
            </div>

            {/* Bloc pour les informations de participation */}
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center text-green-400 mb-2">
                <Users className="w-4 h-4 mr-2" />
                <h3 className="font-medium text-sm">Participation</h3>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Participants :</span>
                  <span className="text-white">
                    {Math.floor(result.totalCollected / 2).toLocaleString()} {/* Nombre estimé de participants */}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mise :</span>
                  <span className="text-white">2 €</span> {/* Mise fixe */}
                </div>
              </div>
            </div>
          </div>

          {/* Résultats et gains */}
          <div className="space-y-4">
            {/* Montants collectés, garantis et reportés */}
            <ResultsAmount
              totalCollected={result.totalCollected}
              rank1Amount={result.rank1Amount}
              guaranteedAmount={result.guaranteedAmount}
            />

            {/* Combinaison gagnante */}
            <WinningCombination combination={result.winningCombination} />

            {/* Gagnants par rang */}
            <WinnersByRank winners={result.winners} />
          </div>

          {/* Liste des matchs et résultats */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-semibold mb-3">Matchs et Résultats</h3>
            <HistoryMatchList matches={matches} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/*

Explications des commentaires :
Conditions initiales (if (!grid || !result)) :

Si aucune grille ou résultat n'est fourni, le modal ne s'affiche pas pour éviter une erreur d'affichage.
Utilisation de composants :

Les composants ResultsAmount, WinningCombination, et WinnersByRank gèrent respectivement :
Les informations financières.
La combinaison gagnante.
Les gagnants par rang.
Style de présentation :

Le modal est stylé pour occuper une largeur maximale (max-w-2xl) avec un fond sombre et une couleur de texte blanche.
Conteneur scrollable :

La classe max-h-[70vh] permet de limiter la hauteur du contenu avec un comportement de défilement (overflow-y-auto).
Participants estimés :

Le calcul Math.floor(result.totalCollected / 2) est une estimation du nombre de participants basée sur une mise fixe de 2 € par participant.
Bloc pour les informations générales :

Présentation de la date et du montant garanti sous une forme claire et concise.
Réutilisation de composants :

Les blocs de résultats et de matchs utilisent des composants déjà créés pour éviter la duplication de code.
*/
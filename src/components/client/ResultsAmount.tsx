import { TrendingUp } from 'lucide-react'; // Icone pour indiquer la section "Montants"

interface ResultsAmountProps {
  totalCollected: number; // Montant total collecté
  rank1Amount: number;    // Montant reporté pour le rang 1
  guaranteedAmount: number; // Montant garanti pour la grille
}

// Composant pour afficher les montants financiers d'une grille
export const ResultsAmount = ({ totalCollected, rank1Amount, guaranteedAmount }: ResultsAmountProps) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg"> {/* Conteneur principal avec un fond gris et des bordures arrondies */}
      <div className="flex items-center text-blue-400 mb-2"> {/* Titre de la section avec une icône */}
        <TrendingUp className="w-4 h-4 mr-2" /> {/* Icône de tendance */}
        <h3 className="font-medium">Montants</h3> {/* Titre "Montants" */}
      </div>
      <div className="space-y-2"> {/* Espacement vertical entre les montants */}
        {/* Affichage du montant total collecté */}
        <div className="flex justify-between"> 
          <span className="text-gray-400">Collecté :</span> {/* Label */}
          <span className="text-white font-medium">
            {totalCollected.toLocaleString()} € {/* Formatage du montant en chaîne locale */}
          </span>
        </div>
        {/* Affichage du montant reporté pour le rang 1 */}
        <div className="flex justify-between">
          <span className="text-gray-400">Report rang 1 :</span> {/* Label */}
          <span className="text-white font-medium">
            {rank1Amount.toLocaleString()} € {/* Formatage du montant */}
          </span>
        </div>
        {/* Affichage du montant garanti */}
        <div className="flex justify-between">
          <span className="text-gray-400">Garanti :</span> {/* Label */}
          <span className="text-white font-medium">
            {guaranteedAmount.toLocaleString()} € {/* Formatage du montant */}
          </span>
        </div>
      </div>
    </div>
  );
};

/*
Points importants des commentaires :
Structure :

Le conteneur principal utilise une classe CSS pour le style (fond gris foncé, padding, bordures arrondies).
Chaque ligne de montant est structurée avec une disposition flexible (alignement entre le label et le montant).
Propriétés :

totalCollected, rank1Amount, et guaranteedAmount sont les données affichées.
Ces montants sont formatés avec toLocaleString() pour afficher des séparateurs de milliers adaptés à la locale.
Accessibilité visuelle :

Les labels sont en gris clair pour un contraste léger avec le fond.
Les montants sont en blanc avec une police medium pour les mettre en valeur.
Réutilisabilité :

Ce composant est autonome et peut être utilisé dans différents endroits pour afficher des informations financières liées à une grille.
*/
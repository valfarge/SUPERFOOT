// Importation des types nécessaires
import { Match } from '@/types/grid';

// Définition des propriétés acceptées par le composant `MatchResultInput`
interface MatchResultInputProps {
  match: Match; // Les informations concernant un match (équipes, logos, etc.)
  selectedResult?: '1' | 'N' | '2'; // Le résultat sélectionné pour ce match ('1' pour équipe 1, 'N' pour nul, '2' pour équipe 2)
  onResultSelect: (result: '1' | 'N' | '2') => void; // Fonction appelée lorsque l'utilisateur sélectionne un résultat
}

// Composant principal `MatchResultInput`
export const MatchResultInput = ({
  match, // Données du match (nom des équipes, logos)
  selectedResult, // Résultat actuellement sélectionné
  onResultSelect, // Callback pour gérer la sélection d'un résultat
}: MatchResultInputProps) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      {/* Affichage des équipes */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          {/* Affichage de l'équipe 1 */}
          <div className="flex items-center space-x-3">
            <img src={match.team1Logo} alt={match.team1} className="w-8 h-8 rounded-full" />
            <span className="text-white font-medium">{match.team1}</span>
          </div>

          {/* Séparateur "vs" */}
          <span className="text-gray-400">vs</span>

          {/* Affichage de l'équipe 2 */}
          <div className="flex items-center space-x-3">
            <span className="text-white font-medium">{match.team2}</span>
            <img src={match.team2Logo} alt={match.team2} className="w-8 h-8 rounded-full" />
          </div>
        </div>

        {/* Boutons pour sélectionner un résultat */}
        <div className="flex space-x-2">
          {(['1', 'N', '2'] as const).map((result) => (
            <button
              key={result} // Clé unique pour chaque bouton
              onClick={() => onResultSelect(result)} // Appelle `onResultSelect` avec la valeur sélectionnée
              className={`w-12 h-12 rounded-lg font-medium transition-colors ${
                selectedResult === result
                  ? 'bg-blue-600 text-white' // Style pour le bouton sélectionné
                  : 'bg-gray-600 text-white hover:bg-gray-500' // Style par défaut avec effet hover
              }`}
            >
              {result} {/* Affiche "1", "N" ou "2" */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/*
Explication des fonctionnalités :
Affichage des équipes :

Chaque équipe est affichée avec son logo et son nom.
Les logos sont affichés sous forme d'images rondes (classe rounded-full).
Boutons pour les résultats :

Trois boutons permettent de sélectionner le résultat :
1 pour une victoire de l'équipe 1.
N pour un match nul.
2 pour une victoire de l'équipe 2.
Le bouton correspondant au résultat sélectionné est mis en évidence avec une couleur différente (bg-blue-600).
Interaction utilisateur :

Lorsqu'un utilisateur clique sur un bouton, la fonction onResultSelect est appelée avec le résultat sélectionné.
Styles dynamiques :

Les boutons non sélectionnés ont un style par défaut, et un effet de survol (hover:bg-gray-500).
Le bouton sélectionné utilise une couleur spécifique pour le différencier (bg-blue-600).
Améliorations possibles :
Accessibilité :

Ajouter des attributs ARIA pour indiquer quel bouton est actuellement sélectionné.
Par exemple : aria-pressed={selectedResult === result}.
Gestion des erreurs :

Afficher un message ou un état visuel si le logo d'une équipe n'est pas disponible (par exemple, utiliser une image de remplacement).
Modularité :

Extraire les sections pour l'équipe 1 et l'équipe 2 dans des composants séparés pour une meilleure lisibilité.
Optimisation :

Utiliser React.memo si les données des matchs ne changent pas souvent, pour éviter des re-rendus inutiles.
Résumé :
Le composant MatchResultInput est simple et efficace pour afficher les détails d'un match et permettre la sélection d'un résultat. Avec quelques améliorations sur l'accessibilité et la modularité, il serait encore plus robuste et maintenable.
*/
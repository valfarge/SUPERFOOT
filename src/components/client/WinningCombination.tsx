// Importation de l'icône Users pour l'interface utilisateur
import { Users } from 'lucide-react';

// Définition de l'interface des props du composant
interface WinningCombinationProps {
  combination?: ('1' | 'N' | '2')[]; // La combinaison gagnante est optionnelle (par défaut vide)
}

// Définition du composant WinningCombination
export const WinningCombination = ({ combination = [] }: WinningCombinationProps) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      {/* En-tête de la section avec l'icône Users */}
      <div className="flex items-center text-green-400 mb-2">
        <Users className="w-4 h-4 mr-2" />
        <h3 className="font-medium">Combinaison Gagnante</h3>
      </div>

      {/* Affichage de la combinaison gagnante sous forme de grille */}
      <div className="grid grid-cols-5 gap-2 mt-2">
        {combination.map((result, index) => (
          <div
            key={index} // Chaque élément de la combinaison doit avoir une clé unique
            className="bg-gray-600 p-2 rounded text-center text-white font-medium"
          >
            {result} {/* Affiche chaque élément de la combinaison (par exemple, '1', 'N', '2') */}
          </div>
        ))}
      </div>
    </div>
  );
};

/*
Propriété optionnelle combination :

La combinaison gagnante est définie comme un tableau optionnel de valeurs '1' | 'N' | '2'.
Par défaut, si aucune combinaison n'est passée, elle sera initialisée en tant que tableau vide ([]).
Structure de l'affichage :

Chaque élément de la combinaison est rendu dans une grille de 5 colonnes.
La classe grid-cols-5 gère cette disposition en CSS.
Utilisation de l'icône :

L'icône Users et la couleur text-green-400 ajoutent une touche visuelle au titre de la section.
Accessibilité et lisibilité :

Les éléments de la combinaison sont affichés avec un style centré (text-center) et lisible (text-white font-medium).
Les conteneurs ont un style arrondi et espacé (p-2, rounded).
Utilisation des clés (key) :

Chaque élément de la combinaison utilise l'index comme clé. Cela garantit un rendu efficace et réduit les erreurs de React.
Fallback par défaut :

Si aucune combinaison n'est passée, le tableau vide évite les erreurs de mapping (combination.map).
*/
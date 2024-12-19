// Importation du type Match depuis les types définis
import { Match } from "@/types/grid";

// Définition des props pour le composant HistoryMatchList
interface HistoryMatchListProps {
  matches: Match[]; // Tableau des matchs à afficher
}

// Définition du composant HistoryMatchList
export const HistoryMatchList = ({ matches }: HistoryMatchListProps) => {
  return (
    <div className="space-y-4">
      {/* Boucle sur chaque match pour créer un bloc */}
      {matches.map((match, index) => (
        <div key={match.id} className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            {/* Informations sur l'équipe 1 */}
            <div className="flex items-center space-x-4 flex-1">
              {/* Affiche l'index du match (commence à 1) */}
              <span className="text-gray-400 w-6">{index + 1}</span>

              {/* Détails de l'équipe 1 */}
              <div className="flex items-center space-x-3 flex-1">
                <img
                  src={match.team1Logo}
                  alt={match.team1}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white">{match.team1}</span>
              </div>

              {/* Résultats possibles (1, N, 2) */}
              <div className="flex space-x-2">
                {/* Si le résultat du match est "1", applique une couleur verte */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium ${
                    match.result === "1" ? "bg-green-600" : "bg-gray-600"
                  }`}
                >
                  1
                </div>
                {/* Si le résultat du match est "N", applique une couleur verte */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium ${
                    match.result === "N" ? "bg-green-600" : "bg-gray-600"
                  }`}
                >
                  N
                </div>
                {/* Si le résultat du match est "2", applique une couleur verte */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium ${
                    match.result === "2" ? "bg-green-600" : "bg-gray-600"
                  }`}
                >
                  2
                </div>
              </div>

              {/* Détails de l'équipe 2 */}
              <div className="flex items-center space-x-3 flex-1 justify-end">
                <span className="text-white">{match.team2}</span>
                <img
                  src={match.team2Logo}
                  alt={match.team2}
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/*
Structure principale :

Chaque match est affiché dans un conteneur div avec des bordures arrondies et un fond sombre (bg-gray-800).
Affichage de l'index du match :

L'index du match (1, 2, 3...) est affiché dans la colonne de gauche.
Résultats possibles (1, N, 2) :

Chaque option de résultat est un bouton stylisé (w-10 h-10) avec un fond vert (bg-green-600) si le résultat correspond au match actuel.
Détails des équipes :

Les logos et noms des équipes sont affichés avec des espacements adéquats :
L'équipe 1 est affichée à gauche.
L'équipe 2 est affichée à droite.
Couleurs conditionnelles :

Utilisation de la classe bg-green-600 pour indiquer le résultat sélectionné.
Les options non sélectionnées ont un fond gris (bg-gray-600).
Images des logos des équipes :

Les logos des équipes sont affichés avec une taille fixe (w-8 h-8) et des bords arrondis (rounded-full) pour un rendu esthétique.
Répartition des éléments :

Les équipes et les résultats sont alignés à l'aide de flex pour garantir une disposition propre et structurée.
*/
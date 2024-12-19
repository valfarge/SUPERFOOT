import { useState } from 'react'; // Hook pour gérer l'état local
import { Match, Grid } from '@/types/grid'; // Types pour les matchs et les grilles
import { Button } from '@/components/ui/button'; // Composant de bouton personnalisé
import { Trophy, Save } from 'lucide-react'; // Icônes pour une meilleure UI
import { api } from '@/services/api'; // Service pour interagir avec l'API

// Définition des props attendues par le composant
interface SimpleResultsFormProps {
  grid: Grid; // La grille sélectionnée pour laquelle les résultats doivent être saisis
  matches: Match[]; // Liste des matchs associés à cette grille
  onResultsSubmitted: () => void; // Fonction déclenchée une fois les résultats soumis
}

// Composant principal
export const SimpleResultsForm = ({
  grid,
  matches,
  onResultsSubmitted,
}: SimpleResultsFormProps) => {
  // État pour stocker les résultats saisis pour chaque match
  const [results, setResults] = useState<Record<number, '1' | 'N' | '2'>>({});

  // État pour indiquer si les résultats sont en cours de soumission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fonction pour gérer la sélection des résultats d'un match
  const handleResultSelect = (matchId: number, result: '1' | 'N' | '2') => {
    setResults((prev) => ({
      ...prev, // Conserve les résultats précédents
      [matchId]: result, // Met à jour le résultat pour le match donné
    }));
  };

  // Fonction pour soumettre les résultats
  const handleSubmit = async () => {
    // Vérifie si tous les résultats ont été saisis
    if (matches.length !== Object.keys(results).length) {
      alert('Veuillez saisir tous les résultats avant de valider');
      return;
    }

    setIsSubmitting(true); // Active l'état de soumission
    try {
      // Met à jour le statut de la grille en "completed"
      await api.grids.updateStatus(grid.id, 'completed');

      // Enregistre les résultats des matchs
      await Promise.all(
        matches.map((match) =>
          api.matches.updateResult(match.id, results[match.id])
        )
      );

      // Déclenche la fonction passée en prop pour signaler que les résultats sont soumis
      onResultsSubmitted();
    } catch (error) {
      console.error('Error submitting results:', error);
      alert('Erreur lors de la soumission des résultats');
    } finally {
      setIsSubmitting(false); // Désactive l'état de soumission
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      {/* En-tête avec titre et bouton de validation */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Saisie des Résultats - {grid.name}
        </h3>
        <Button
          onClick={handleSubmit}
          disabled={
            isSubmitting || matches.length !== Object.keys(results).length
          } // Désactive le bouton si la soumission est en cours ou si tous les résultats ne sont pas saisis
        >
          <Save className="w-4 h-4 mr-2" />
          Valider les Résultats
        </Button>
      </div>

      {/* Liste des matchs */}
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              {/* Détails des équipes */}
              <div className="flex items-center space-x-4">
                <img
                  src={match.team1Logo}
                  alt={match.team1}
                  className="w-8 h-8"
                />
                <span className="text-white">{match.team1}</span>
                <span className="text-gray-400">vs</span>
                <span className="text-white">{match.team2}</span>
                <img
                  src={match.team2Logo}
                  alt={match.team2}
                  className="w-8 h-8"
                />
              </div>
              {/* Boutons pour sélectionner le résultat */}
              <div className="flex space-x-2">
                {(['1', 'N', '2'] as const).map((result) => (
                  <button
                    key={result}
                    onClick={() => handleResultSelect(match.id, result)}
                    className={`w-10 h-10 rounded-lg ${
                      results[match.id] === result
                        ? 'bg-blue-600 text-white' // Si sélectionné
                        : 'bg-gray-600 text-white hover:bg-gray-500' // Sinon
                    }`}
                  >
                    {result}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/*
Points importants des commentaires :
Validation :

Le bouton de validation est désactivé tant que tous les résultats ne sont pas saisis.
Une alerte s'affiche si l'utilisateur tente de soumettre des résultats incomplets.
État local :

results est utilisé pour stocker les résultats des matchs, permettant une mise à jour rapide et individuelle.
isSubmitting est utilisé pour indiquer si la soumission est en cours.
Gestion des résultats des matchs :

Les résultats sont stockés par matchId, ce qui simplifie leur gestion.
Une fonction dédiée (handleResultSelect) met à jour le résultat pour un match donné.
Soumission :

Les résultats sont envoyés en parallèle à l'API pour chaque match.
Le statut de la grille est mis à jour en "completed".
Interface utilisateur :

Chaque match affiche les logos des équipes et des boutons clairs pour sélectionner le résultat.
Un bouton global permet de valider les résultats, avec un retour visuel si désactivé.
*/
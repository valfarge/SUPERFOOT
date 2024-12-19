// Importation des bibliothèques nécessaires et des types
import React, { useState } from 'react';
import { Match, Grid } from '@/types/grid'; // Types pour les grilles et matchs
import { Button } from '@/components/ui/button'; // Composant bouton réutilisable
import { Trophy, Zap, Sparkles, Save } from 'lucide-react'; // Icônes
import { useNavigate } from 'react-router-dom'; // Hook pour la navigation entre les pages

// Définition des propriétés attendues par le composant MainGrid
interface MainGridProps {
  grid: Grid | null; // La grille actuellement sélectionnée
  matches: Match[]; // Liste des matchs associés à la grille
  onPlayRandom: () => void; // Action pour jouer une sélection aléatoire
  onPlayLogic: () => void; // Action pour jouer une sélection logique
  onPlaySurprise: () => void; // Action pour jouer une sélection surprise
}

// Composant fonctionnel principal
export const MainGrid: React.FC<MainGridProps> = ({
  grid,
  matches,
  onPlayRandom,
  onPlayLogic,
  onPlaySurprise,
}) => {
  const navigate = useNavigate(); // Hook pour naviguer entre les pages
  const [selections, setSelections] = useState<Record<number, '1' | 'N' | '2'>>({}); // Sélections utilisateur
  const [isSubmitting, setIsSubmitting] = useState(false); // État pour indiquer si une soumission est en cours

  // Si aucune grille n'est sélectionnée, affiche un message
  if (!grid) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Sélectionnez une grille pour commencer</p>
      </div>
    );
  }

  // Gère la sélection d'un pronostic pour un match
  const handleSelection = (matchId: number, value: '1' | 'N' | '2') => {
    setSelections((prev) => ({
      ...prev,
      [matchId]: value, // Met à jour le pronostic pour le match donné
    }));
  };

  // Gère la soumission de la grille
  const handleSubmit = async () => {
    if (Object.keys(selections).length !== matches.length) {
      // Vérifie si tous les matchs ont un pronostic
      alert('Veuillez sélectionner un pronostic pour tous les matchs');
      return;
    }

    setIsSubmitting(true); // Active l'état de soumission
    try {
      // Envoie les sélections au serveur
      const response = await fetch('http://localhost:3000/api/bets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gridId: grid.id, // ID de la grille
          selections, // Pronostics sélectionnés
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de la soumission');

      // Redirige l'utilisateur vers la page des paris
      navigate('/my-bets');
    } catch (error) {
      console.error('Error submitting bet:', error);
      alert('Erreur lors de la soumission de votre grille');
    } finally {
      setIsSubmitting(false); // Désactive l'état de soumission
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      {/* En-tête avec le nom de la grille et les boutons d'action */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">{grid.name}</h1>
        <div className="flex gap-4 mb-6">
          {/* Boutons pour les stratégies de jeu */}
          <Button onClick={onPlayRandom} className="bg-blue-600 hover:bg-blue-700">
            <Zap className="w-4 h-4 mr-2" />
            Jouer Aléatoire
          </Button>
          <Button onClick={onPlayLogic} className="bg-green-600 hover:bg-green-700">
            <Trophy className="w-4 h-4 mr-2" />
            Jouer Logique
          </Button>
          <Button onClick={onPlaySurprise} className="bg-yellow-600 hover:bg-yellow-700">
            <Sparkles className="w-4 h-4 mr-2" />
            Jouer Surprise
          </Button>
        </div>
      </div>

      {/* Liste des matchs */}
      <div className="space-y-4">
        {matches.map((match, index) => (
          <div key={match.id} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              {/* Affichage des équipes et des logos */}
              <div className="flex items-center space-x-4 flex-1">
                <span className="text-gray-400 w-6">{index + 1}</span>
                <div className="flex items-center space-x-3 flex-1">
                  <img src={match.team1Logo} alt={match.team1} className="w-8 h-8 rounded-full" />
                  <span className="text-white">{match.team1}</span>
                </div>
                {/* Boutons pour sélectionner un pronostic */}
                <div className="flex space-x-2">
                  {(['1', 'N', '2'] as const).map((value) => (
                    <button
                      key={value}
                      onClick={() => handleSelection(match.id, value)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        selections[match.id] === value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-600 text-white hover:bg-gray-500'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-3 flex-1 justify-end">
                  <span className="text-white">{match.team2}</span>
                  <img src={match.team2Logo} alt={match.team2} className="w-8 h-8 rounded-full" />
                </div>
              </div>
            </div>
            {/* Affichage des cotes */}
            <div className="mt-2 flex justify-between text-sm text-gray-400">
              <div>Cote 1: {match.odds1}</div>
              <div>Cote N: {match.oddsN}</div>
              <div>Cote 2: {match.odds2}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton de validation */}
      {matches.length > 0 && (
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || Object.keys(selections).length !== matches.length}
          className="w-full mt-6 bg-green-600 hover:bg-green-700"
        >
          <Save className="w-5 h-5 mr-2" />
          {isSubmitting ? 'Validation...' : 'Valider ma grille'}
        </Button>
      )}
    </div>
  );
};

/*
Résumé des fonctionnalités :
Gestion de la grille :

Affiche le nom et les détails de la grille sélectionnée.
Permet à l'utilisateur de jouer avec des stratégies spécifiques (aléatoire, logique, surprise).
Sélection des pronostics :

Chaque match offre trois choix : 1, N ou 2.
Les choix sont enregistrés dans l'état local selections.
Validation des sélections :

Un bouton permet de soumettre les pronostics.
Vérifie que tous les matchs ont un pronostic avant de soumettre.
Navigation :

Redirige vers une page (/my-bets) après une soumission réussie.
Améliorations possibles :
Gestion des erreurs :

Ajouter des messages d'erreur plus spécifiques pour guider l'utilisateur.
Gérer les erreurs côté serveur de manière plus élégante (par exemple, afficher une notification).
Optimisation des performances :

Utiliser des useCallback pour éviter de recréer les fonctions inutiles.
Mettre en cache les données si nécessaire.
Accessibilité :

Ajouter des attributs aria aux boutons pour améliorer l'expérience des utilisateurs avec des technologies d'assistance.
Modularité :

Extraire les cartes de matchs (<div key={match.id}>) dans un composant séparé pour améliorer la lisibilité.
*/
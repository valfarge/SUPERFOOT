//src/components/admin/results/AdminResultsForm.tsx
import { useState } from 'react';
import { Match, Grid } from '@/types/grid';
import { Button } from '@/components/ui/button';
import { Trophy, AlertCircle } from 'lucide-react';
import { MatchResultInput } from './MatchResultInput';
import { WinnersInput } from './WinnersInput';
import { PrizeDistribution } from './PrizeDistribution';
import { api } from '@/services/api';
import { calculatePrizes } from '@/utils/prizeCalculator';

interface AdminResultsFormProps {
  grid: Grid; // Les détails de la grille sélectionnée
  matches: Match[]; // La liste des matchs de cette grille
  onResultsSubmitted: () => void; // Fonction appelée après soumission des résultats
}

export const AdminResultsForm = ({ grid, matches, onResultsSubmitted }: AdminResultsFormProps) => {
  // État pour stocker les résultats des matchs (matchId -> résultat '1', 'N', ou '2')
  const [results, setResults] = useState<Record<number, '1' | 'N' | '2'>>({});

  // État pour stocker les gagnants par rang (nombre de gagnants et montant du gain)
  const [winners, setWinners] = useState({
    rank15: { count: 0, prize: 0 },
    rank14: { count: 0, prize: 0 },
    rank13: { count: 0, prize: 0 },
    rank12: { count: 0, prize: 0 },
  });

  // État pour le montant total collecté
  const [totalCollected, setTotalCollected] = useState(0);

  // État pour savoir si le formulaire est en train de soumettre les données
  const [isSubmitting, setIsSubmitting] = useState(false);

  // État pour suivre l'étape actuelle ('results', 'winners', 'distribution')
  const [currentStep, setCurrentStep] = useState<'results' | 'winners' | 'distribution'>('results');

  // Met à jour les résultats pour un match donné
  const handleResultSelect = (matchId: number, result: '1' | 'N' | '2') => {
    setResults(prev => ({
      ...prev,
      [matchId]: result, // Ajoute ou met à jour le résultat pour un match spécifique
    }));
  };

  // Passe à l'étape suivante si les résultats sont saisis
  const handleNextStep = () => {
    if (currentStep === 'results' && matches.length === Object.keys(results).length) {
      setCurrentStep('winners');
    } else if (currentStep === 'winners') {
      setCurrentStep('distribution');
    }
  };

  // Reviens à l'étape précédente
  const handlePrevStep = () => {
    if (currentStep === 'distribution') {
      setCurrentStep('winners');
    } else if (currentStep === 'winners') {
      setCurrentStep('results');
    }
  };

  // Soumet les résultats au backend
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Calcul des gains pour les gagnants avec la fonction utilitaire
      const updatedWinners = calculatePrizes(totalCollected, grid.guaranteedSum, winners);

      // Prépare les données pour l'API
      const payload = {
        gridId: grid.id,
        totalCollected: totalCollected || 0,
        guaranteedAmount: grid.guaranteedSum || 0,
        results,
        winners: updatedWinners,
      };

      console.log("Payload envoyé :", payload); // Log pour vérifier les données envoyées

      // Met à jour le statut de la grille en "completed"
      await api.grids.updateStatus(grid.id, "completed");

      // Met à jour les résultats des matchs individuellement
      await Promise.all(
        matches.map((match) => api.matches.updateResult(match.id, results[match.id]))
      );

      // Crée les résultats finaux dans le backend
      await api.results.create(payload);

      // Notifie le composant parent que les résultats sont soumis
      onResultsSubmitted();
    } catch (error) {
      console.error("Erreur lors de la soumission des résultats :", error);
      alert("Erreur lors de la soumission des résultats.");
    } finally {
      setIsSubmitting(false); // Réinitialise l'état de soumission
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Saisie des Résultats - {grid.name}
        </h3>

        {/* Indicateur d'étapes */}
        <div className="flex items-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${currentStep === 'results' ? 'bg-blue-500' : 'bg-gray-500'}`} />
          <div className={`h-2 w-2 rounded-full ${currentStep === 'winners' ? 'bg-blue-500' : 'bg-gray-500'}`} />
          <div className={`h-2 w-2 rounded-full ${currentStep === 'distribution' ? 'bg-blue-500' : 'bg-gray-500'}`} />
        </div>
      </div>

      {/* Étape 1: Saisie des résultats des matchs */}
      {currentStep === 'results' && (
        <div className="space-y-4">
          {matches.map((match) => (
            <MatchResultInput
              key={match.id}
              match={match}
              selectedResult={results[match.id]} // Passe le résultat actuel
              onResultSelect={(result) => handleResultSelect(match.id, result)} // Met à jour le résultat
            />
          ))}

          {/* Avertissement si tous les résultats ne sont pas saisis */}
          {matches.length !== Object.keys(results).length && (
            <div className="flex items-center text-yellow-500 mt-4">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span>Veuillez saisir tous les résultats pour continuer</span>
            </div>
          )}

          <Button
            onClick={handleNextStep}
            disabled={matches.length !== Object.keys(results).length} // Bouton désactivé si incomplet
            className="mt-4"
          >
            Suivant
          </Button>
        </div>
      )}

      {/* Étape 2: Saisie des gagnants par rang */}
      {currentStep === 'winners' && (
        <WinnersInput
          winners={winners} // Données des gagnants
          onChange={setWinners} // Met à jour les gagnants
          onNext={handleNextStep} // Passe à l'étape suivante
          onPrev={handlePrevStep} // Retour à l'étape précédente
        />
      )}

      {/* Étape 3: Distribution des gains */}
      {currentStep === 'distribution' && (
        <PrizeDistribution
          winners={winners} // Données des gagnants
          totalCollected={totalCollected} // Montant total collecté
          guaranteedAmount={grid.guaranteedSum} // Montant garanti
          onTotalCollectedChange={setTotalCollected} // Met à jour le total collecté
          onPrev={handlePrevStep} // Retour à l'étape précédente
          onSubmit={handleSubmit} // Soumission des résultats
          isSubmitting={isSubmitting} // État de soumission
        />
      )}
    </div>
  );
};

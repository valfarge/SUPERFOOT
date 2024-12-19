import { useState } from 'react';
import { Match } from '@/types/grid'; // Interface pour un match
import { Button } from '@/components/ui/button'; // Composant bouton réutilisable
import { Input } from '@/components/ui/input'; // Composant input réutilisable
import { X } from 'lucide-react'; // Icône pour la suppression
import { api } from '@/services/api'; // Service API pour les requêtes backend
import { Toast } from '@/components/ui/toast1'; // Composant pour les notifications (Toast)

interface AdminMatchListProps {
  gridId?: number; // ID de la grille sélectionnée
  matches: Match[]; // Liste des matchs existants
  onMatchesUpdated: () => void; // Callback pour rafraîchir les matchs
}

// Composant AdminMatchList : Gère l'affichage, l'ajout, la modification et la suppression des matchs
export const AdminMatchList = ({ gridId, matches, onMatchesUpdated }: AdminMatchListProps) => {
  // État pour stocker les données du nouveau match
  const [newMatchData, setNewMatchData] = useState({
    team1: '',
    team2: '',
    team1Logo: 'https://via.placeholder.com/50',
    team2Logo: 'https://via.placeholder.com/50',
    odds1: 1.0,
    oddsN: 1.0,
    odds2: 1.0
  });

  // État pour gérer les notifications (Toast)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Affiche une notification toast
  const showToast = (message: string) => {
    setToastMessage(message);
  };

  // Fonction pour ajouter un nouveau match
  const createNewMatch = async () => {
    // Validation basique des champs
    if (!gridId || !newMatchData.team1.trim() || !newMatchData.team2.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      // Appel API pour ajouter le match
      await api.matches.create({
        ...newMatchData,
        gridId
      });

      // Réinitialisation du formulaire après ajout
      setNewMatchData({
        team1: '',
        team2: '',
        team1Logo: 'https://via.placeholder.com/50',
        team2Logo: 'https://via.placeholder.com/50',
        odds1: 1.0,
        oddsN: 1.0,
        odds2: 1.0
      });

      onMatchesUpdated(); // Rafraîchit les matchs via le parent
      showToast('Match ajouté avec succès !'); // Affiche une notification
    } catch (error) {
      console.error('Error creating match:', error);
      showToast('Erreur lors de la création du match.');
    }
  };

  // Fonction pour supprimer un match existant
  const deleteMatch = async (matchId: number) => {
    try {
      await api.matches.delete(matchId); // Appel API pour suppression
      onMatchesUpdated(); // Rafraîchit les matchs via le parent
      showToast('Match supprimé avec succès !'); // Notification de succès
    } catch (error) {
      console.error('Error deleting match:', error);
      showToast('Erreur lors de la suppression du match.');
    }
  };

  // Fonction pour mettre à jour les cotes d'un match
  const updateMatch = async (match: Match) => {
    try {
      await api.matches.update(match.id, {
        odds1: match.odds1,
        oddsN: match.oddsN,
        odds2: match.odds2
      });
      onMatchesUpdated(); // Rafraîchit les matchs
      showToast('Match mis à jour avec succès !'); // Notification
    } catch (error) {
      console.error('Error updating match:', error);
      showToast('Erreur lors de la mise à jour du match.');
    }
  };

  // Fonction pour valider une grille (changer le statut en "draft")
  const handleValidateGrid = async () => {
    if (!gridId) return; // Vérifie si un ID est défini

    try {
      await api.grids.updateStatus(gridId, 'draft'); // Met à jour le statut de la grille
      onMatchesUpdated(); // Rafraîchit les données
      showToast('Grille validée et repassée en brouillon avec succès !'); // Notification
    } catch (error) {
      console.error('Error validating grid:', error);
      showToast('Erreur lors de la validation de la grille.');
    }
  };

  // Affichage si aucune grille n'est sélectionnée
  if (!gridId) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg text-center text-gray-400">
        Sélectionnez une grille pour gérer ses matchs
      </div>
    );
  }

  return (
    <div className="bg-gray-700 p-4 rounded-lg relative">
      {/* Composant Toast pour afficher des notifications */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      <h2 className="text-xl font-semibold mb-4 text-white">Matchs</h2>
      <div className="space-y-4">
        {/* Liste des matchs existants */}
        {matches.map((match) => (
          <div key={match.id} className="bg-gray-600 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              {/* Affichage des équipes */}
              <div className="flex items-center space-x-4 flex-1">
                <img src={match.team1Logo} alt={match.team1} className="w-8 h-8" />
                <span className="text-white">{match.team1}</span>
                <span className="text-gray-400">vs</span>
                <span className="text-white">{match.team2}</span>
                <img src={match.team2Logo} alt={match.team2} className="w-8 h-8" />
              </div>
              {/* Inputs pour modifier les cotes */}
              <div className="flex items-center space-x-4">
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    value={match.odds1}
                    onChange={(e) => updateMatch({ ...match, odds1: parseFloat(e.target.value) })}
                    placeholder="Cote 1"
                    className="w-20 bg-gray-700 text-white"
                  />
                  <Input
                    type="number"
                    step="0.1"
                    value={match.oddsN}
                    onChange={(e) => updateMatch({ ...match, oddsN: parseFloat(e.target.value) })}
                    placeholder="Cote N"
                    className="w-20 bg-gray-700 text-white"
                  />
                  <Input
                    type="number"
                    step="0.1"
                    value={match.odds2}
                    onChange={(e) => updateMatch({ ...match, odds2: parseFloat(e.target.value) })}
                    placeholder="Cote 2"
                    className="w-20 bg-gray-700 text-white"
                  />
                </div>
                {/* Bouton pour supprimer le match */}
                <button
                  onClick={() => deleteMatch(match.id)}
                  className="p-2 rounded-full hover:bg-red-500/10 text-red-500 hover:text-red-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Formulaire pour ajouter un nouveau match */}
        <div className="bg-gray-600 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-white mb-2">Ajouter un Match</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Champs pour les équipes */}
            <div>
              <Input
                placeholder="Équipe 1"
                value={newMatchData.team1}
                onChange={(e) => setNewMatchData({ ...newMatchData, team1: e.target.value })}
                className="bg-gray-700 text-white"
              />
            </div>
            <div>
              <Input
                placeholder="Équipe 2"
                value={newMatchData.team2}
                onChange={(e) => setNewMatchData({ ...newMatchData, team2: e.target.value })}
                className="bg-gray-700 text-white"
              />
            </div>
          </div>
          <Button onClick={createNewMatch} className="w-full">Ajouter Match</Button>
        </div>
      </div>

      {/* Bouton pour valider la grille */}
      <div className="mt-4">
        <Button onClick={handleValidateGrid} className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
          Valider la grille
        </Button>
      </div>
    </div>
  );
};


/*
Résumé des fonctionnalités :
Ajout d’un match avec validation basique.
Modification des cotes existantes pour chaque match.
Suppression d’un match existant.
Validation d’une grille (statut draft).
Notifications Toast pour chaque action réussie ou échouée.
*/
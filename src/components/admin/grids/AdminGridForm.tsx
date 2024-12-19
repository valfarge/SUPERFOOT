import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Bouton réutilisable
import { Input } from '@/components/ui/input'; // Champ d'entrée réutilisable
import { PlusCircle } from 'lucide-react'; // Icône pour le bouton
import { api } from '@/services/api'; // Service API pour interagir avec le backend

// Propriétés reçues par le composant
interface AdminGridFormProps {
  onGridCreated: () => void; // Fonction callback appelée après la création réussie d'une grille
}

// Composant principal pour la création de grilles
export const AdminGridForm = ({ onGridCreated }: AdminGridFormProps) => {
  // État pour indiquer si la requête est en cours
  const [isLoading, setIsLoading] = useState(false);
  // État pour gérer les messages d'erreur
  const [error, setError] = useState('');
  // État pour les données du formulaire
  const [newGridData, setNewGridData] = useState({
    name: '', // Nom de la grille
    guaranteedSum: '', // Montant garanti
    deadline: new Date().toISOString().slice(0, 16), // Date limite par défaut (format datetime-local)
  });

  // Fonction pour valider les champs du formulaire
  const validateForm = () => {
    if (!newGridData.name.trim()) {
      setError('Le nom de la grille est requis');
      return false;
    }
    if (!newGridData.guaranteedSum || Number(newGridData.guaranteedSum) <= 0) {
      setError('Le montant garanti doit être supérieur à 0');
      return false;
    }
    if (!newGridData.deadline) {
      setError('La date limite est requise');
      return false;
    }
    return true; // Retourne vrai si tout est valide
  };

  // Fonction pour créer une nouvelle grille
  const createNewGrid = async () => {
    setError(''); // Réinitialise les erreurs

    if (!validateForm()) {
      return; // Stoppe l'exécution si la validation échoue
    }

    setIsLoading(true); // Active l'indicateur de chargement
    try {
      // Envoi des données à l'API
      await api.grids.create({
        name: newGridData.name,
        guaranteedSum: Number(newGridData.guaranteedSum), // Convertit en nombre
        deadline: new Date(newGridData.deadline), // Convertit en objet Date
        status: 'draft', // Initialise la grille avec le statut "draft"
      });

      // Réinitialise les champs du formulaire après la création
      setNewGridData({
        name: '',
        guaranteedSum: '',
        deadline: new Date().toISOString().slice(0, 16),
      });

      // Appelle la fonction callback pour notifier la création
      onGridCreated();
    } catch (err) {
      // Affiche un message d'erreur en cas de problème
      setError('Erreur lors de la création de la grille');
      console.error('Error creating grid:', err);
    } finally {
      setIsLoading(false); // Désactive l'indicateur de chargement
    }
  };

  return (
    <div className="space-y-4">
      {/* En-tête de la section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Gestion des Grilles</h1>
      </div>

      {/* Formulaire de création de grilles */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="space-y-4">
          {/* Champs d'entrée pour le formulaire */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Champ pour le nom de la grille */}
            <div>
              <Input
                type="text"
                placeholder="Nom de la grille"
                value={newGridData.name}
                onChange={(e) =>
                  setNewGridData({ ...newGridData, name: e.target.value })
                }
                className="bg-gray-700 text-white"
                disabled={isLoading} // Désactive le champ en mode chargement
              />
            </div>

            {/* Champ pour le montant garanti */}
            <div>
              <Input
                type="number"
                placeholder="Montant garanti"
                value={newGridData.guaranteedSum}
                onChange={(e) =>
                  setNewGridData({
                    ...newGridData,
                    guaranteedSum: e.target.value,
                  })
                }
                className="bg-gray-700 text-white"
                disabled={isLoading} // Désactive le champ en mode chargement
              />
            </div>

            {/* Champ pour la date limite */}
            <div>
              <Input
                type="datetime-local"
                value={newGridData.deadline}
                onChange={(e) =>
                  setNewGridData({ ...newGridData, deadline: e.target.value })
                }
                className="bg-gray-700 text-white"
                disabled={isLoading} // Désactive le champ en mode chargement
              />
            </div>
          </div>

          {/* Affichage des erreurs */}
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          {/* Bouton pour créer la nouvelle grille */}
          <Button
            onClick={createNewGrid}
            className="w-full md:w-auto"
            disabled={isLoading} // Désactive le bouton en mode chargement
          >
            <PlusCircle className="w-5 h-5 mr-2" /> {/* Icône */}
            {isLoading ? 'Création...' : 'Nouvelle Grille'} {/* Texte dynamique */}
          </Button>
        </div>
      </div>
    </div>
  );
};

/*
Résumé des commentaires :
Validation des champs : validateForm vérifie si tous les champs requis sont remplis avant d'envoyer les données.
Requête API : La fonction createNewGrid envoie les données à l'API et gère les erreurs.
Indicateur de chargement : L'état isLoading permet d'afficher un spinner et de désactiver les champs pour éviter des actions multiples.
Réinitialisation : Après la création, les champs du formulaire sont réinitialisés à leur valeur initiale.
Composant dynamique : Le texte et l'état du bouton changent en fonction de isLoading.
*/
// Importation des composants et des icônes nécessaires
import { Input } from '@/components/ui/input'; // Champ d'entrée personnalisé
import { Button } from '@/components/ui/button'; // Bouton réutilisable
import { Users } from 'lucide-react'; // Icône d'utilisateur

// Interface pour définir la structure des gagnants par rang
interface Winners {
  rank15: { count: number; prize: number }; // Rang 15 : nombre de gagnants et gain
  rank14: { count: number; prize: number }; // Rang 14 : nombre de gagnants et gain
  rank13: { count: number; prize: number }; // Rang 13 : nombre de gagnants et gain
  rank12: { count: number; prize: number }; // Rang 12 : nombre de gagnants et gain
}

// Interface pour les propriétés du composant
interface WinnersInputProps {
  winners: Winners; // Les données actuelles des gagnants
  onChange: (winners: Winners) => void; // Fonction appelée pour mettre à jour les gagnants
  onNext: () => void; // Fonction appelée pour passer à l'étape suivante
  onPrev: () => void; // Fonction appelée pour revenir à l'étape précédente
}

// Composant principal pour gérer les entrées des gagnants par rang
export const WinnersInput = ({ winners, onChange, onNext, onPrev }: WinnersInputProps) => {
  // Gère la modification du nombre de gagnants pour un rang donné
  const handleCountChange = (rank: keyof Winners, count: number) => {
    onChange({
      ...winners, // Copie les gagnants actuels
      [rank]: { ...winners[rank], count }, // Met à jour uniquement le nombre de gagnants pour le rang spécifié
    });
  };

  return (
    <div className="space-y-6">
      {/* En-tête de la section */}
      <div className="flex items-center text-blue-400 mb-4">
        <Users className="w-5 h-5 mr-2" /> {/* Icône d'utilisateur */}
        <h3 className="text-lg font-medium">Nombre de Gagnants par Rang</h3>
      </div>

      {/* Grille d'entrées pour chaque rang */}
      <div className="grid grid-cols-2 gap-6">
        {(Object.keys(winners) as Array<keyof Winners>).map((rank) => (
          <div key={rank} className="space-y-2">
            {/* Étiquette indiquant le rang (par exemple, 15/15) */}
            <label className="text-sm text-gray-400">
              {rank.replace('rank', '')}
              /15
            </label>
            {/* Champ pour entrer le nombre de gagnants */}
            <Input
              type="number" // Type numérique
              min="0" // Valeur minimale autorisée
              value={winners[rank].count} // Valeur actuelle
              onChange={(e) => handleCountChange(rank, parseInt(e.target.value) || 0)} // Met à jour la valeur
              className="bg-gray-700 text-white"
            />
          </div>
        ))}
      </div>

      {/* Boutons pour naviguer entre les étapes */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrev}> {/* Bouton pour revenir à l'étape précédente */}
          Retour
        </Button>
        <Button onClick={onNext}> {/* Bouton pour passer à l'étape suivante */}
          Suivant
        </Button>
      </div>
    </div>
  );
};

/*

Points clés du composant :
Structure des données :

La structure Winners contient les informations nécessaires sur le nombre de gagnants et leurs gains par rang. Bien que le champ prize ne soit pas modifié ici, il est conservé pour cohérence et futur usage.
Saisie des gagnants :

Le composant affiche une entrée pour chaque rang (rank15, rank14, etc.).
Utilise un champ d'entrée numérique avec une validation minimale (min="0") pour empêcher les valeurs négatives.
Flexibilité :

Le composant fonctionne de manière dynamique avec les rangs fournis via l'objet winners, ce qui facilite l'extension à d'autres rangs si nécessaire.
Navigation :

Deux boutons permettent de naviguer entre les étapes (retour ou suivant).
Ces boutons appellent respectivement les fonctions onPrev et onNext.
Accessibilité :

Les étiquettes (<label>) sont utilisées pour décrire chaque champ d'entrée, ce qui améliore l'accessibilité pour les utilisateurs de lecteurs d'écran.
Suggestions d'amélioration :
Validation :

Ajouter une validation pour garantir que les valeurs saisies sont des nombres valides et non nulles avant de permettre de passer à l'étape suivante.
Gestion des erreurs :

Afficher un message ou un indicateur visuel si un champ est laissé vide ou contient une valeur invalide.
Accessibilité supplémentaire :

Associer explicitement chaque étiquette à son champ d'entrée à l'aide de l'attribut htmlFor.
*/
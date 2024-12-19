// Importation des types nécessaires
import { GridResult } from "@/types/grid";

// Importation du composant pour afficher les résultats
import { ResultsPanel } from "@/components/client/ResultsPanel";

// Définition des props pour le composant ResultsSidebar
interface ResultsSidebarProps {
  result: GridResult | null; // Les données des résultats d'une grille ou null si aucun résultat sélectionné
  onHistoryClick: () => void; // Fonction appelée lorsque l'utilisateur clique sur le bouton "Détails" ou l'historique
}

// Définition du composant ResultsSidebar
export const ResultsSidebar = ({
  result,
  onHistoryClick,
}: ResultsSidebarProps) => {
  return (
    <div className="col-span-3 flex flex-col">
      {/* Conteneur pour la barre latérale des résultats */}
      <div className="flex-1 bg-gray-800 p-4 rounded-lg overflow-auto">
        {/* Affichage du panneau des résultats */}
        <ResultsPanel result={result} onHistoryClick={onHistoryClick} />
      </div>
    </div>
  );
};

/*
Structure principale :

La barre latérale utilise col-span-3 pour occuper 3 colonnes sur une grille CSS dans un conteneur parent.
flex flex-col est utilisé pour une disposition verticale.
Affichage du panneau des résultats :

Le composant ResultsPanel est intégré pour gérer et afficher les détails des résultats :
Si result est null, le composant affiche un message indiquant qu'aucune grille n'est sélectionnée.
Si un résultat est présent, les données correspondantes sont affichées.
Gestion des interactions :

onHistoryClick est une fonction passée en prop pour permettre à l'utilisateur d'accéder à plus de détails (historique ou vue détaillée).
Cette fonction est transmise au ResultsPanel, où elle est déclenchée via un bouton ou une interaction définie.
Style :

bg-gray-800 : Arrière-plan sombre pour s'intégrer au thème général.
p-4 rounded-lg : Espacement interne et coins arrondis pour un design moderne.
overflow-auto : Permet de scroller si le contenu dépasse la hauteur visible.
Responsabilité du composant :

Le composant ResultsSidebar agit comme un conteneur pour afficher un panneau de résultats en mode barre latérale.
Il ne gère pas directement les données, mais délègue l'affichage détaillé au ResultsPanel, ce qui rend le composant léger et réutilisable.
Points d'amélioration potentiels :
Si le design doit changer (par exemple, inclure plus d'options ou d'actions), vous pouvez étendre ce composant ou ajuster le ResultsPanel pour répondre aux nouveaux besoins.
Vous pourriez inclure des loaders ou des placeholders pour améliorer l'expérience utilisateur en cas de chargement de données.
*/
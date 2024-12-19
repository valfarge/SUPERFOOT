import { X, Settings, User } from "lucide-react"; // Utilisation de l'icône X pour la croix
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export const AdminHeader = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Titre principal */}
          <h1 className="text-xl font-bold text-white">Administration</h1>

          {/* Section des actions */}
          <div className="flex items-center space-x-4">
            {/* Bouton paramètres */}
            <Button
              size="icon"
              onClick={logout}
              aria-label="Déconnexion"
              className="bg-red-500 hover:bg-red-600 text-white rounded-full w-50 h-50 flex items-center justify-center"
            >
              <X className="w-6 h-6 text-white" /> {/* Icône bien visible */}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};


/*
Points clés du composant :
En-tête principal :

La classe bg-gray-800 donne un fond sombre.
La classe border-b ajoute une bordure inférieure pour délimiter visuellement l'en-tête.
Gestion des actions :

Les boutons (paramètres, utilisateur, déconnexion) utilisent des variantes de styles ghost et une taille icon pour un design épuré et minimaliste.
Chaque bouton est associé à une icône pertinente, comme Settings, User, et LogOut, pour indiquer visuellement leur fonction.
Déconnexion :

Le bouton de déconnexion appelle la fonction logout via le hook useAuth. Cela permet de centraliser la logique de déconnexion.
Disposition flexible :

La classe flex est utilisée pour aligner les éléments horizontalement et répartir l'espace entre eux (justify-between).
Les icônes sont espacées uniformément avec space-x-4.
*/

//src/pages/admin/AdminUsersPage.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Mail, Phone, Edit2, Trash2 } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+33 6 12 34 56 78",
    status: "active",
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+33 6 98 76 54 32",
    status: "active",
    joinDate: "2024-02-01"
  }
];

export const AdminUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Utilisateurs</h2>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Ajouter un utilisateur
        </Button>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg space-y-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3">Nom</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Téléphone</th>
                <th className="pb-3">Statut</th>
                <th className="pb-3">Date d'inscription</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-700">
                  <td className="py-4 text-white">{user.name}</td>
                  <td className="py-4">
                    <div className="flex items-center text-gray-300">
                      <Mail className="w-4 h-4 mr-2" />
                      {user.email}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center text-gray-300">
                      <Phone className="w-4 h-4 mr-2" />
                      {user.phone}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-300">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit2 className="w-4 h-4 text-blue-400" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
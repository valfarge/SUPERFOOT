import { Grid, Match } from "@/types/grid";

const BASE_URL = "http://localhost:3000/api";

export const api = {
   // Méthode pour supprimer toutes les données
   maintenance: {
    deleteAllData: async () => {
      const res = await fetch(`${BASE_URL}/all`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete all data');
      return true;
    }
  },
  grids: {
    getAll: async (): Promise<Grid[]> => {
      const res = await fetch(`${BASE_URL}/grids`);
      if (!res.ok) throw new Error('Error fetching all grids');
      return res.json();
    },

    getByStatus: async (status: 'draft' | 'active' | 'completed'): Promise<Grid[]> => {
      const res = await fetch(`${BASE_URL}/grids/status/${status}`);
      if (!res.ok) throw new Error(`Failed to fetch ${status} grids`);
      return res.json();
    },

    create: async (gridData: Partial<Grid>): Promise<Grid> => {
      const res = await fetch(`${BASE_URL}/grids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gridData),
      });
      if (!res.ok) throw new Error('Failed to create grid');
      return res.json();
    },

    updateStatus: async (gridId: number, status: 'draft' | 'active' | 'completed'): Promise<Grid> => {
      const res = await fetch(`${BASE_URL}/grids/${gridId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update grid status');
      return res.json();
    },

    // Méthode pour supprimer une grille
    delete: async (gridId: number): Promise<boolean> => {
      const res = await fetch(`${BASE_URL}/grids/${gridId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error deleting grid');
      return true; 
    }, 
   
  },

  matches: {
    getByGridId: async (gridId: number): Promise<Match[]> => {
      const res = await fetch(`${BASE_URL}/matches/grid/${gridId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error('Failed to fetch matches');
      return res.json();
    },

    create: async (matchData: Partial<Match>): Promise<Match> => {
      const res = await fetch(`${BASE_URL}/matches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchData),
      });
      if (!res.ok) throw new Error('Failed to create match');
      return res.json();
    },

    update: async (matchId: number, matchData: Partial<Match>): Promise<Match> => {
      const res = await fetch(`${BASE_URL}/matches/${matchId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchData)
      });
      if (!res.ok) throw new Error('Failed to update match');
      return res.json();
    },

    delete: async (matchId: number): Promise<boolean> => {
      const res = await fetch(`${BASE_URL}/matches/${matchId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error('Failed to delete match');
      return true;
    },

    updateResult: async (matchId: number, result: '1' | 'N' | '2'): Promise<Match> => {
      const res = await fetch(`${BASE_URL}/matches/${matchId}/result`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ result })
      });
      if (!res.ok) throw new Error('Failed to update match result');
      return res.json();
    }
  },

  results: {
    create: async (data: {
      gridId: number;
      results: Record<number, '1' | 'N' | '2'>;
      winners: {
        rank15: { count: number; prize: number };
        rank14: { count: number; prize: number };
        rank13: { count: number; prize: number };
        rank12: { count: number; prize: number };
      };
      totalCollected: number;
    }) => {
      const res = await fetch(`${BASE_URL}/results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create results');
      return res.json();
    },

    getByGridId: async (gridId: number) => {
      const res = await fetch(`${BASE_URL}/results/grid/${gridId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error('Failed to fetch results');
      return res.json();
    },
  },
};

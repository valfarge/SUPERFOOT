//src/types/grid.ts
export interface Grid {
  id: number;
  name: string;
  guaranteedSum: number;
  deadline: string;
  status: 'draft' | 'active' | 'completed';
  totalPot?: number;
  winners?: number;
}

export interface GridResult {
  gridId: number;
  totalCollected: number;
  rank1Amount: number;
  guaranteedAmount: number;
  winningCombination: ('1' | 'N' | '2')[];
  winners: {
    rank15: { count: number; prize: number };
    rank14: { count: number; prize: number };
    rank13: { count: number; prize: number };
    rank12: { count: number; prize: number };
  };
}
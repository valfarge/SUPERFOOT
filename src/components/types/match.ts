export interface Match {
  id: number;
  team1: string;
  team2: string;
  team1Logo: string;
  team2Logo: string;
  odds1: number;
  oddsN: number;
  odds2: number;
  result?: '1' | 'N' | '2';
  gridId: number;
}

export interface Grid {
  id: number;
  name: string;
  guaranteedSum: number;
  deadline: string;
  status: 'upcoming' | 'active' | 'completed';
  totalPot?: number;
  winners?: number;
}

export interface GridResult {
  gridId: number;
  totalCollected: number;
  rank1Amount: number;
  guaranteedAmount: number;
  winningCombination: ('1' | 'N' | '2')[];
}
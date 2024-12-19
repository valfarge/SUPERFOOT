//src/types/match.ts
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
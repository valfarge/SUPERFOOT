export const calculatePrizes = (
    totalCollected: number,
    guaranteedAmount: number,
    winners: Record<string, { count: number; prize: number }>
  ) => {
    const totalToDistribute = Math.max(totalCollected, guaranteedAmount);
    const distribution = { rank15: 0.4, rank14: 0.3, rank13: 0.2, rank12: 0.1 };
  
    return Object.entries(winners).reduce((acc, [rank, { count }]) => {
      const rankShare = totalToDistribute * distribution[rank as keyof typeof distribution];
      acc[rank as keyof typeof winners] = {
        count,
        prize: count > 0 ? Math.floor(rankShare / count) : 0,
      };
      return acc;
    }, {} as typeof winners);
  };
  
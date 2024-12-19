// src/pages/HomePage.tsx
import { useState, useEffect } from "react";
import { Grid, Match, GridResult } from "@/types/grid";
import { GridList } from "@/components/admin/grids/GridList";
import { MainGrid } from "@/components/admin/grids/MainGrid";
import { ResultsPanel } from "@/components/client/ResultsPanel";
import { ResultsSummary } from "@/components/admin/results/ResultsSummary";
import { GridHistoryModal } from "@/components/history/GridHistoryModal";

export const HomePage = () => {
  const [grids, setGrids] = useState<Grid[]>([]);
  const [selectedGrid, setSelectedGrid] = useState<Grid | null>(null);
  const [selectedCompletedGrid, setSelectedCompletedGrid] = useState<Grid | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [results, setResults] = useState<GridResult | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Fonction pour récupérer toutes les grilles
  const fetchGrids = async () => {
    try {
      console.log("Fetching grids...");
      const response = await fetch("http://localhost:3000/api/grids");
      if (!response.ok) throw new Error("Failed to fetch grids");
      const data = await response.json();
      console.log("Fetched grids:", data);
      setGrids(data);

      // Met à jour les grilles sélectionnées si elles ont changé de statut
      if (selectedGrid) {
        const updatedGrid = data.find((g) => g.id === selectedGrid.id);
        if (updatedGrid?.status === "completed") {
          handleGridSelection(updatedGrid);
        }
      }

      if (selectedCompletedGrid) {
        const updatedGrid = data.find((g) => g.id === selectedCompletedGrid.id);
        if (updatedGrid) {
          handleGridSelection(updatedGrid);
        }
      }
    } catch (error) {
      console.error("Error fetching grids:", error);
    }
  };

  // Récupération initiale des grilles
  useEffect(() => {
    fetchGrids();
  }, []);

  // Mise à jour périodique des grilles
  useEffect(() => {
    const interval = setInterval(fetchGrids, 30000);
    return () => clearInterval(interval);
  }, []);

  // Gestion de la sélection des grilles
  const handleGridSelection = async (grid: Grid) => {
    if (grid.status === "completed") {
      setSelectedCompletedGrid(grid);
      setSelectedGrid(null);
      try {
        console.log(`Fetching matches and results for completed grid #${grid.id}`);
        const [matchesRes, resultsRes] = await Promise.all([
          fetch(`http://localhost:3000/api/matches/grid/${grid.id}`),
          fetch(`http://localhost:3000/api/results/grid/${grid.id}`),
        ]);

        const matchesData = matchesRes.ok ? await matchesRes.json() : [];
        const resultsData = resultsRes.ok ? await resultsRes.json() : null;

        console.log("Fetched matches:", matchesData);
        console.log("Fetched results:", resultsData);

        setMatches(matchesData);
        setResults(resultsData);
      } catch (error) {
        console.error("Error fetching completed grid data:", error);
        setMatches([]);
        setResults(null);
      }
    } else {
      setSelectedGrid(grid);
      setSelectedCompletedGrid(null);
      setResults(null);
      try {
        console.log(`Fetching matches for active grid #${grid.id}`);
        const response = await fetch(
          `http://localhost:3000/api/matches/grid/${grid.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch matches");
        const data = await response.json();
        console.log("Fetched matches:", data);
        setMatches(data);
      } catch (error) {
        console.error("Error fetching grid matches:", error);
        setMatches([]);
      }
    }
  };

  // Fonction pour soumettre une grille avec des sélections aléatoires
  const submitBet = async (selections: Record<number, "1" | "N" | "2">) => {
    if (!selectedGrid) return;

    try {
      const response = await fetch("http://localhost:3000/api/bets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gridId: selectedGrid.id,
          selections,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit bet");
      alert("Votre grille a été validée avec succès !");
    } catch (error) {
      console.error("Error submitting bet:", error);
      alert("Erreur lors de la validation de votre grille");
    }
  };

  const handlePlayRandom = () => {
    if (!selectedGrid) return;
    const randomSelections = matches.reduce((acc, match) => {
      const options = ["1", "N", "2"] as const;
      acc[match.id] = options[Math.floor(Math.random() * 3)];
      return acc;
    }, {} as Record<number, "1" | "N" | "2">);
    submitBet(randomSelections);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid h-full grid-cols-12 gap-6">
            {/* Colonne gauche */}
            <div className="col-span-12 lg:col-span-3 flex flex-col space-y-6 overflow-auto">
              <GridList
                grids={grids}
                onSelectGrid={handleGridSelection}
                selectedGridId={selectedGrid?.id || selectedCompletedGrid?.id}
                showCompletedGrids={false}
              />
              <GridList
                grids={grids}
                onSelectGrid={handleGridSelection}
                selectedGridId={selectedGrid?.id || selectedCompletedGrid?.id}
                showCompletedGrids={true}
              />
            </div>

            {/* Colonne centrale */}
            <div className="col-span-12 lg:col-span-6 flex flex-col min-h-0">
              <div className="flex-1 bg-gray-800 p-6 rounded-lg overflow-auto">
                {selectedGrid ? (
                  <MainGrid
                    grid={selectedGrid}
                    matches={matches}
                    onPlayRandom={handlePlayRandom}
                    onPlayLogic={handlePlayRandom}
                    onPlaySurprise={handlePlayRandom}
                  />
                ) : selectedCompletedGrid && results ? (
                  <ResultsSummary grid={selectedCompletedGrid} results={results} />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    Sélectionnez une grille pour commencer
                  </div>
                )}
              </div>
            </div>

            {/* Colonne droite */}
            <div className="col-span-12 lg:col-span-3 flex flex-col min-h-0">
              <div className="flex-1 bg-gray-800 p-4 rounded-lg overflow-auto">
                <ResultsPanel
                  result={results}
                  onHistoryClick={() => setIsHistoryModalOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'historique */}
      <GridHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        grid={selectedCompletedGrid}
        matches={matches}
        result={results}
      />
    </div>
  );
};

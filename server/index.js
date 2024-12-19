
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174']
}));

// Data store (simulation base de données)
let grids = [];

let matches = [];

let results = [];

// Routes
app.get('/api/grids', (req, res) => {
  res.json(grids);
});

app.get('/api/grids/status/:status', (req, res) => {
  const { status } = req.params;
  const filteredGrids = grids.filter(grid => grid.status === status);
  res.json(filteredGrids);
});

app.post('/api/grids', (req, res) => {
  const newGrid = {
    id: grids.length + 1,
    ...req.body
  };
  grids.push(newGrid);
  res.status(201).json(newGrid);
});

// Mise à jour d'un match
app.put('/api/matches/:id', (req, res) => {
  const { id } = req.params;
  const matchIndex = matches.findIndex((m) => m.id === parseInt(id));
  if (matchIndex === -1) return res.status(404).json({ error: 'Match not found' });

  const updatedMatch = { ...matches[matchIndex], ...req.body };
  matches[matchIndex] = updatedMatch;
  res.json(updatedMatch);
});

// Suppression d'un match
app.delete('/api/matches/:id', (req, res) => {
  const { id } = req.params;
  const matchIndex = matches.findIndex((m) => m.id === parseInt(id));
  if (matchIndex === -1) return res.status(404).json({ error: 'Match not found' });

  const deletedMatch = matches.splice(matchIndex, 1)[0];
  res.json(deletedMatch);
});
//suppression d'une grille
app.delete('/api/grids/:id', (req, res) => {
  const { id } = req.params;
  const gridIndex = grids.findIndex((g) => g.id === parseInt(id));
  if (gridIndex === -1) {
    return res.status(404).json({ error: 'Grid not found' });
  }

  const deletedGrid = grids.splice(gridIndex, 1)[0];
  res.json(deletedGrid);
});

//suppression de tous les éléments grille
app.delete('/api/all', (req, res) => {
  grids = [];
  matches = [];
  results = [];
  res.json({ message: 'All data cleared' });
});


app.put('/api/grids/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const grid = grids.find(g => g.id === parseInt(id));
  if (!grid) {
    return res.status(404).json({ error: 'Grid not found' });
  }
  grid.status = status;
  res.json(grid);
});

app.get('/api/matches/grid/:gridId', (req, res) => {
  const { gridId } = req.params;
  const gridMatches = matches.filter(m => m.gridId === parseInt(gridId));
  res.json(gridMatches);
});

app.post('/api/matches', (req, res) => {
  const newMatch = {
    id: matches.length + 1,
    ...req.body
  };
  matches.push(newMatch);
  res.status(201).json(newMatch);
});

app.put('/api/matches/:id/result', (req, res) => {
  const { id } = req.params;
  const { result } = req.body;
  const match = matches.find(m => m.id === parseInt(id));
  if (!match) {
    return res.status(404).json({ error: 'Match not found' });
  }
  match.result = result;
  res.json(match);
});

app.get('/api/results/grid/:gridId', (req, res) => {
  const { gridId } = req.params;
  const result = results.find(r => r.gridId === parseInt(gridId));

  if (!result) {
    return res.status(404).json({ error: 'Results not found' });
  }

  // Assurez-vous que les champs sont toujours définis
  const safeResult = {
    gridId: result.gridId,
    totalCollected: result.totalCollected || 0,
    rank1Amount: result.rank1Amount || 0,
    guaranteedAmount: result.guaranteedAmount || 0,
    winningCombination: result.winningCombination || [],
    winners: {
      rank15: { count: result.winners?.rank15?.count || 0, prize: result.winners?.rank15?.prize || 0 },
      rank14: { count: result.winners?.rank14?.count || 0, prize: result.winners?.rank14?.prize || 0 },
      rank13: { count: result.winners?.rank13?.count || 0, prize: result.winners?.rank13?.prize || 0 },
      rank12: { count: result.winners?.rank12?.count || 0, prize: result.winners?.rank12?.prize || 0 },
    },
  };

  res.json(safeResult);
});


app.post('/api/results', (req, res) => {
  const newResult = {
    gridId: req.body.gridId,
    totalCollected: req.body.totalCollected || 0,
    rank1Amount: req.body.winners.rank15.prize || 0,
    guaranteedAmount: req.body.guaranteedAmount || 0,
    winningCombination: req.body.results
      ? Object.values(req.body.results)
      : [],
    winners: req.body.winners || {
      rank15: { count: 0, prize: 0 },
      rank14: { count: 0, prize: 0 },
      rank13: { count: 0, prize: 0 },
      rank12: { count: 0, prize: 0 },
    },
  };

  console.log('New Result Added:', newResult); // DEBUG LOG
  results.push(newResult);
  res.status(201).json(newResult);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

// Mock DB for users/sessions
const users: any[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/simulate", (req, res) => {
    const { profile, funds, challenges, risk, liquidity } = req.body;
    
    // Simulate some logic
    const fundsNum = parseFloat(funds) || 100000;
    
    // Logic formulation
    const riskMultiplier = risk === 'High' ? 1.4 : risk === 'Medium' ? 1.15 : 1.05;
    const baseOptYield = 0.04; // 4% base
    
    const optimizedYieldRate = +(baseOptYield * riskMultiplier).toFixed(4);
    const estimatedGains = Math.round(fundsNum * optimizedYieldRate);
    const estimatedSavings = Math.round(fundsNum * 0.015); // Saved from efficiencies

    const report = {
      id: "REP" + Math.floor(Math.random() * 10000),
      createdAt: new Date().toISOString(),
      profile,
      funds: fundsNum,
      risk,
      optimizedYieldRate,
      estimatedGains,
      estimatedSavings,
      challenges
    };

    // Store in internal memory
    users.push({
      id: "USR" + Math.floor(Math.random() * 10000),
      joinedAt: new Date().toISOString(),
      profile,
      reportId: report.id,
      status: 'demo_completed'
    });

    res.json(report);
  });

  app.get("/api/admin/users", (req, res) => {
    res.json({ users });
  });

  const isProduction = process.env.NODE_ENV === "production" || __dirname.includes('dist') || process.argv[1].includes('dist');
  
  // Vite middleware for development
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

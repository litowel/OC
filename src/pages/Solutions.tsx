import { ArrowRight, BarChart2, ShieldCheck, Zap, Activity, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export default function Solutions() {
  const solutions = [
    {
      title: 'Debt Optimization',
      icon: <Activity className="text-rose-500" size={28} />,
      color: 'bg-rose-50 border-rose-200 text-rose-900',
      bullets: [
        'Reduce your loan costs instantly',
        'Stop overpaying interest',
        'Upgrade your financial structure',
        'Lower your expenses without new capital',
        'Smarter borrowing starts here',
      ],
    },
    {
      title: 'Treasury Rebalancing',
      icon: <RefreshCw className="text-blue-500" size={28} />,
      color: 'bg-blue-50 border-blue-200 text-blue-900',
      bullets: [
        'Make every dollar work smarter',
        'Optimize how your money is used',
        'Better allocation, better results',
        'Stop wasting idle funds',
        'Financial efficiency made simple',
      ],
    },
    {
      title: 'Arbitrage',
      icon: <Zap className="text-amber-500" size={28} />,
      color: 'bg-amber-50 border-amber-200 text-amber-900',
      bullets: [
        'Unlock hidden profit opportunities',
        'Earn from market inefficiencies',
        'Extra income without extra work',
        'Smart systems find what you miss',
        'Turn small gaps into real gains',
      ],
    },
    {
      title: 'Yield Optimization',
      icon: <BarChart2 className="text-emerald-500" size={28} />,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      bullets: [
        'Turn idle funds into income',
        'Let your money work daily',
        'Simple way to earn more',
        'Boost your returns automatically',
        'Your funds deserve better',
      ],
    },
    {
      title: 'Liquidation Opportunities',
      icon: <ShieldCheck className="text-indigo-500" size={28} />,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-900',
      bullets: [
        'Access discounted financial opportunities',
        'Profit from market inefficiencies',
        'Smart acquisition strategy',
        'Turn risk into opportunity',
        'Advanced financial advantage',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="px-6 lg:px-14 h-20 flex items-center border-b border-slate-200 bg-white sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 tracking-tight">
          <div className="w-8 h-8 rounded bg-primary-600 flex items-center justify-center text-white">
            <BarChart2 size={20} />
          </div>
          OptiCore Finance
        </Link>
        <nav className="ml-auto flex items-center gap-6">
          <Link to="/solutions" className="text-sm font-medium text-slate-900">Solutions</Link>
          <Link to="/admin" className="text-sm font-medium text-slate-600 hover:text-slate-900">Admin</Link>
          <Link to="/questionnaire">
            <Button>Try Live Demo</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 px-4 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Comprehensive Financial <span className="text-primary-600">Solutions</span>
            </h1>
            <p className="text-lg text-slate-500">
              Discover how our advanced intelligence platform drives value across your entire financial structure through automation and optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, i) => (
              <div key={i} className={`rounded-2xl border bg-white shadow-sm overflow-hidden flex flex-col`}>
                <div className={`p-6 border-b ${solution.color}`}>
                  <div className="w-14 h-14 rounded-xl bg-white/60 flex items-center justify-center mb-4 shadow-sm backdrop-blur-sm">
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{solution.title}</h3>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <ul className="space-y-4 mb-8 flex-1">
                    {solution.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                        <span className="text-slate-600">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/questionnaire">
                    <Button variant="outline" className="w-full justify-between group">
                      Explore this solution <ArrowRight size={16} className="text-slate-400 group-hover:text-primary-600 transition-colors" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

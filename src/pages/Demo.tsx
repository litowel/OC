import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronRight, ChevronLeft, Download, Shield, Zap, TrendingUp, AlertCircle, PhoneCall, BarChart2, ShieldCheck, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Demo() {
  const { state } = useLocation();
  const report = state?.report;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [liveApy, setLiveApy] = useState(4.21);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    // Simulate real-time price feed fluctuating slightly
    const interval = setInterval(() => {
      setLiveApy(prev => {
        const jitter = (Math.random() - 0.5) * 0.05;
        return Math.max(4.10, Math.min(4.35, prev + jitter));
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-500 mb-4">No report data found. Please complete the setup.</p>
          <Link to="/questionnaire">
            <Button>Go to Setup</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100">
          <p className="font-semibold text-slate-900 mb-1">{label} Strategy</p>
          <p className="text-slate-600 text-sm">
            Simulated Outcome: <span className="font-semibold text-primary-600 text-base ml-1">{formatCurrency(payload[0].value)}</span>
          </p>
          <div className="mt-2 text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">
            Based on {formatCurrency(report.funds)} capital
          </div>
        </div>
      );
    }
    return null;
  };

  const chartData = [
    { name: 'Current', yield: report.funds * 0.005 }, // assuming 0.5% current yield
    { name: 'Optimized', yield: report.estimatedGains }
  ];

  const slides = [
    {
      id: 'overview',
      title: 'Yield Optimization Analysis',
      icon: <TrendingUp className="text-primary-600" size={28} />,
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 relative overflow-hidden">
              <div className="text-sm font-medium text-slate-500 mb-1">Baseline Capital</div>
              <div className="text-3xl font-bold text-slate-900">{formatCurrency(report.funds)}</div>
              
              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 w-full py-1.5 px-2 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                <span>Real-time Price Feed: {liveApy.toFixed(2)}% APY</span>
              </div>
            </div>
            <div className="bg-success-500/10 p-6 rounded-xl border border-success-500/20">
              <div className="text-sm font-medium text-success-700 mb-1">Projected Annual Gains</div>
              <div className="text-3xl font-bold text-success-600">+{formatCurrency(report.estimatedGains)}</div>
            </div>
          </div>
          
          <div className="h-64 mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 13 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 13 }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9' }} />
                <Bar dataKey="yield" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    },
    {
      id: 'debt',
      title: 'Debt Refinancing & Treasury Rebalancing',
      icon: <Zap className="text-amber-500" size={28} />,
      content: (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 text-slate-100"><Zap size={120} className="opacity-50 blur-xl" /></div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Automated Cost Reduction</h3>
              <p className="text-slate-600 leading-relaxed max-w-xl">
                By automatically routing your capital across lower-cost financing facilities and rebalancing your treasury daily, we estimate substantial savings.
              </p>
              <div className="text-4xl font-bold text-slate-900 mt-6 mb-2">
                {formatCurrency(report.estimatedSavings)}
              </div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Est. Annual Servicing Savings</div>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
              <Shield size={18} className="text-primary-600" /> Strategies Deployed
            </h4>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li className="flex items-start gap-2"><span className="text-primary-600 font-bold">â€¢</span> Continuous rate environment evaluation (Real-time Market Data Integration)</li>
              <li className="flex items-start gap-2"><span className="text-primary-600 font-bold">â€¢</span> Automated collateral switching (Institutional Liquidity Abstraction)</li>
              <li className="flex items-start gap-2"><span className="text-primary-600 font-bold">â€¢</span> Instant execution for zero-duration debt clearing</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'action',
      title: 'Ready to Activate?',
      icon: <Shield className="text-emerald-500" size={28} />,
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-2">
            <PhoneCall size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Your custom strategy is prepared.</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            You are viewing a simulated strategy for {report.profile || 'your company'}. To deploy this capital structure with our institutional gateways (via Paystack/Payaza), contact our engineering team.
          </p>
          <div className="pt-6 w-full max-w-sm">
            {!showFeedback ? (
              <Button size="lg" className="w-full text-lg shadow-xl shadow-primary-600/20" onClick={() => setShowFeedback(true)}>
                Activate Real Optimization
              </Button>
            ) : feedbackSubmitted ? (
               <div className="text-emerald-700 bg-emerald-50 px-4 py-3 rounded-lg border border-emerald-200 flex items-center justify-center gap-2 text-sm font-medium animate-in fade-in zoom-in duration-300">
                 <ShieldCheck size={18} /> Thank you! Our onboarding team has been notified.
               </div>
            ) : (
               <div className="bg-white p-5 border border-slate-200 shadow-sm rounded-xl w-full text-left space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h4 className="font-semibold text-slate-900 text-sm">How was your demo experience?</h4>
                  <div className="grid grid-cols-3 gap-2">
                     <Button variant="outline" size="sm" onClick={()=>setFeedbackSubmitted(true)} className="text-xs">Needs Work</Button>
                     <Button variant="outline" size="sm" onClick={()=>setFeedbackSubmitted(true)} className="text-xs">Good</Button>
                     <Button size="sm" onClick={()=>setFeedbackSubmitted(true)} className="text-xs bg-primary-600 text-white">Excellent!</Button>
                  </div>
               </div>
            )}
          </div>
        </div>
      )
    }
  ];

  const current = slides[currentSlide];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col">
      <header className="px-6 h-16 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-lg text-white">
          <div className="w-6 h-6 rounded bg-primary-600 flex items-center justify-center">
             <BarChart2 size={14} />
          </div>
          OptiCore Simulation
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
            <AlertCircle size={14} />
            Simulated live demo for illustration purposes only
          </div>
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">Exit</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl bg-white text-slate-900 rounded-2xl overflow-hidden flex flex-col min-h-[600px] shadow-2xl">
          {/* Header */}
          <div className="border-b border-slate-100 p-8 flex items-center gap-4 bg-slate-50/50">
            <div className="p-3 bg-slate-100 rounded-xl">
              {current.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{current.title}</h2>
              <p className="text-slate-500 text-sm mt-1">Prepared for {report.profile || 'Client'} â€¢ {report.risk} Risk Profile</p>
            </div>
            <div className="ml-auto">
              <Button variant="outline" size="sm" className="gap-2">
                <Download size={14} /> Export PDF
              </Button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 p-8 sm:p-10 flex flex-col">
            <div className="flex-1 max-w-3xl">
              {current.content}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="border-t border-slate-100 p-6 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-primary-600' : 'w-2 bg-slate-300'}`} 
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
              >
                <ChevronLeft size={18} /> Previous
              </Button>
              <Button 
                onClick={() => setCurrentSlide(s => Math.min(slides.length - 1, s + 1))}
                disabled={currentSlide === slides.length - 1}
              >
                Next <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

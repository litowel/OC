import { ArrowRight, BarChart2, ShieldCheck, Zap, TrendingUp, Globe, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { motion } from 'motion/react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans selection:bg-primary-500/30">
      {/* Navigation */}
      <header className="px-6 lg:px-14 h-20 flex items-center border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
            <BarChart2 size={18} strokeWidth={2.5} />
          </div>
          OptiCore
        </Link>
        <nav className="ml-auto flex items-center gap-8">
          <Link to="/solutions" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Solutions</Link>
          <Link to="/admin" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Admin</Link>
          <Link to="/questionnaire">
            <Button className="bg-white text-slate-900 hover:bg-slate-100 shadow-xl shadow-white/5 border-0">
              Try Live Demo
            </Button>
          </Link>
        </nav>
      </header>
      
      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-600/20 blur-[120px] rounded-[100%] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium"
              >
                <Activity size={14} className="animate-pulse" />
                V2.0 Optimization Engine Live
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
              >
                Intelligent Capital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400">
                  Optimization.
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Automate yield generation, optimize debt restructuring, and maximize liquidity without operational overhead. Institutional-grade financial engineering for modern treasuries.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start"
              >
                <Link to="/questionnaire">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/25 border-0 h-14 px-8 text-base">
                    Generate Live Demo <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/solutions">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                    Explore Solutions
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Hero Visual Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex-1 w-full max-w-lg relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-emerald-500/10 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-1">
                    <div className="text-slate-400 text-sm font-medium">Active Treasury Yield</div>
                    <div className="text-3xl font-bold text-white tracking-tight">$2,405,110.50</div>
                  </div>
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <TrendingUp size={24} />
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { label: 'Aave Supply Market', value: '+4.2% APY', active: true },
                    { label: 'Debt Refinancing (Auto)', value: '-1.5% APR', active: true },
                    { label: 'Idle Capital Allocation', value: '+5.1% APY', active: true },
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      transition={{ duration: 1, delay: 0.6 + (i * 0.2) }}
                      className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                        <span className="text-sm font-medium text-slate-300">{item.label}</span>
                      </div>
                      <span className="text-sm font-bold text-emerald-400">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-white/5 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap justify-between items-center gap-8 text-center sm:text-left">
            <div>
              <div className="text-3xl font-bold text-white tracking-tight">$4.2B+</div>
              <div className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider">Capital Optimized</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-slate-800" />
            <div>
              <div className="text-3xl font-bold text-white tracking-tight">1.5%</div>
              <div className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider">Avg. Yield Increase</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-slate-800" />
            <div>
              <div className="text-3xl font-bold text-white tracking-tight">Zero</div>
              <div className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider">Duration Risk</div>
            </div>
            <div className="hidden lg:block w-px h-12 bg-slate-800" />
            <div>
              <div className="text-3xl font-bold text-white tracking-tight">100%</div>
              <div className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-wider">Institutional Grade</div>
            </div>
          </div>
        </section>

        {/* Features / Value Props */}
        <section className="py-24 bg-white text-slate-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">Precision tools for modern finance.</h2>
              <p className="text-lg text-slate-500">We bridge the gap between traditional banking and institutional-grade DeFi to bring absolute efficiency to your capital.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group rounded-3xl bg-slate-50 border border-slate-200 p-8 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap size={28} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold mb-3">Yield Optimization</h3>
                <p className="text-slate-600 leading-relaxed mb-6">Automatically rebalance idle capital across low-risk institutional vehicles to maximize your baseline yield.</p>
                <Link to="/solutions" className="inline-flex items-center font-semibold text-primary-600 hover:text-primary-700">
                  See how <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              
              <div className="group rounded-3xl bg-slate-50 border border-slate-200 p-8 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Activity size={28} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold mb-3">Debt Refinancing</h3>
                <p className="text-slate-600 leading-relaxed mb-6">Continuously evaluate rate environments to automatically suggest and execute favorable refinancing options.</p>
                <Link to="/solutions" className="inline-flex items-center font-semibold text-rose-600 hover:text-rose-700">
                  See how <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="group rounded-3xl bg-slate-50 border border-slate-200 p-8 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <div className="w-14 h-14 bg-slate-200 text-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck size={28} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold mb-3">Bank-Grade Security</h3>
                <p className="text-slate-600 leading-relaxed mb-6">Rigorous institutional compliance and asset segregation guarantees complete safety of principal capital.</p>
                <Link to="/solutions" className="inline-flex items-center font-semibold text-slate-800 hover:text-slate-900">
                  See how <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer CTA */}
        <footer className="py-20 bg-slate-950 border-t border-white/5 text-center px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Stop wasting idle funds.</h2>
            <p className="text-slate-400 mb-8 text-lg">See exactly how much revenue you're leaving on the table in under 2 minutes.</p>
            <Link to="/questionnaire">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 h-14 text-base">
                Try Live Demo
              </Button>
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

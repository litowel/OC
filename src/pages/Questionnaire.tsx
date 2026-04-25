import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

export default function Questionnaire() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    profile: '',
    funds: '',
    challenges: '',
    risk: 'Medium',
    liquidity: 'Monthly'
  });

  const updateForm = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // Redirect to demo with data
      navigate('/demo', { state: { report: data } });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="h-2 w-full bg-slate-200 rounded-full mb-8 overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-primary-600 transition-all duration-300 ease-in-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Let's build your profile</h2>
          <p className="text-slate-500">Provide some basic parameters to generate your live simulation.</p>
        </div>

        <Card className="shadow-lg border-0 ring-1 ring-slate-200">
          <CardHeader>
            <CardTitle>{step === 1 ? 'Business Profile' : step === 2 ? 'Treasury Parameters' : 'Risk & Objectives'}</CardTitle>
            <CardDescription>
              {step === 1 ? 'Tell us about your organization.' : step === 2 ? 'What is the scale of capital to optimize?' : 'How should we tailor the strategy?'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input 
                    id="company" 
                    placeholder="e.g. Acme Corporation" 
                    value={formData.profile}
                    onChange={(e) => updateForm('profile', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="challenge">Primary Financial Challenge</Label>
                  <select 
                    id="challenge"
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
                    value={formData.challenges}
                    onChange={(e) => updateForm('challenges', e.target.value)}
                  >
                    <option value="" disabled>Select challenge...</option>
                    <option value="Yield Optimization">Yield Optimization</option>
                    <option value="Debt Optimization">Debt Optimization</option>
                    <option value="Treasury Rebalancing">Treasury Rebalancing</option>
                    <option value="Arbitrage">Arbitrage</option>
                    <option value="Liquidation Opportunities">Liquidation Opportunities</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="funds">Available Capital ($)</Label>
                  <Input 
                    id="funds" 
                    type="number" 
                    placeholder="e.g. 500000" 
                    value={formData.funds}
                    onChange={(e) => updateForm('funds', e.target.value)}
                  />
                  <p className="text-xs text-slate-500 pt-1">Used to calculate potential yield metrics.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liquidity">Liquidity Needs</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Daily', 'Weekly', 'Monthly'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => updateForm('liquidity', opt)}
                        className={`py-2 px-3 text-sm font-medium border rounded-md transition-colors ${formData.liquidity === opt ? 'bg-primary-50 border-primary-600 text-primary-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Preferred Risk Tier</Label>
                  <div className="space-y-3">
                    {[
                      { level: 'Low', desc: 'Principal protection prioritized. Modest yields.' },
                      { level: 'Medium', desc: 'Balanced approach. Diversified strategies.' },
                      { level: 'High', desc: 'Yield maximized. Tolerance for volatility.' }
                    ].map(opt => (
                      <div 
                        key={opt.level}
                        onClick={() => updateForm('risk', opt.level)}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors flex items-start gap-4 ${formData.risk === opt.level ? 'bg-primary-50 border-primary-600 ring-1 ring-primary-600' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                      >
                        <div className={`mt-0.5 w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${formData.risk === opt.level ? 'border-primary-600' : 'border-slate-300'}`}>
                          {formData.risk === opt.level && <div className="w-2 h-2 bg-primary-600 rounded-full" />}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{opt.level} Risk</div>
                          <div className="text-sm text-slate-500">{opt.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between bg-slate-50/50 p-6 rounded-b-xl border-t border-slate-100">
            <Button variant="ghost" onClick={handleBack} disabled={step === 1} className="gap-2">
              <ArrowLeft size={16} /> Back
            </Button>
            {step < 3 ? (
              <Button onClick={handleNext} disabled={step === 1 && !formData.profile} className="gap-2">
                Continue <ArrowRight size={16} />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading} className="gap-2 min-w-[140px]">
                {loading ? <Loader2 className="animate-spin" size={16} /> : (
                  <>Generate Demo <ArrowRight size={16} /></>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import type { UserPersona, UserRole } from '../../types';
import { MOCK_PERSONAS } from '../../data/mockData';
import { Lock, Mail, Eye, EyeOff, Zap, Sun, Moon, ArrowRight, UserCheck, Terminal } from 'lucide-react';

interface LoginPageProps {
  onLogin: (persona: UserPersona, role: UserRole) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  personas?: UserPersona[];
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, theme, onToggleTheme, personas }) => {
  const [activeLoginRole, setActiveLoginRole] = useState<UserRole>('employee');
  const [email, setEmail] = useState('rajesh.kumar@mospi.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const personasList = personas || MOCK_PERSONAS;

  const handleRoleTabChange = (role: UserRole) => {
    setActiveLoginRole(role);
    if (role === 'admin') {
      setEmail('sunita.admin@mospi.gov.in');
    } else {
      setEmail('rajesh.kumar@mospi.gov.in');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const matchedPersona = personasList.find(p => p.email.toLowerCase() === email.toLowerCase()) ||
                             (activeLoginRole === 'admin' ? personasList.find(p => p.userRole === 'admin') : personasList[0]);
      onLogin(matchedPersona!, activeLoginRole);
      setIsLoading(false);
    }, 450);
  };

  const handleQuickPersonaLogin = (persona: UserPersona) => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin(persona, persona.userRole);
      setIsLoading(false);
    }, 350);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative font-sans">
      
      {/* Engineering Mesh Background */}
      <div className="eng-bg-mesh" />

      {/* Top Header Controls */}
      <header className="flex items-center justify-between max-w-6xl w-full mx-auto relative z-20">
        <a
          href="/"
          onClick={(e) => e.preventDefault()}
          className="flex items-center gap-3 cursor-pointer group focus:outline-none select-none"
          title="SkillSetu | MoSPI Skill Intelligence"
        >
          <img
            src="/skillsetu.png"
            alt="SkillSetu Logo"
            className="w-10 h-10 rounded-xl object-contain bg-white p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform"
          />
          <div>
            <h2 className="font-bold text-sm tracking-wide">SkillSetu</h2>
            <p className="text-[11px] opacity-70 font-medium">Ministry of Statistics & Programme Implementation</p>
          </div>
        </a>

        <button
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="px-3 py-1.5 rounded-xl eng-card eng-btn-secondary transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Light Theme</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Dark Theme</span>
            </>
          )}
        </button>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center py-8 relative z-20">
        <div className="max-w-md w-full eng-card p-6 sm:p-8 space-y-6">
          
          {/* Emblem & Portal Branding */}
          <div className="text-center space-y-2">
            <img
              src="/skillsetu.png"
              alt="SkillSetu Logo"
              className="w-16 h-16 rounded-2xl object-contain bg-white p-1 mx-auto shadow-lg shadow-indigo-500/30"
            />
            <h1 className="text-xl font-bold tracking-tight">AI Skill Gap & iGOT Integration</h1>
            <p className="text-xs opacity-75 font-medium">
              National Statistical Systems Training Academy (NSSTA) Portal
            </p>
          </div>

          {/* Role Tab Selector (Learner vs Admin) */}
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-900/10 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => handleRoleTabChange('employee')}
              className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeLoginRole === 'employee'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              Statistical Officer Login
            </button>
            <button
              type="button"
              onClick={() => handleRoleTabChange('admin')}
              className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeLoginRole === 'admin'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              NSSTA Admin Login
            </button>
          </div>

          {/* Quick Demo One-Click Persona Login */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px] font-mono font-semibold opacity-70">
              <span>DEMO PERSONAS (ONE-CLICK)</span>
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {MOCK_PERSONAS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleQuickPersonaLogin(p)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    p.userRole === activeLoginRole
                      ? 'border-indigo-500/60 bg-indigo-500/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-indigo-500/30'
                  }`}
                >
                  <img src={p.avatarUrl} alt={p.name} className="w-7 h-7 rounded-full object-cover mb-1 border border-indigo-400/40" />
                  <p className="font-bold text-[11px] truncate leading-tight">{p.name}</p>
                  <p className="text-[9px] font-mono opacity-70 truncate">{p.userRole === 'admin' ? 'NSSTA Admin' : 'Officer'}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
            <span className="flex-shrink mx-3 text-[10px] uppercase font-mono font-bold opacity-50">Or Use Email Auth</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
          </div>

          {/* Credential Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            <div>
              <label className="text-xs font-semibold block mb-1">Official Email ID</label>
              <div className="relative">
                <Mail className="w-4 h-4 opacity-50 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="officer@mospi.gov.in"
                  className="w-full eng-input rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 opacity-50 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full eng-input rounded-xl pl-10 pr-10 py-2.5 text-xs font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 opacity-60 hover:opacity-100"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-0"
                />
                <span>Remember Session</span>
              </label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-indigo-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeLoginRole === 'admin' ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md' : 'eng-btn-primary'
              }`}
            >
              {isLoading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Access {activeLoginRole === 'admin' ? 'Admin Portal' : 'Learner Dashboard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* iGOT Karmayogi SSO Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => handleQuickPersonaLogin(personasList[0])}
              className="w-full eng-card border border-indigo-500/30 hover:border-indigo-500 text-indigo-500 dark:text-indigo-400 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Login with iGOT Karmayogi SSO</span>
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs opacity-75 font-mono py-2 relative z-20">
        SkillSetu | Ministry of Statistics & Programme Implementation (MoSPI)
      </footer>

    </div>
  );
};

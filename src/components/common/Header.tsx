import React from 'react';
import type { UserPersona, UserRole, IGotSyncConfig } from '../../types';
import { MOCK_PERSONAS } from '../../data/mockData';
import { Shield, Award, BookOpen, ChevronDown, CheckCircle2, Zap, Sun, Moon, LogOut } from 'lucide-react';

interface HeaderProps {
  currentPersona: UserPersona;
  onPromptUserSwitch: (candidate: UserPersona) => void;
  currentRoleView: UserRole;
  onToggleRoleView: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  igotSyncConfig: IGotSyncConfig;
  onOpenIgotSync: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPersona,
  onPromptUserSwitch,
  currentRoleView,
  onToggleRoleView,
  activeTab,
  onTabChange,
  igotSyncConfig,
  onOpenIgotSync,
  theme,
  onToggleTheme,
  onLogout
}) => {
  const [showPersonaMenu, setShowPersonaMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 eng-header px-4 lg:px-8 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Logo & Hackathon Team Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight">MoSPI Skill Intelligence</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                iGOT Karmayogi API
              </span>
            </div>
            <p className="text-[11px] opacity-70 font-medium">SIH Solution | Ministry of Statistics & Programme Implementation</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/10 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          {currentRoleView === 'employee' ? (
            <>
              <button
                onClick={() => onTabChange('overview')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Competency & Radar</span>
                </div>
              </button>
              <button
                onClick={() => onTabChange('courses')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'courses'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>iGOT Catalog</span>
                </div>
              </button>
              <button
                onClick={() => onTabChange('quiz')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AI Quiz Studio</span>
                </div>
              </button>
            </>
          ) : (
            <button
              onClick={() => onTabChange('admin')}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white shadow-sm"
            >
              Admin Governance & Skill Matrix
            </button>
          )}
        </nav>

        {/* Right Section Controls */}
        <div className="flex items-center gap-2">
          
          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className="p-2 rounded-xl eng-card hover:border-indigo-500/40 transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* iGOT Sync Button */}
          <button
            onClick={onOpenIgotSync}
            title="Sync with iGOT Karmayogi Portal API"
            className="px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-500 dark:text-sky-400 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{igotSyncConfig.isConnected ? 'iGOT Sync Active' : 'Connect iGOT'}</span>
          </button>

          {/* Role Switcher */}
          <button
            onClick={() => onToggleRoleView(currentRoleView === 'employee' ? 'admin' : 'employee')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold eng-card hover:border-indigo-500/40 transition-all cursor-pointer"
          >
            {currentRoleView === 'employee' ? 'Switch to Admin' : 'Switch to Learner'}
          </button>

          {/* Persona Menu */}
          <div className="relative">
            <button
              onClick={() => setShowPersonaMenu(!showPersonaMenu)}
              className="flex items-center gap-2 eng-card hover:border-indigo-500/50 rounded-xl px-2.5 py-1.5 transition-all cursor-pointer"
            >
              <img
                src={currentPersona.avatarUrl}
                alt={currentPersona.name}
                className="w-6 h-6 rounded-full object-cover border border-indigo-400/50"
              />
              <div className="hidden lg:block text-left text-xs">
                <p className="font-semibold leading-tight">{currentPersona.name}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {showPersonaMenu && (
              <div className="absolute right-0 mt-2 w-64 eng-card p-2 z-50 space-y-1 shadow-xl">
                <p className="text-[10px] font-mono font-bold opacity-60 uppercase px-2 py-1 border-b border-slate-200 dark:border-slate-800">
                  Switch Persona (Requires Auth)
                </p>
                <div className="space-y-1 pt-1">
                  {MOCK_PERSONAS.map(persona => (
                    <button
                      key={persona.id}
                      onClick={() => {
                        setShowPersonaMenu(false);
                        onPromptUserSwitch(persona);
                      }}
                      className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-all cursor-pointer ${
                        currentPersona.id === persona.id
                          ? 'bg-indigo-500/15 border border-indigo-500/30 font-semibold'
                          : 'hover:bg-slate-500/10'
                      }`}
                    >
                      <img
                        src={persona.avatarUrl}
                        alt={persona.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span>{persona.name}</span>
                          {currentPersona.id === persona.id && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                          )}
                        </div>
                        <span className="text-[10px] opacity-70 block truncate">{persona.designation}</span>
                      </div>
                    </button>
                  ))}

                  {onLogout && (
                    <div className="pt-1.5 border-t border-slate-200 dark:border-slate-800">
                      <button
                        onClick={() => {
                          setShowPersonaMenu(false);
                          onLogout();
                        }}
                        className="w-full p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out Session</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

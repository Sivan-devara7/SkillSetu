import React from 'react';
import type { UserPersona, UserRole } from '../../types';
import { Shield, Key, ArrowRight, Lock } from 'lucide-react';

interface UserSwitchAuthModalProps {
  isOpen: boolean;
  candidatePersona: UserPersona | null;
  onClose: () => void;
  onConfirmSwitch: (persona: UserPersona, role: UserRole) => void;
}

export const UserSwitchAuthModal: React.FC<UserSwitchAuthModalProps> = ({
  isOpen,
  candidatePersona,
  onClose,
  onConfirmSwitch
}) => {
  const [password, setPassword] = React.useState('password123');
  const [errorMsg, setErrorMsg] = React.useState('');

  if (!isOpen || !candidatePersona) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMsg('Please enter valid password credentials.');
      return;
    }
    setErrorMsg('');
    const role: UserRole = candidatePersona.userRole === 'admin' ? 'admin' : 'employee';
    onConfirmSwitch(candidatePersona, role);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="eng-card max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Switch User Authentication</h3>
              <p className="text-[11px] opacity-70 font-medium">Verify credentials to switch session persona</p>
            </div>
          </div>
          <button onClick={onClose} className="opacity-70 hover:opacity-100 font-bold text-sm">✕</button>
        </div>

        {/* Selected Persona Card */}
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center gap-3.5">
          <img
            src={candidatePersona.avatarUrl}
            alt={candidatePersona.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/50 shadow-sm"
          />
          <div>
            <h4 className="font-bold text-sm text-indigo-500">{candidatePersona.name}</h4>
            <p className="text-xs opacity-80 font-medium">{candidatePersona.designation}</p>
            <p className="text-[10px] opacity-60 font-mono mt-0.5">{candidatePersona.email}</p>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-semibold block mb-1">Official Email ID</label>
            <input
              type="email"
              value={candidatePersona.email}
              readOnly
              className="w-full eng-input rounded-xl px-3.5 py-2 text-xs font-medium opacity-80 cursor-not-allowed bg-slate-500/5"
            />
          </div>

          <div>
            <label className="text-xs font-semibold block mb-1 flex items-center justify-between">
              <span>Account Password</span>
              <span className="text-[10px] text-indigo-500 font-mono font-bold flex items-center gap-1">
                <Key className="w-3 h-3" /> Credentials Required
              </span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              required
              className="w-full eng-input rounded-xl px-3.5 py-2 text-xs font-medium font-mono"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-500 font-bold">{errorMsg}</p>
          )}

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl eng-card hover:border-slate-400 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Authenticate & Switch User</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

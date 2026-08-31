import React from 'react';
import type { RoleRequirement, SkillLevel } from '../../types';
import { MOCK_PERSONAS, MOCK_PROFILES } from '../../data/mockData';

import { MOSPI_SKILLS } from '../../data/taxonomy';
import { computeSkillGaps, computeOverallReadiness } from '../../services/gapAnalysisEngine';
import { Users, BarChart2, Shield, Sliders, TrendingUp, Search, Save, CheckCircle2 } from 'lucide-react';

interface AdminDashboardProps {
  roles: RoleRequirement[];
  onUpdateRoleRequirement: (updatedRole: RoleRequirement) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ roles, onUpdateRoleRequirement }) => {
  const [activeAdminTab, setActiveAdminTab] = React.useState<'heatmap' | 'roles' | 'employees'>('heatmap');
  const [selectedRoleId, setSelectedRoleId] = React.useState<string>(roles[0].id);
  const [editingRole, setEditingRole] = React.useState<RoleRequirement>(roles[0]);
  const [saveSuccessMsg, setSaveSuccessMsg] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const found = roles.find(r => r.id === selectedRoleId);
    if (found) setEditingRole({ ...found, requiredSkills: { ...found.requiredSkills } });
  }, [selectedRoleId, roles]);

  const handleRequiredLevelChange = (skillId: string, level: SkillLevel) => {
    setEditingRole(prev => ({
      ...prev,
      requiredSkills: {
        ...prev.requiredSkills,
        [skillId]: level
      }
    }));
  };

  const handleSaveRole = () => {
    onUpdateRoleRequirement(editingRole);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  // Mock Org Departments & Gap Heatmap Data
  const orgHeatmapData = [
    { department: 'Field Operations Division (FOD)', statistical: 85, technical: 42, digital_gov: 60, behavioural: 78 },
    { department: 'National Accounts Division (NAD)', statistical: 92, technical: 65, digital_gov: 70, behavioural: 85 },
    { department: 'Economic Statistics Division (ESD)', statistical: 88, technical: 58, digital_gov: 62, behavioural: 80 },
    { department: 'Computer Centre & IT (CC)', statistical: 60, technical: 95, digital_gov: 90, behavioural: 75 },
    { department: 'Price Statistics Division (PSD)', statistical: 90, technical: 50, digital_gov: 55, behavioural: 72 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="eng-card p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              National Statistical Systems Training Academy (NSSTA) Governance
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
              Admin Analytics
            </span>
          </div>
          <p className="text-xs opacity-75 mt-1 font-medium">
            Departmental gap heatmap, role requirement vector manager, and officer directory.
          </p>
        </div>

        {/* Admin Navigation Pills */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/10 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveAdminTab('heatmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeAdminTab === 'heatmap' ? 'bg-emerald-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'
            }`}
          >
            Org Heatmap & Impact
          </button>
          <button
            onClick={() => setActiveAdminTab('roles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeAdminTab === 'roles' ? 'bg-emerald-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'
            }`}
          >
            Role Requirement Vectors
          </button>
          <button
            onClick={() => setActiveAdminTab('employees')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeAdminTab === 'employees' ? 'bg-emerald-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'
            }`}
          >
            Officer Directory
          </button>
        </div>
      </div>

      {activeAdminTab === 'heatmap' && (
        <div className="space-y-6">
          
          {/* Org Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="eng-card p-5">
              <span className="text-xs opacity-70 block font-mono font-bold">TOTAL ASSESSED OFFICERS</span>
              <div className="text-2xl font-bold mt-1">1,480 Officers</div>
              <span className="text-[10px] text-emerald-500 font-mono font-bold mt-1 block">94% Profile Completion</span>
            </div>
            <div className="eng-card p-5">
              <span className="text-xs opacity-70 block font-mono font-bold">TRAINING READINESS DELTA</span>
              <div className="text-2xl font-bold text-emerald-500 mt-1 flex items-center gap-1">
                +34.2%
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] opacity-70 font-medium mt-1 block">Post-iGOT assessment scores</span>
            </div>
            <div className="eng-card p-5">
              <span className="text-xs opacity-70 block font-mono font-bold">iGOT CERTIFICATIONS</span>
              <div className="text-2xl font-bold text-indigo-500 mt-1">3,120 Courses</div>
              <span className="text-[10px] opacity-70 font-medium mt-1 block">Avg 14.5 hours per officer</span>
            </div>
            <div className="eng-card p-5">
              <span className="text-xs opacity-70 block font-mono font-bold">CRITICAL TECHNICAL GAPS</span>
              <div className="text-2xl font-bold text-amber-500 mt-1">Python & Pandas</div>
              <span className="text-[10px] text-amber-500 font-mono font-bold mt-1 block">High priority in FOD & ESD</span>
            </div>
          </div>

          {/* Org Gap Heatmap Table */}
          <div className="eng-card p-6 lg:p-8 space-y-4">
            <div>
              <h2 className="font-bold text-base flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-500" />
                Departmental Competency Readiness Heatmap
              </h2>
              <p className="text-xs opacity-70 font-medium">Aggregated proficiency scores across official MoSPI divisions</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="opacity-70 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <th className="py-2.5 px-3 font-bold">Department / Division</th>
                    <th className="py-2.5 px-3 text-center font-bold">Statistical Competencies</th>
                    <th className="py-2.5 px-3 text-center font-bold">Technical & Analytics</th>
                    <th className="py-2.5 px-3 text-center font-bold">Digital Governance</th>
                    <th className="py-2.5 px-3 text-center font-bold">Behavioural</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {orgHeatmapData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-500/5 transition-colors">
                      <td className="py-3 px-3 font-semibold">{row.department}</td>
                      
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-3 py-0.5 rounded font-mono font-bold text-xs ${
                          row.statistical >= 80 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                        }`}>
                          {row.statistical}% Match
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-3 py-0.5 rounded font-mono font-bold text-xs ${
                          row.technical >= 80 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' : row.technical >= 60 ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' : 'bg-rose-500/10 text-rose-500 border border-rose-500/30'
                        }`}>
                          {row.technical}% Match
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-3 py-0.5 rounded font-mono font-bold text-xs ${
                          row.digital_gov >= 80 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                        }`}>
                          {row.digital_gov}% Match
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-3 py-0.5 rounded font-mono font-bold text-xs ${
                          row.behavioural >= 80 ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                        }`}>
                          {row.behavioural}% Match
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {activeAdminTab === 'roles' && (
        /* Role Requirement Manager */
        <div className="eng-card p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="font-bold text-base flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-500" />
                Role Requirement Vector Calibration
              </h2>
              <p className="text-xs opacity-70 font-medium">Define baseline target skill levels for official MoSPI job designations</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedRoleId}
                onChange={(e) => setSelectedRoleId(e.target.value)}
                className="eng-input rounded-xl px-3 py-2 text-xs font-semibold"
              >
                {roles.map(r => (
                  <option key={r.id} value={r.id} className="bg-slate-900 text-white">{r.title}</option>
                ))}
              </select>

              <button
                onClick={handleSaveRole}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save Requirement Vector
              </button>
            </div>
          </div>

          {saveSuccessMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-500 font-bold flex items-center gap-2 animate-pulse">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Role requirement vector updated successfully! Skill gap analysis recalculated across officer database.
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase opacity-70">Requirement Levels for {editingRole.title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOSPI_SKILLS.map(skill => {
                const currentReq = editingRole.requiredSkills[skill.id] || 0;
                return (
                  <div key={skill.id} className="p-3.5 rounded-xl bg-slate-500/5 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs block">{skill.name}</span>
                      <span className="text-[10px] font-mono opacity-70 uppercase">{skill.category}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => handleRequiredLevelChange(skill.id, lvl as SkillLevel)}
                          className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                            currentReq === lvl
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'eng-card opacity-70 hover:opacity-100'
                          }`}
                        >
                          L{lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeAdminTab === 'employees' && (
        /* Officer Directory */
        <div className="eng-card p-6 lg:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" />
                MoSPI Officer Competency Directory
              </h2>
              <p className="text-xs opacity-70 font-medium">Search officers and inspect individual role readiness</p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 opacity-50 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search officer or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="eng-input rounded-xl pl-9 pr-4 py-2 text-xs font-medium"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="opacity-70 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <th className="py-2.5 px-3 font-bold">Officer Name</th>
                  <th className="py-2.5 px-3 font-bold">Designation</th>
                  <th className="py-2.5 px-3 font-bold">Department</th>
                  <th className="py-2.5 px-3 font-bold">Target Vector</th>
                  <th className="py-2.5 px-3 text-center font-bold">Role Match %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {MOCK_PERSONAS.filter(p => p.userRole === 'employee').map(persona => {
                  const role = roles.find(r => r.id === persona.roleId) || roles[0];
                  const profile = MOCK_PROFILES[persona.id] || MOCK_PROFILES['usr_rajesh'];
                  const gaps = computeSkillGaps(profile, role);
                  const readiness = computeOverallReadiness(gaps);

                  return (
                    <tr key={persona.id} className="hover:bg-slate-500/5 transition-colors">
                      <td className="py-3 px-3 font-bold flex items-center gap-2.5">
                        <img src={persona.avatarUrl} alt={persona.name} className="w-7 h-7 rounded-full object-cover border border-indigo-500/40" />
                        <span>{persona.name}</span>
                      </td>
                      <td className="py-3 px-3 font-medium">{persona.designation}</td>
                      <td className="py-3 px-3 opacity-80 font-medium">{persona.department}</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-0.5 rounded font-mono text-[11px] font-semibold bg-indigo-500/10 text-indigo-500">
                          {role.title}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="font-mono font-bold text-emerald-500 bg-emerald-500/10 px-3 py-0.5 rounded border border-emerald-500/30">
                          {readiness}% Match
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

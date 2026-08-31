import React from 'react';
import type { CompetencyProfile, RoleRequirement, UserPersona } from '../../types';
import { computeSkillGaps, computeOverallReadiness, computeCategoryBreakdown } from '../../services/gapAnalysisEngine';

import { SKILL_LEVEL_LABELS, CATEGORY_METADATA } from '../../data/taxonomy';
import { Target, TrendingUp, AlertTriangle, CheckCircle2, Award, Zap, ArrowRight, BookOpen, BrainCircuit } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

interface SkillGapRadarViewProps {
  profile: CompetencyProfile;
  role: RoleRequirement;
  persona: UserPersona;
  onNavigateToCourses: () => void;
  onNavigateToQuiz: () => void;
  theme?: 'dark' | 'light';
}

export const SkillGapRadarView: React.FC<SkillGapRadarViewProps> = ({
  profile,
  role,
  persona,
  onNavigateToCourses,
  onNavigateToQuiz,
  theme = 'dark'
}) => {
  const gaps = computeSkillGaps(profile, role);
  const readinessPercent = computeOverallReadiness(gaps);
  const categoryBreakdown = computeCategoryBreakdown(gaps);

  const highGapsCount = gaps.filter(g => g.severity === 'high').length;
  const mediumGapsCount = gaps.filter(g => g.severity === 'medium').length;

  // Format data for Radar Chart
  const radarData = gaps.map(g => ({
    skill: g.skillName.length > 20 ? g.skillName.substring(0, 18) + '...' : g.skillName,
    fullName: g.skillName,
    Current: g.currentLevel,
    Required: g.requiredLevel,
    category: g.category
  }));

  // Format data for Bar Chart
  const barData = gaps
    .filter(g => g.gapDelta > 0)
    .map(g => ({
      name: g.skillName,
      delta: g.gapDelta,
      current: g.currentLevel,
      required: g.requiredLevel,
      severity: g.severity
    }));

  const isDark = theme === 'dark';
  const gridStroke = isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.3)';
  const tickFill = isDark ? '#f8fafc' : '#0f172a';

  return (
    <div className="space-y-6">
      
      {/* Officer Summary Card */}
      <div className="eng-card p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <img
              src={persona.avatarUrl}
              alt={persona.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-indigo-500/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold tracking-tight">{persona.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-indigo-500/15 text-indigo-500 border border-indigo-500/30">
                  {persona.designation}
                </span>
              </div>
              <p className="text-xs opacity-75 mt-0.5 font-medium">{persona.department}</p>
              <p className="text-[11px] opacity-60 mt-1 font-mono">Target Role Requirements: <strong className="text-indigo-400 font-bold">{role.title}</strong></p>
            </div>
          </div>

          {/* Readiness Score Box */}
          <div className="flex items-center gap-4 eng-card px-5 py-3.5 border-emerald-500/30 bg-emerald-500/5">
            <div className="text-right">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-70">Role Match Readiness</span>
              <div className="text-2xl font-black text-emerald-500 flex items-center justify-end gap-1">
                {readinessPercent}%
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="p-3.5 rounded-xl bg-slate-500/5 border border-slate-200 dark:border-slate-800">
            <span className="text-[11px] opacity-70 uppercase font-mono font-bold">Required Competencies</span>
            <p className="text-xl font-bold mt-1">{gaps.length}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/30">
            <span className="text-[11px] text-amber-500 font-mono font-bold uppercase flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              High Priority Gaps
            </span>
            <p className="text-xl font-bold text-amber-500 mt-1">{highGapsCount} Skills</p>
          </div>
          <div className="p-3.5 rounded-xl bg-indigo-500/5 border border-indigo-500/30">
            <span className="text-[11px] text-indigo-500 font-mono font-bold uppercase">Medium Priority Gaps</span>
            <p className="text-xl font-bold text-indigo-500 mt-1">{mediumGapsCount} Skills</p>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/30">
            <span className="text-[11px] text-emerald-500 font-mono font-bold uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Aligned Competencies
            </span>
            <p className="text-xl font-bold text-emerald-500 mt-1">{gaps.length - highGapsCount - mediumGapsCount} Skills</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Radar Chart Panel */}
        <div className="lg:col-span-7 eng-card p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-base flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-500" />
                Competency Radar Analysis
              </h2>
              <p className="text-xs opacity-70 font-medium">Assessed Competencies vs Role Target Levels</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span>Current Level</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />
                <span>Target Required</span>
              </div>
            </div>
          </div>

          <div className="h-[360px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke={gridStroke} />
                <PolarAngleAxis dataKey="skill" stroke={gridStroke} tick={{ fill: tickFill, fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 3]} stroke={gridStroke} tickCount={4} />
                <Radar name="Current Level" dataKey="Current" stroke="#10b981" fill="#10b981" fillOpacity={0.45} />
                <Radar name="Required Level" dataKey="Required" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Panel */}
        <div className="lg:col-span-5 eng-card p-6 lg:p-8 space-y-4">
          <div>
            <h2 className="font-bold text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Category Gap Distribution
            </h2>
            <p className="text-xs opacity-70 font-medium">Aggregated across 4 core statistical & IT domains</p>
          </div>

          <div className="space-y-3">
            {Object.entries(categoryBreakdown).map(([catKey, data]) => {
              const meta = CATEGORY_METADATA[catKey as keyof typeof CATEGORY_METADATA];
              const pct = data.requiredAvg > 0 ? Math.round((data.currentAvg / data.requiredAvg) * 100) : 100;

              return (
                <div key={catKey} className="p-3.5 rounded-xl bg-slate-500/5 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{meta.name}</span>
                    <span className="opacity-75 font-mono">
                      Avg: <strong>{data.currentAvg}</strong> / {data.requiredAvg}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full transition-all duration-300 rounded-full bg-indigo-600"
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-medium opacity-80">
                    <span>{data.gapCount > 0 ? `${data.gapCount} skill gaps identified` : 'Aligned'}</span>
                    <span className="text-indigo-500 font-bold font-mono">{pct}% match</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={onNavigateToCourses}
              className="flex-1 eng-btn-primary text-white font-semibold text-xs py-3 rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Recommended Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNavigateToQuiz}
              className="px-4 eng-card hover:border-indigo-500/40 font-semibold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <BrainCircuit className="w-4 h-4 text-indigo-500" />
              <span>AI Quiz</span>
            </button>
          </div>
        </div>

      </div>

      {/* Gap Delta Bar Chart & Action Table */}
      <div className="eng-card p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-base">Skill Delta Breakdown & Severity Matrix</h2>
            <p className="text-xs opacity-70 font-medium">Ranked gap severity deltas requiring iGOT course enrollment</p>
          </div>
        </div>

        {barData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <XAxis type="number" domain={[0, 3]} stroke={gridStroke} tickCount={4} />
                  <YAxis dataKey="name" type="category" stroke={gridStroke} width={150} tick={{ fontSize: 11, fontWeight: 600, fill: tickFill }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#ffffff', borderColor: isDark ? '#334155' : '#cbd5e1', borderRadius: '12px', color: tickFill, fontWeight: 600 }}
                  />
                  <Bar dataKey="delta" name="Skill Gap Delta" radius={[0, 6, 6, 0]}>
                    {barData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.severity === 'high' ? '#ef4444' : entry.severity === 'medium' ? '#f59e0b' : '#6366f1'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Table */}
            <div className="lg:col-span-6 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="opacity-70 border-b border-slate-200 dark:border-slate-800 pb-2">
                    <th className="py-2 font-bold">Skill Name</th>
                    <th className="py-2 font-bold">Current</th>
                    <th className="py-2 font-bold">Target</th>
                    <th className="py-2 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {gaps.map(gap => (
                    <tr key={gap.skillId} className="hover:bg-slate-500/5 transition-colors">
                      <td className="py-2.5 font-medium">{gap.skillName}</td>
                      <td className="py-2.5 font-mono text-[11px]">
                        {SKILL_LEVEL_LABELS[gap.currentLevel].label}
                      </td>
                      <td className="py-2.5 font-mono text-[11px] text-indigo-500 font-semibold">
                        {SKILL_LEVEL_LABELS[gap.requiredLevel].label}
                      </td>
                      <td className="py-2.5">
                        {gap.severity === 'high' && (
                          <span className="px-2 py-0.5 rounded font-mono font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[10px]">
                            HIGH GAP
                          </span>
                        )}
                        {gap.severity === 'medium' && (
                          <span className="px-2 py-0.5 rounded font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px]">
                            MEDIUM
                          </span>
                        )}
                        {gap.severity === 'low' && (
                          <span className="px-2 py-0.5 rounded font-mono font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 text-[10px]">
                            LOW
                          </span>
                        )}
                        {gap.severity === 'none' && (
                          <span className="px-2 py-0.5 rounded font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px]">
                            ALIGNED
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        ) : (
          <div className="py-8 text-center opacity-70">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <p className="font-bold">All required competencies are fully aligned!</p>
            <p className="text-xs font-medium">No skill gaps detected for this role profile.</p>
          </div>
        )}
      </div>

    </div>
  );
};

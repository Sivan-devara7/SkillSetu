import { useState, useEffect } from 'react';
import type { UserPersona, UserRole, CompetencyProfile, RoleRequirement, Enrollment, SkillLevel, IGotSyncConfig } from './types';
import { MOCK_PERSONAS, MOCK_ROLES, MOCK_PROFILES, MOCK_COURSES } from './data/mockData';

import { Header } from './components/common/Header';
import { SkillGapRadarView } from './components/learner/SkillGapRadarView';
import { CourseRecommendationsView } from './components/learner/CourseRecommendationsView';
import { AIQuizStudio } from './components/learner/AIQuizStudio';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { IGotSyncModal } from './components/common/IGotSyncModal';
import { LoginPage } from './components/auth/LoginPage';
import { UserSwitchAuthModal } from './components/auth/UserSwitchAuthModal';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('mospi_theme') as 'dark' | 'light') || 'dark';
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('mospi_auth') === 'true';
  });
  const [currentPersona, setCurrentPersona] = useState<UserPersona>(MOCK_PERSONAS[0]); // Rajesh Kumar JSO
  const [currentRoleView, setCurrentRoleView] = useState<UserRole>('employee');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [switchUserCandidate, setSwitchUserCandidate] = useState<UserPersona | null>(null);

  useEffect(() => {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
    localStorage.setItem('mospi_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogin = (persona: UserPersona, role: UserRole) => {
    setCurrentPersona(persona);
    setCurrentRoleView(role);
    if (role === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('overview');
    }
    setIsAuthenticated(true);
    localStorage.setItem('mospi_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('mospi_auth');
  };

  // iGOT Integration & Sync State
  const [isIgotModalOpen, setIsIgotModalOpen] = useState(false);
  const [igotSyncConfig, setIgotSyncConfig] = useState<IGotSyncConfig>({
    isConnected: true,
    userIgotId: 'IGOT-RAJESH-2026',
    ssoToken: 'igot_sso_tk_88194a',
    lastSyncedAt: '12:04 PM',
    syncedCoursesCount: 4
  });

  // Live state
  const [profiles, setProfiles] = useState<Record<string, CompetencyProfile>>(MOCK_PROFILES);
  const [roles, setRoles] = useState<RoleRequirement[]>(MOCK_ROLES);
  const [enrollments, setEnrollments] = useState<Record<string, Enrollment>>({});

  // Active target role requirement for current persona
  const activeRole = roles.find(r => r.id === currentPersona.roleId) || roles[0];
  
  // Active profile for current persona
  const activeProfile = profiles[currentPersona.id] || {
    userId: currentPersona.id,
    roleId: currentPersona.roleId,
    scores: {}
  };

  // Handler: Prompt User Switch Credentials Modal
  const handlePromptUserSwitch = (candidatePersona: UserPersona) => {
    if (candidatePersona.id === currentPersona.id) return;
    setSwitchUserCandidate(candidatePersona);
  };

  // Handler: Confirm User Switch after entering password
  const handleConfirmUserSwitch = (persona: UserPersona, role: UserRole) => {
    setCurrentPersona(persona);
    setCurrentRoleView(role);
    setIgotSyncConfig(prev => ({
      ...prev,
      userIgotId: `IGOT-${persona.name.split(' ')[0].toUpperCase()}-2026`
    }));
    if (role === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('overview');
    }
    setSwitchUserCandidate(null);
  };

  // Handler: Toggle View Mode
  const handleToggleRoleView = (role: UserRole) => {
    setCurrentRoleView(role);
    if (role === 'admin') setActiveTab('admin');
    else setActiveTab('overview');
  };

  // Handler: Navigate Home / Learner Dashboard
  const handleNavigateHome = () => {
    setCurrentRoleView('employee');
    setActiveTab('overview');
  };

  // Handler: Skill Level Up (Triggered by Course Completion or AI Quiz Pass)
  const handleSkillLevelUp = (skillId: string, customLevel?: SkillLevel) => {
    setProfiles(prev => {
      const userProf = prev[currentPersona.id] || {
        userId: currentPersona.id,
        roleId: currentPersona.roleId,
        scores: {}
      };

      const currentScore = userProf.scores[skillId];
      const currentLevel = currentScore ? currentScore.level : 0;
      const targetLevel: SkillLevel = customLevel !== undefined 
        ? customLevel 
        : Math.min(3, currentLevel + 1) as SkillLevel;

      const updatedScores = {
        ...userProf.scores,
        [skillId]: {
          skillId,
          level: targetLevel,
          lastAssessedAt: new Date().toISOString().split('T')[0],
          assessedVia: 'igot_course' as const
        }
      };

      return {
        ...prev,
        [currentPersona.id]: {
          ...userProf,
          scores: updatedScores
        }
      };
    });
  };

  // Handler: Bulk Sync All Completed Courses from iGOT Portal API
  const handleSyncAllCompletedCourses = () => {
    const targetCourses = MOCK_COURSES.slice(0, 3);
    targetCourses.forEach(c => {
      handleUpdateEnrollment(c.id, 'completed');
      handleSkillLevelUp(c.skillId);
    });
  };

  // Handler: Update Enrollment Status
  const handleUpdateEnrollment = (courseId: string, status: 'in_progress' | 'completed') => {
    setEnrollments(prev => ({
      ...prev,
      [courseId]: {
        id: `enr_${Date.now()}`,
        userId: currentPersona.id,
        courseId,
        enrolledAt: new Date().toISOString(),
        status,
        progressPercent: status === 'completed' ? 100 : 45,
        completedAt: status === 'completed' ? new Date().toISOString() : undefined
      }
    }));
  };

  // Handler: Update Role Requirement (Admin)
  const handleUpdateRoleRequirement = (updatedRole: RoleRequirement) => {
    setRoles(prev => prev.map(r => r.id === updatedRole.id ? updatedRole : r));
  };

  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={handleLogin}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200 relative">
      
      {/* Background Grid Mesh */}
      <div className="eng-bg-mesh" />

      {/* Navigation Header */}
      <Header
        currentPersona={currentPersona}
        onPromptUserSwitch={handlePromptUserSwitch}
        currentRoleView={currentRoleView}
        onToggleRoleView={handleToggleRoleView}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        igotSyncConfig={igotSyncConfig}
        onOpenIgotSync={() => setIsIgotModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onLogout={handleLogout}
        onNavigateHome={handleNavigateHome}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6 relative z-10">
        
        {currentRoleView === 'employee' ? (
          <>
            {activeTab === 'overview' && (
              <SkillGapRadarView
                profile={activeProfile}
                role={activeRole}
                persona={currentPersona}
                onNavigateToCourses={() => setActiveTab('courses')}
                onNavigateToQuiz={() => setActiveTab('quiz')}
                theme={theme}
              />
            )}

            {activeTab === 'courses' && (
              <CourseRecommendationsView
                profile={activeProfile}
                role={activeRole}
                enrollments={enrollments}
                onUpdateEnrollment={handleUpdateEnrollment}
                onSkillLevelUp={handleSkillLevelUp}
              />
            )}

            {activeTab === 'quiz' && (
              <AIQuizStudio
                userId={currentPersona.id}
                apiKey=""
                onSkillLevelUp={handleSkillLevelUp}
              />
            )}
          </>
        ) : (
          <AdminDashboard
            roles={roles}
            onUpdateRoleRequirement={handleUpdateRoleRequirement}
          />
        )}

      </main>

      {/* iGOT Sync Modal */}
      <IGotSyncModal
        isOpen={isIgotModalOpen}
        onClose={() => setIsIgotModalOpen(false)}
        persona={currentPersona}
        syncConfig={igotSyncConfig}
        onUpdateSyncConfig={setIgotSyncConfig}
        onSyncAllCompletedCourses={handleSyncAllCompletedCourses}
      />

      {/* User Switch Authentication Popup */}
      <UserSwitchAuthModal
        isOpen={Boolean(switchUserCandidate)}
        candidatePersona={switchUserCandidate}
        onClose={() => setSwitchUserCandidate(null)}
        onConfirmSwitch={handleConfirmUserSwitch}
      />

      {/* Footer */}
      <footer className="eng-header py-4 px-4 text-center text-xs mt-12 relative z-10 font-mono">
        <p className="font-semibold">SIH Hackathon Prototype | Ministry of Statistics & Programme Implementation (MoSPI)</p>
        <p className="text-[10px] opacity-70 mt-1">Problem Statement 26101 | Direct API Connection to iGOT Karmayogi (https://igotkarmayogi.gov.in/)</p>
      </footer>

    </div>
  );
}

export default App;

import type { Skill, CompetencyCategory, SkillLevel } from '../types';


export const CATEGORY_METADATA: Record<CompetencyCategory, { name: string; color: string; bgClass: string; borderClass: string; textClass: string; icon: string }> = {
  statistical: {
    name: 'Statistical Competencies',
    color: '#0284c7', // Sky Blue
    bgClass: 'bg-sky-500/10',
    borderClass: 'border-sky-500/30',
    textClass: 'text-sky-400',
    icon: 'BarChart3'
  },
  technical: {
    name: 'Technical & Data Science',
    color: '#8b5cf6', // Purple
    bgClass: 'bg-purple-500/10',
    borderClass: 'border-purple-500/30',
    textClass: 'text-purple-400',
    icon: 'Code2'
  },
  digital_governance: {
    name: 'Digital Governance & Security',
    color: '#10b981', // Emerald Green
    bgClass: 'bg-emerald-500/10',
    borderClass: 'border-emerald-500/30',
    textClass: 'text-emerald-400',
    icon: 'ShieldCheck'
  },
  behavioural: {
    name: 'Behavioural & Management',
    color: '#f59e0b', // Amber/Gold
    bgClass: 'bg-amber-500/10',
    borderClass: 'border-amber-500/30',
    textClass: 'text-amber-400',
    icon: 'Users'
  }
};

export const SKILL_LEVEL_LABELS: Record<SkillLevel, { label: string; badgeClass: string; color: string }> = {
  0: { label: 'None', badgeClass: 'badge-none', color: '#64748b' },
  1: { label: 'Beginner', badgeClass: 'badge-beginner', color: '#38bdf8' },
  2: { label: 'Intermediate', badgeClass: 'badge-intermediate', color: '#818cf8' },
  3: { label: 'Advanced', badgeClass: 'badge-advanced', color: '#34d399' }
};

export const MOSPI_SKILLS: Skill[] = [
  // Statistical (9 skills)
  { id: 'stat_survey_design', name: 'Survey Design & Methodology', category: 'statistical', description: 'Design of sample surveys, questionnaire formulation, and frame construction.' },
  { id: 'stat_sampling', name: 'Sampling Techniques', category: 'statistical', description: 'Stratified sampling, cluster sampling, PPS sampling, and weight calibration.' },
  { id: 'stat_national_accounts', name: 'National Accounts Statistics', category: 'statistical', description: 'GDP estimation, GVA compilation, input-output tables, and SUT formulation.' },
  { id: 'stat_price_stats', name: 'Price Statistics (CPI/WPI)', category: 'statistical', description: 'Consumer Price Index, Wholesale Price Index compilation, and inflation metrics.' },
  { id: 'stat_labour_stats', name: 'Labour & Employment Stats', category: 'statistical', description: 'Periodic Labour Force Survey (PLFS) metrics, WPR, LFPR, and UR analysis.' },
  { id: 'stat_agri_stats', name: 'Agricultural Statistics', category: 'statistical', description: 'Crop yield estimation, land use statistics, and agricultural censuses.' },
  { id: 'stat_industrial_stats', name: 'Industrial Statistics (ASI/IIP)', category: 'statistical', description: 'Annual Survey of Industries (ASI) and Index of Industrial Production (IIP).' },
  { id: 'stat_sdg_indicators', name: 'SDG National Indicator Framework', category: 'statistical', description: 'Monitoring UN Sustainable Development Goals indicators for India.' },
  { id: 'stat_data_quality', name: 'Data Quality & Validation', category: 'statistical', description: 'Data audit, outlier detection, missing value imputation, and consistency checks.' },

  // Technical (11 skills)
  { id: 'tech_python', name: 'Python for Data Analysis', category: 'technical', description: 'Pandas, NumPy, Matplotlib, Seaborn, and automated statistical pipelines.' },
  { id: 'tech_r', name: 'R Statistical Computing', category: 'technical', description: 'Tidyverse, survey package, statistical modelling, and markdown reporting.' },
  { id: 'tech_sql', name: 'SQL & Database Management', category: 'technical', description: 'Complex queries, indexing, PostgreSQL, database schema design for survey data.' },
  { id: 'tech_stata', name: 'Stata Statistical Software', category: 'technical', description: 'Econometric modelling, survey estimation, and panel data analysis.' },
  { id: 'tech_spss', name: 'SPSS Analytical Package', category: 'technical', description: 'Cross-tabulation, multivariate analysis, and non-parametric tests.' },
  { id: 'tech_sas', name: 'SAS Analytics Suite', category: 'technical', description: 'Enterprise statistical programming and macro automation.' },
  { id: 'tech_gis', name: 'GIS & Spatial Analytics', category: 'technical', description: 'QGIS, spatial statistics, geo-tagging survey units, and thematic mapping.' },
  { id: 'tech_viz', name: 'Data Visualization & Dashboards', category: 'technical', description: 'Interactive charts, Power BI, Tableau, and public statistical dashboards.' },
  { id: 'tech_aiml', name: 'AI & Machine Learning', category: 'technical', description: 'Supervised learning, NLP for textual data, and predictive forecasting.' },
  { id: 'tech_cloud', name: 'Cloud Infrastructure & Analytics', category: 'technical', description: 'Government Cloud (MeghRaj), AWS, big data processing pipelines.' },
  { id: 'tech_apis', name: 'REST APIs & Data Integration', category: 'technical', description: 'Designing open API endpoints for public statistical data dissemination.' },

  // Digital Governance (5 skills)
  { id: 'gov_cybersecurity', name: 'Cybersecurity & Data Protection', category: 'digital_governance', description: 'Information security guidelines, ISO 27001, CERT-In compliance.' },
  { id: 'gov_data_privacy', name: 'Data Privacy & Ethics (DPDP)', category: 'digital_governance', description: 'Digital Personal Data Protection Act compliance and anonymization.' },
  { id: 'gov_digital_sig', name: 'Digital Signatures & e-Sign', category: 'digital_governance', description: 'Implementation of e-Office, PKI authentication, and document signing.' },
  { id: 'gov_cloud', name: 'Government Cloud (MeghRaj)', category: 'digital_governance', description: 'Deployment standards on NIC MeghRaj cloud infrastructure.' },
  { id: 'gov_dpi', name: 'Digital Public Infrastructure (DPI)', category: 'digital_governance', description: 'Aadhaar, DigiLocker, India Stack integration in statistical workflows.' },

  // Behavioural & Managerial (6 skills)
  { id: 'mgmt_leadership', name: 'Leadership & Team Management', category: 'behavioural', description: 'Leading field teams, steering committees, and inter-departmental groups.' },
  { id: 'mgmt_comm', name: 'Statistical Communication & Writing', category: 'behavioural', description: 'Drafting policy briefs, press notes, and statistical reports for citizens.' },
  { id: 'mgmt_project', name: 'Project & Survey Management', category: 'behavioural', description: 'Budgeting, timeline management, field monitoring, and vendor management.' },
  { id: 'mgmt_ethics', name: 'Professional Ethics & Objectivity', category: 'behavioural', description: 'Fundamental Principles of Official Statistics and impartiality.' },
  { id: 'mgmt_decision', name: 'Data-Driven Decision Making', category: 'behavioural', description: 'Translating statistical insights into actionable government policy.' },
  { id: 'mgmt_change', name: 'Change Management & Digital Shift', category: 'behavioural', description: 'Driving digital transformation and paper-to-digital transition in surveys.' }
];

export const SKILL_MAP = new Map<string, Skill>(MOSPI_SKILLS.map(s => [s.id, s]));

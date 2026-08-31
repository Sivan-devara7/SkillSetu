import type { UserPersona, RoleRequirement, CompetencyProfile, Course } from '../types';


export const MOCK_PERSONAS: UserPersona[] = [
  {
    id: 'usr_rajesh',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@mospi.gov.in',
    userRole: 'employee',
    designation: 'Junior Statistical Officer (JSO)',
    department: 'Field Operations Division (FOD), Delhi',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    roleId: 'role_jso',
    joinedDate: '2022-04-15'
  },
  {
    id: 'usr_priya',
    name: 'Priya Sharma',
    email: 'priya.sharma@mospi.gov.in',
    userRole: 'employee',
    designation: 'Senior System Analyst (SSA)',
    department: 'Computer Centre & Data Dissemination',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    roleId: 'role_analyst',
    joinedDate: '2020-08-10'
  },
  {
    id: 'usr_amitabh',
    name: 'Dr. Amitabh Roy',
    email: 'amitabh.roy@mospi.gov.in',
    userRole: 'employee',
    designation: 'Deputy Director General (DDG)',
    department: 'National Accounts Division (NAD)',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    roleId: 'role_director',
    joinedDate: '2015-02-01'
  },
  {
    id: 'usr_admin',
    name: 'Sunita Verma',
    email: 'sunita.admin@mospi.gov.in',
    userRole: 'admin',
    designation: 'Director (Training & HRD)',
    department: 'National Statistical Systems Training Academy (NSSTA)',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    roleId: 'role_director',
    joinedDate: '2018-06-12'
  }
];

export const MOCK_ROLES: RoleRequirement[] = [
  {
    id: 'role_jso',
    title: 'Junior Statistical Officer (JSO)',
    department: 'Field Operations & Surveys',
    description: 'Responsible for sample survey execution, data collection verification, primary field auditing, and preliminary data processing.',
    requiredSkills: {
      stat_survey_design: 3,
      stat_sampling: 3,
      stat_data_quality: 3,
      stat_labour_stats: 2,
      stat_price_stats: 2,
      tech_python: 2,
      tech_r: 1,
      tech_sql: 2,
      tech_viz: 2,
      gov_data_privacy: 2,
      gov_cybersecurity: 2,
      mgmt_comm: 2,
      mgmt_ethics: 3
    }
  },
  {
    id: 'role_analyst',
    title: 'Data Analyst / Senior System Analyst',
    department: 'Computer Centre & IT',
    description: 'Specializes in large-scale dataset management, enterprise statistical pipelines, web dissemination APIs, and automated reporting.',
    requiredSkills: {
      tech_python: 3,
      tech_r: 2,
      tech_sql: 3,
      tech_viz: 3,
      tech_aiml: 2,
      tech_cloud: 2,
      tech_apis: 3,
      stat_data_quality: 3,
      stat_national_accounts: 2,
      gov_cybersecurity: 3,
      gov_data_privacy: 3,
      gov_cloud: 3,
      mgmt_project: 2
    }
  },
  {
    id: 'role_director',
    title: 'Deputy Director General / Director',
    department: 'National Accounts & Macro Statistics',
    description: 'Oversees macroeconomic statistics compilation (GDP/GVA), policy decision support, strategic inter-ministerial coordination, and administrative leadership.',
    requiredSkills: {
      stat_national_accounts: 3,
      stat_sdg_indicators: 3,
      stat_price_stats: 3,
      stat_agri_stats: 2,
      tech_viz: 2,
      tech_aiml: 1,
      gov_dpi: 3,
      gov_data_privacy: 3,
      mgmt_leadership: 3,
      mgmt_comm: 3,
      mgmt_decision: 3,
      mgmt_change: 3,
      mgmt_ethics: 3
    }
  }
];

export const MOCK_PROFILES: Record<string, CompetencyProfile> = {
  usr_rajesh: {
    userId: 'usr_rajesh',
    roleId: 'role_jso',
    scores: {
      stat_survey_design: { skillId: 'stat_survey_design', level: 3, lastAssessedAt: '2026-07-10', assessedVia: 'admin_evaluation' },
      stat_sampling: { skillId: 'stat_sampling', level: 2, lastAssessedAt: '2026-07-15', assessedVia: 'self_assessment' },
      stat_data_quality: { skillId: 'stat_data_quality', level: 2, lastAssessedAt: '2026-08-01', assessedVia: 'ai_quiz' },
      stat_labour_stats: { skillId: 'stat_labour_stats', level: 2, lastAssessedAt: '2026-06-20', assessedVia: 'self_assessment' },
      stat_price_stats: { skillId: 'stat_price_stats', level: 1, lastAssessedAt: '2026-05-12', assessedVia: 'self_assessment' },
      tech_python: { skillId: 'tech_python', level: 0, lastAssessedAt: '2026-08-10', assessedVia: 'self_assessment' }, // HIGH GAP
      tech_r: { skillId: 'tech_r', level: 0, lastAssessedAt: '2026-08-10', assessedVia: 'self_assessment' },
      tech_sql: { skillId: 'tech_sql', level: 1, lastAssessedAt: '2026-08-05', assessedVia: 'self_assessment' },
      tech_viz: { skillId: 'tech_viz', level: 1, lastAssessedAt: '2026-08-05', assessedVia: 'self_assessment' },
      gov_data_privacy: { skillId: 'gov_data_privacy', level: 1, lastAssessedAt: '2026-07-01', assessedVia: 'self_assessment' },
      gov_cybersecurity: { skillId: 'gov_cybersecurity', level: 1, lastAssessedAt: '2026-07-01', assessedVia: 'self_assessment' },
      mgmt_comm: { skillId: 'mgmt_comm', level: 2, lastAssessedAt: '2026-06-01', assessedVia: 'admin_evaluation' },
      mgmt_ethics: { skillId: 'mgmt_ethics', level: 3, lastAssessedAt: '2026-06-01', assessedVia: 'admin_evaluation' }
    }
  },
  usr_priya: {
    userId: 'usr_priya',
    roleId: 'role_analyst',
    scores: {
      tech_python: { skillId: 'tech_python', level: 3, lastAssessedAt: '2026-08-15', assessedVia: 'igot_course' },
      tech_r: { skillId: 'tech_r', level: 2, lastAssessedAt: '2026-07-20', assessedVia: 'self_assessment' },
      tech_sql: { skillId: 'tech_sql', level: 3, lastAssessedAt: '2026-08-01', assessedVia: 'admin_evaluation' },
      tech_viz: { skillId: 'tech_viz', level: 3, lastAssessedAt: '2026-08-10', assessedVia: 'igot_course' },
      tech_aiml: { skillId: 'tech_aiml', level: 1, lastAssessedAt: '2026-08-05', assessedVia: 'self_assessment' },
      tech_cloud: { skillId: 'tech_cloud', level: 1, lastAssessedAt: '2026-08-05', assessedVia: 'self_assessment' },
      tech_apis: { skillId: 'tech_apis', level: 2, lastAssessedAt: '2026-07-25', assessedVia: 'self_assessment' },
      stat_data_quality: { skillId: 'stat_data_quality', level: 2, lastAssessedAt: '2026-06-15', assessedVia: 'self_assessment' },
      stat_national_accounts: { skillId: 'stat_national_accounts', level: 0, lastAssessedAt: '2026-08-01', assessedVia: 'self_assessment' }, // HIGH GAP
      gov_cybersecurity: { skillId: 'gov_cybersecurity', level: 2, lastAssessedAt: '2026-07-10', assessedVia: 'self_assessment' },
      gov_data_privacy: { skillId: 'gov_data_privacy', level: 2, lastAssessedAt: '2026-07-10', assessedVia: 'self_assessment' },
      gov_cloud: { skillId: 'gov_cloud', level: 2, lastAssessedAt: '2026-07-10', assessedVia: 'self_assessment' },
      mgmt_project: { skillId: 'mgmt_project', level: 2, lastAssessedAt: '2026-05-10', assessedVia: 'admin_evaluation' }
    }
  },
  usr_amitabh: {
    userId: 'usr_amitabh',
    roleId: 'role_director',
    scores: {
      stat_national_accounts: { skillId: 'stat_national_accounts', level: 3, lastAssessedAt: '2026-08-01', assessedVia: 'admin_evaluation' },
      stat_sdg_indicators: { skillId: 'stat_sdg_indicators', level: 3, lastAssessedAt: '2026-07-15', assessedVia: 'self_assessment' },
      stat_price_stats: { skillId: 'stat_price_stats', level: 2, lastAssessedAt: '2026-06-10', assessedVia: 'self_assessment' },
      stat_agri_stats: { skillId: 'stat_agri_stats', level: 2, lastAssessedAt: '2026-06-10', assessedVia: 'self_assessment' },
      tech_viz: { skillId: 'tech_viz', level: 2, lastAssessedAt: '2026-07-01', assessedVia: 'self_assessment' },
      tech_aiml: { skillId: 'tech_aiml', level: 0, lastAssessedAt: '2026-08-10', assessedVia: 'self_assessment' }, // GAP
      gov_dpi: { skillId: 'gov_dpi', level: 2, lastAssessedAt: '2026-07-01', assessedVia: 'self_assessment' },
      gov_data_privacy: { skillId: 'gov_data_privacy', level: 2, lastAssessedAt: '2026-07-01', assessedVia: 'self_assessment' },
      mgmt_leadership: { skillId: 'mgmt_leadership', level: 3, lastAssessedAt: '2026-05-01', assessedVia: 'admin_evaluation' },
      mgmt_comm: { skillId: 'mgmt_comm', level: 3, lastAssessedAt: '2026-05-01', assessedVia: 'admin_evaluation' },
      mgmt_decision: { skillId: 'mgmt_decision', level: 3, lastAssessedAt: '2026-05-01', assessedVia: 'admin_evaluation' },
      mgmt_change: { skillId: 'mgmt_change', level: 1, lastAssessedAt: '2026-08-01', assessedVia: 'self_assessment' }, // MEDIUM GAP
      mgmt_ethics: { skillId: 'mgmt_ethics', level: 3, lastAssessedAt: '2026-05-01', assessedVia: 'admin_evaluation' }
    }
  }
};

export const MOCK_COURSES: Course[] = [
  // Statistical Courses
  {
    id: 'crs_stat_01',
    title: 'Advanced Sampling Methods & Weight Calibration in Surveys',
    description: 'Comprehensive guide to stratified multi-stage sampling, non-response adjustments, and sample weight calculation for large-scale MoSPI household surveys.',
    provider: 'igot_karmayogi',
    skillId: 'stat_sampling',
    category: 'statistical',
    targetLevel: 2,
    durationHours: 12,
    url: 'https://igotkarmayogi.gov.in/',
    modulesCount: 6,
    rating: 4.8,
    enrolledCount: 1420,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80',
    tags: ['Sampling', 'Survey Methods', 'MoSPI', 'FOD']
  },
  {
    id: 'crs_stat_02',
    title: 'National Accounts Statistics: Framework, GDP & GVA Estimation',
    description: 'Learn the System of National Accounts (SNA 2008), gross value added compilation across sector economic activities, and quarterly GDP estimation methodologies.',
    provider: 'igot_karmayogi',
    skillId: 'stat_national_accounts',
    category: 'statistical',
    targetLevel: 2,
    durationHours: 18,
    url: 'https://igotkarmayogi.gov.in/',
    modulesCount: 8,
    rating: 4.9,
    enrolledCount: 980,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop&q=80',
    tags: ['GDP', 'SNA', 'National Accounts', 'NAD']
  },
  {
    id: 'crs_stat_03',
    title: 'Price Statistics Masterclass: CPI Basket & Inflation Metrics',
    description: 'Detailed analysis of Consumer Price Index (CPI) basket weighting, price data validation techniques, and monthly inflation estimation procedures.',
    provider: 'igot_karmayogi',
    skillId: 'stat_price_stats',
    category: 'statistical',
    targetLevel: 2,
    durationHours: 8,
    url: 'https://igotkarmayogi.gov.in/',
    modulesCount: 4,
    rating: 4.7,
    enrolledCount: 1150,
    thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&auto=format&fit=crop&q=80',
    tags: ['CPI', 'Inflation', 'Price Stats']
  },
  {
    id: 'crs_stat_04',
    title: 'Data Quality Assurance & Validation Protocols in Official Statistics',
    description: 'Framework for audit checks, logical verification rules, outlier identification algorithms, and non-sampling error reduction in survey datasets.',
    provider: 'nssta',
    skillId: 'stat_data_quality',
    category: 'statistical',
    targetLevel: 2,
    durationHours: 10,
    url: 'https://igotkarmayogi.gov.in/',
    modulesCount: 5,
    rating: 4.85,
    enrolledCount: 2100,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
    tags: ['Data Quality', 'Validation', 'Audit']
  },

  // Technical Courses
  {
    id: 'crs_tech_01',
    title: 'Python Essentials for Statistical Officers & Data Wrangling',
    description: 'Practical introduction to Python, Pandas, NumPy, and DataFrames for processing raw statistical survey records and automating monthly tabulations.',
    provider: 'igot_karmayogi',
    skillId: 'tech_python',
    category: 'technical',
    targetLevel: 1,
    durationHours: 15,
    url: 'https://igotkarmayogi.gov.in/',
    modulesCount: 7,
    rating: 4.9,
    enrolledCount: 3400,
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80',
    tags: ['Python', 'Pandas', 'Data Science']
  },
  {
    id: 'crs_tech_02',
    title: 'Advanced Python Automation & Machine Learning for Official Data',
    description: 'Build predictive models, automated anomaly detection for trade data, and NLP extraction pipelines using Scikit-Learn and Python.',
    provider: 'igot_karmayogi',
    skillId: 'tech_python',
    category: 'technical',
    targetLevel: 3,
    durationHours: 25,
    url: 'https://igotkarmayogi.gov.in/',
    modulesCount: 10,
    rating: 4.95,
    enrolledCount: 1850,
    thumbnailUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&auto=format&fit=crop&q=80',
    tags: ['Python', 'AI/ML', 'Advanced']
  },
  {
    id: 'crs_tech_03',
    title: 'R Programming for Survey Data Analysis & Weighting',
    description: 'Using R survey package, tidyverse, and ggplot2 to generate published tables and complex variance estimates for national sample surveys.',
    provider: 'nssta',
    skillId: 'tech_r',
    category: 'technical',
    targetLevel: 1,
    durationHours: 14,
    url: 'https://igotkarmayogi.gov.in/',
    modulesCount: 6,
    rating: 4.75,
    enrolledCount: 1620,
    thumbnailUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&auto=format&fit=crop&q=80',
    tags: ['R', 'Statistics', 'Tidyverse']
  },
  {
    id: 'crs_tech_04',
    title: 'SQL Database Management & Large Dataset Querying for Government',
    description: 'Master PostgreSQL relational database design, indexing strategies, join queries, and stored procedures for multi-gigabyte survey repositories.',
    provider: 'igot_karmayogi',
    skillId: 'tech_sql',
    category: 'technical',
    targetLevel: 2,
    durationHours: 12,
    url: 'https://igotkarmayogi.gov.in/',
    modulesCount: 5,
    rating: 4.8,
    enrolledCount: 2890,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&auto=format&fit=crop&q=80',
    tags: ['SQL', 'PostgreSQL', 'Databases']
  },
  {
    id: 'crs_tech_05',
    title: 'Interactive Statistical Dashboards with Power BI & Modern Viz',
    description: 'Transform complex statistical tables into intuitive public dashboards, interactive maps, and executive summary reports.',
    provider: 'igot_karmayogi',
    skillId: 'tech_viz',
    category: 'technical',
    targetLevel: 2,
    durationHours: 10,
    url: 'https://igotkarmayogi.gov.in/',
    modulesCount: 5,
    rating: 4.88,
    enrolledCount: 3100,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&auto=format&fit=crop&q=80',
    tags: ['Power BI', 'Dashboards', 'Visualization']
  },

  // Digital Governance & Security
  {
    id: 'crs_gov_01',
    title: 'Digital Personal Data Protection (DPDP) Act Compliance for Officials',
    description: 'Understanding legal requirements, data anonymization techniques, citizen privacy rights, and compliance procedures under the DPDP Act 2023.',
    provider: 'igot_karmayogi',
    skillId: 'gov_data_privacy',
    category: 'digital_governance',
    targetLevel: 2,
    durationHours: 6,
    url: 'https://igotkarmayogi.gov.in/',
    modulesCount: 3,
    rating: 4.92,
    enrolledCount: 5400,
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&auto=format&fit=crop&q=80',
    tags: ['DPDP Act', 'Data Privacy', 'Ethics']
  },
  {
    id: 'crs_gov_02',
    title: 'Cybersecurity Hygiene & Threat Prevention in Public Administration',
    description: 'Measures to prevent phishing, ransomware, secure official communication, and comply with CERT-In cybersecurity mandates for government staff.',
    provider: 'igot_karmayogi',
    skillId: 'gov_cybersecurity',
    category: 'digital_governance',
    targetLevel: 2,
    durationHours: 5,
    url: 'https://igotkarmayogi.gov.in/',
    modulesCount: 4,
    rating: 4.85,
    enrolledCount: 7800,
    thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&auto=format&fit=crop&q=80',
    tags: ['Cybersecurity', 'CERT-In', 'Security']
  },
  {
    id: 'crs_gov_03',
    title: 'Leveraging Digital Public Infrastructure (DPI) & India Stack',
    description: 'Overview of Aadhaar authentication, DigiLocker integration, e-Sign, and open data platforms for digital government transformation.',
    provider: 'igot_karmayogi',
    skillId: 'gov_dpi',
    category: 'digital_governance',
    targetLevel: 2,
    durationHours: 8,
    url: 'https://igotkarmayogi.gov.in/',
    modulesCount: 4,
    rating: 4.9,
    enrolledCount: 4200,
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80',
    tags: ['DPI', 'India Stack', 'Digital Govt']
  },

  // Behavioural & Management
  {
    id: 'crs_mgmt_01',
    title: 'Statistical Leadership & Managing Multi-Disciplinary Field Teams',
    description: 'Proven strategies for motivating enumerators, managing survey logistics in remote regions, resolving conflicts, and maintaining high morale.',
    provider: 'igot_karmayogi',
    skillId: 'mgmt_leadership',
    category: 'behavioural',
    targetLevel: 2,
    durationHours: 10,
    url: 'https://igotkarmayogi.gov.in/',
    modulesCount: 5,
    rating: 4.87,
    enrolledCount: 1980,
    thumbnailUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=crop&q=80',
    tags: ['Leadership', 'Management', 'Field Teams']
  },
  {
    id: 'crs_mgmt_02',
    title: 'Digital Transformation & Change Management in Public Sector',
    description: 'Leading non-disruptive transitions from pen-and-paper surveys to CAPI digital tablets, managing resistance, and building digital culture.',
    provider: 'nssta',
    skillId: 'mgmt_change',
    category: 'behavioural',
    targetLevel: 2,
    durationHours: 8,
    url: 'https://igotkarmayogi.gov.in/',
    modulesCount: 4,
    rating: 4.78,
    enrolledCount: 1450,
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80',
    tags: ['Change Management', 'Digital Shift']
  }
];



export const MOCK_SAMPLE_MANUALS = [
  {
    id: 'doc_stat_sampling',
    title: 'MoSPI National Sample Survey (NSS) Sampling Guidelines 2025.pdf',
    category: 'Statistical',
    skillId: 'stat_sampling',
    fileSize: '2.4 MB',
    pages: 18,
    description: 'Official protocol document detailing multi-stage stratified sampling, selection of first stage units (FSUs), and weight calculations.'
  },
  {
    id: 'doc_python_guide',
    title: 'MoSPI Computer Centre Python Data Wrangling Standard Manual.pdf',
    category: 'Technical',
    skillId: 'tech_python',
    fileSize: '4.1 MB',
    pages: 32,
    description: 'Technical standard operating procedure for clean data ingestion, missing value imputation, and automated reporting in Python.'
  },
  {
    id: 'doc_national_accounts',
    title: 'System of National Accounts (SNA) 2008 Implementation Handbook.pdf',
    category: 'Statistical',
    skillId: 'stat_national_accounts',
    fileSize: '3.8 MB',
    pages: 25,
    description: 'Guidance note on Gross Value Added (GVA) compilation, supply-use tables (SUT), and sector-wise economic indicator estimation.'
  }
];

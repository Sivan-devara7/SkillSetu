import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Quiz, MCQQuestion, QuizAttempt, SkillLevel } from '../types';

import { SKILL_MAP } from '../data/taxonomy';

// Pre-seeded AI Fallback Quiz Database for Instant Offline Demo
const FALLBACK_QUIZZES: Record<string, MCQQuestion[]> = {
  stat_sampling: [
    {
      id: 'q_samp_1',
      question: 'In a two-stage stratified sampling design for rural household surveys, what typically constitutes the First Stage Unit (FSU)?',
      options: ['Individual Household', 'Gram Panchayat / Census Village', 'District Headquarters', 'Hamlet Group'],
      correctOptionIndex: 1,
      explanation: 'In MoSPI NSS rounds, Census Villages (or UBlock in urban areas) serve as First Stage Units (FSUs), while households serve as Second Stage Units (SSUs).',
      subtopic: 'Sampling Frame & Unit Selection',
      mappedSkillId: 'stat_sampling'
    },
    {
      id: 'q_samp_2',
      question: 'Which sampling design ensures that small or rare population sub-groups are adequately represented in survey estimates?',
      options: ['Simple Random Sampling', 'Stratified Random Sampling', 'Systematic Sampling', 'Convenience Sampling'],
      correctOptionIndex: 1,
      explanation: 'Stratified sampling divides the population into non-overlapping homogeneous strata, ensuring representation across rare or critical sub-domains.',
      subtopic: 'Stratification Strategy',
      mappedSkillId: 'stat_sampling'
    },
    {
      id: 'q_samp_3',
      question: 'What is the primary function of Weight Calibration (Multiplier) in MoSPI survey estimation pipelines?',
      options: [
        'To reduce non-response rate to zero',
        'To inflate sample totals to population level estimates accounting for selection probabilities',
        'To eliminate survey measurement error',
        'To standardize questionnaire length'
      ],
      correctOptionIndex: 1,
      explanation: 'Multipliers/weights inverse to selection probability convert sample aggregates into unbiased estimate of total population parameters.',
      subtopic: 'Weight Calibration & Multipliers',
      mappedSkillId: 'stat_sampling'
    },
    {
      id: 'q_samp_4',
      question: 'When is Probability Proportional to Size (PPS) sampling preferred over SRS for village selection?',
      options: [
        'When all villages have identical population size',
        'When village sizes vary significantly and larger villages have higher impact on estimates',
        'When field budget is unlimited',
        'Only for urban surveys'
      ],
      correctOptionIndex: 1,
      explanation: 'PPS sampling selects units with probability proportional to their size (e.g. population/households), reducing sampling variance.',
      subtopic: 'PPS Sampling Methodology',
      mappedSkillId: 'stat_sampling'
    },
    {
      id: 'q_samp_5',
      question: 'How is non-response bias mitigated during the data processing phase of NSS rounds?',
      options: [
        'By discarding the entire stratum',
        'By re-weighting responding units within the same homogeneous sub-stratum',
        'By doubling the weights of non-responding households',
        'By substituting with neighboring households without documentation'
      ],
      correctOptionIndex: 1,
      explanation: 'Non-response adjustment factors reallocate weights of non-responding SSUs across responding SSUs within the same sub-stratum.',
      subtopic: 'Non-Response Adjustment',
      mappedSkillId: 'stat_sampling'
    }
  ],

  tech_python: [
    {
      id: 'q_py_1',
      question: 'Which Pandas method is best suited for merging two statistical datasets on common key columns like "state_code" and "district_code"?',
      options: ['pd.concat()', 'pd.merge()', 'pd.append()', 'df.join_records()'],
      correctOptionIndex: 1,
      explanation: '`pd.merge()` performs SQL-style relational database joins on key columns.',
      subtopic: 'Data Merging & Ingestion',
      mappedSkillId: 'tech_python'
    },
    {
      id: 'q_py_2',
      question: 'How do you calculate weighted mean of CPI prices across items using Pandas and NumPy?',
      options: ['df.mean()', 'np.average(df["price"], weights=df["weight"])', 'df["price"].sum() / len(df)', 'df.groupby("item").mean()'],
      correctOptionIndex: 1,
      explanation: '`np.average()` accepts a `weights` parameter, making it the standard function for computing weighted means in statistical analytics.',
      subtopic: 'Statistical Aggregation',
      mappedSkillId: 'tech_python'
    },
    {
      id: 'q_py_3',
      question: 'Which library is recommended for detecting statistical outliers in survey distributions using Interquartile Range (IQR)?',
      options: ['Scipy / NumPy', 'Flask', 'Requests', 'BeautifulSoup'],
      correctOptionIndex: 0,
      explanation: 'NumPy and SciPy provide quantile methods (`np.percentile`) for computing Q1, Q3, and IQR bounds for data cleaning.',
      subtopic: 'Data Cleaning & Imputation',
      mappedSkillId: 'tech_python'
    },
    {
      id: 'q_py_4',
      question: 'What is the primary advantage of using Vectorized operations in Pandas over for-loops for multi-million row survey files?',
      options: ['Requires less disk space', 'Executes C-optimized SIMD instructions, running 100x faster than Python loops', 'Prevents memory leaks', 'Auto-formats Excel output'],
      correctOptionIndex: 1,
      explanation: 'Pandas leverage vectorized C arrays under NumPy, performing batch operations without interpreter loop overhead.',
      subtopic: 'Performance Optimization',
      mappedSkillId: 'tech_python'
    },
    {
      id: 'q_py_5',
      question: 'How do you export multi-tab statistical summaries into a single Excel report in Python?',
      options: ['df.to_csv()', 'pd.ExcelWriter() with to_excel()', 'open() with write()', 'json.dump()'],
      correctOptionIndex: 1,
      explanation: '`pd.ExcelWriter` context manager allows writing multiple DataFrames into separate Excel sheets within one workbook.',
      subtopic: 'Automated Dissemination',
      mappedSkillId: 'tech_python'
    }
  ],

  stat_national_accounts: [
    {
      id: 'q_na_1',
      question: 'In GDP compilation under SNA 2008 framework, what is the relation between GDP at Market Prices and GVA at Basic Prices?',
      options: [
        'GDP = GVA + Product Taxes - Product Subsidies',
        'GDP = GVA - Product Taxes + Product Subsidies',
        'GDP = GVA × Inflation Index',
        'GDP = Net National Product'
      ],
      correctOptionIndex: 0,
      explanation: 'GDP at Market Prices is derived by adding Net Product Taxes (Product Taxes minus Product Subsidies) to Gross Value Added (GVA) at Basic Prices.',
      subtopic: 'GDP & GVA Accounting',
      mappedSkillId: 'stat_national_accounts'
    },
    {
      id: 'q_na_2',
      question: 'Which table format provides a complete reconciliation between production accounts and commodity balances in National Accounts?',
      options: ['Input-Output Table', 'Supply and Use Tables (SUT)', 'Financial Flow Matrix', 'Balance of Payments'],
      correctOptionIndex: 1,
      explanation: 'Supply and Use Tables (SUT) show the origin of goods and services (domestic output or imports) and their final destination (intermediate consumption, final consumption, exports).',
      subtopic: 'Supply-Use Tables (SUT)',
      mappedSkillId: 'stat_national_accounts'
    },
    {
      id: 'q_na_3',
      question: 'What is the base year currently used for India\'s National Accounts Series as compiled by Central Statistics Office (CSO)?',
      options: ['2004-05', '2011-12', '2017-18', '2020-21'],
      correctOptionIndex: 1,
      explanation: 'The current base year for India\'s GDP national accounts series is 2011-12 (with base revisions periodically undertaken by MoSPI).',
      subtopic: 'Base Year & Index Revision',
      mappedSkillId: 'stat_national_accounts'
    },
    {
      id: 'q_na_4',
      question: 'How is Consumption of Fixed Capital (CFC) treated when moving from Gross Value Added to Net Value Added?',
      options: [
        'Added to GVA',
        'Subtracted from GVA (NVA = GVA - CFC)',
        'Ignored in national accounting',
        'Multiplied by tax rate'
      ],
      correctOptionIndex: 1,
      explanation: 'NVA (Net Value Added) equals GVA minus Consumption of Fixed Capital (economic depreciation of physical assets).',
      subtopic: 'Capital Stocks & Depreciation',
      mappedSkillId: 'stat_national_accounts'
    },
    {
      id: 'q_na_5',
      question: 'Which sector indicator is predominantly used to benchmark informal sector GVA growth in quarterly GDP estimates?',
      options: [
        'Annual Survey of Industries (ASI)',
        'Periodic Labour Force Survey (PLFS) & High Frequency Indicators (GST/Credit/Cargo)',
        'Stock Exchange Index',
        'Customs Import Duty Data'
      ],
      correctOptionIndex: 1,
      explanation: 'High-frequency volume indicators combined with PLFS labour data are used to proxy unorganized sector value added between quinquennial benchmark surveys.',
      subtopic: 'Informal Sector Benchmarking',
      mappedSkillId: 'stat_national_accounts'
    }
  ]
};

export async function generateQuizFromDocument(
  docTitle: string,
  docContentText: string,
  targetSkillId: string,
  apiKey?: string
): Promise<Quiz> {
  const skill = SKILL_MAP.get(targetSkillId);
  const skillName = skill ? skill.name : 'Statistical Competency';

  // If Gemini API key is provided, try real LLM generation
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `
You are an expert examiner for India's Ministry of Statistics & Programme Implementation (MoSPI).
Generate a 5-question multiple choice quiz (MCQ) based on the following text content regarding "${skillName}".

Target Document Title: "${docTitle}"
Document Content Snippet: "${docContentText.substring(0, 3000)}"

Return ONLY a raw JSON array of 5 objects matching this strict format:
[
  {
    "id": "q1",
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctOptionIndex": 0,
    "explanation": "Detailed explanation why Option A is correct.",
    "subtopic": "Subtopic Name",
    "mappedSkillId": "${targetSkillId}"
  }
]
No markdown wrapping or extra text. Pure JSON array only.
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const questions: MCQQuestion[] = JSON.parse(cleanedText);

      return {
        id: `quiz_${Date.now()}`,
        documentTitle: docTitle,
        targetSkillId,
        createdAt: new Date().toISOString().split('T')[0],
        questions,
        totalQuestions: questions.length
      };
    } catch (err) {
      console.warn('Gemini API call failed or rate-limited. Falling back to offline AI engine:', err);
    }
  }

  // Fallback Engine: Select from pre-seeded or dynamic generator
  const fallbackQuestions = FALLBACK_QUIZZES[targetSkillId] || FALLBACK_QUIZZES['stat_sampling'];

  return {
    id: `quiz_${Date.now()}`,
    documentTitle: docTitle,
    targetSkillId,
    createdAt: new Date().toISOString().split('T')[0],
    questions: fallbackQuestions,
    totalQuestions: fallbackQuestions.length
  };
}

export function evaluateQuizAttempt(
  quiz: Quiz,
  userId: string,
  userAnswers: Record<string, number>
): { attempt: QuizAttempt; newSkillLevel: SkillLevel; levelUpEarned: boolean } {
  let correctCount = 0;
  const topicStats: Record<string, { correct: number; total: number }> = {};

  quiz.questions.forEach(q => {
    const selected = userAnswers[q.id];
    const isCorrect = selected === q.correctOptionIndex;
    if (isCorrect) correctCount++;

    if (!topicStats[q.subtopic]) {
      topicStats[q.subtopic] = { correct: 0, total: 0 };
    }
    topicStats[q.subtopic].total++;
    if (isCorrect) topicStats[q.subtopic].correct++;
  });

  const scorePercent = Math.round((correctCount / quiz.totalQuestions) * 100);
  const passed = scorePercent >= 70;

  const topicScores: Record<string, { correct: number; total: number; scorePercent: number }> = {};
  Object.entries(topicStats).forEach(([topic, stat]) => {
    topicScores[topic] = {
      correct: stat.correct,
      total: stat.total,
      scorePercent: Math.round((stat.correct / stat.total) * 100)
    };
  });

  const attempt: QuizAttempt = {
    id: `att_${Date.now()}`,
    quizId: quiz.id,
    userId,
    takenAt: new Date().toISOString(),
    answers: userAnswers,
    scorePercent,
    passed,
    topicScores
  };

  // Level progression rule:
  // Score >= 80%: level up +1
  // Score >= 60%: maintain or bump to 1 if 0
  let newSkillLevel: SkillLevel = 1;
  let levelUpEarned = false;

  if (scorePercent >= 80) {
    newSkillLevel = 3;
    levelUpEarned = true;
  } else if (scorePercent >= 60) {
    newSkillLevel = 2;
  } else {
    newSkillLevel = 1;
  }

  return { attempt, newSkillLevel, levelUpEarned };
}

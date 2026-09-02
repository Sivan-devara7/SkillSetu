import React from 'react';
import confetti from 'canvas-confetti';
import type { Quiz, QuizAttempt, SkillLevel } from '../../types';
import { generateQuizFromDocument, evaluateQuizAttempt } from '../../services/aiQuizEngine';
import { MOCK_SAMPLE_MANUALS } from '../../data/mockData';
import { MOSPI_SKILLS } from '../../data/taxonomy';
import { FileText, Upload, CheckCircle2, XCircle, Award, ArrowRight, RefreshCw, BookOpen } from 'lucide-react';

interface AIQuizStudioProps {
  userId: string;
  apiKey: string;
  onSkillLevelUp: (skillId: string) => void;
}

export const AIQuizStudio: React.FC<AIQuizStudioProps> = ({ userId, apiKey, onSkillLevelUp }) => {
  const [selectedDocId, setSelectedDocId] = React.useState<string>(MOCK_SAMPLE_MANUALS[0].id);
  const [targetSkillId, setTargetSkillId] = React.useState<string>(MOCK_SAMPLE_MANUALS[0].skillId);
  const [customText, setCustomText] = React.useState<string>('');
  const [customTitle, setCustomTitle] = React.useState<string>('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generationStep, setGenerationStep] = React.useState<string>('');

  const [activeQuiz, setActiveQuiz] = React.useState<Quiz | null>(null);
  const [userAnswers, setUserAnswers] = React.useState<Record<string, number>>({});
  const [attemptResult, setAttemptResult] = React.useState<{ attempt: QuizAttempt; newSkillLevel: SkillLevel; levelUpEarned: boolean } | null>(null);

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    setAttemptResult(null);
    setUserAnswers({});

    // Loading steps
    setGenerationStep('Reading selected document content...');
    await new Promise(r => setTimeout(r, 400));

    setGenerationStep('Picking relevant topics from the manual...');
    await new Promise(r => setTimeout(r, 500));

    setGenerationStep('Generating 5 multiple choice questions...');
    await new Promise(r => setTimeout(r, 450));

    const selectedDoc = MOCK_SAMPLE_MANUALS.find(d => d.id === selectedDocId);
    const docTitle = customTitle || selectedDoc?.title || 'MoSPI Handbook.pdf';
    const textContent = customText || selectedDoc?.description || 'MoSPI sampling and statistical guidelines.';

    const quiz = await generateQuizFromDocument(docTitle, textContent, targetSkillId, apiKey);
    setActiveQuiz(quiz);
    setIsGenerating(false);
  };

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;

    const result = evaluateQuizAttempt(activeQuiz, userId, userAnswers);
    setAttemptResult(result);

    if (result.levelUpEarned) {
      onSkillLevelUp(activeQuiz.targetSkillId);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="eng-card p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              Competency Assessment Quiz
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/15 text-indigo-500 border border-indigo-500/30">
              Practice & Self-Test
            </span>
          </div>
          <p className="text-xs opacity-75 mt-1 font-medium">
            Generate practice quizzes based on official MoSPI manuals to test your knowledge on key topics.
          </p>
        </div>
      </div>

      {!activeQuiz ? (
        /* Quiz Generation Controls */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Pre-seeded Manuals */}
          <div className="lg:col-span-7 eng-card p-6 lg:p-8 space-y-4">
            <h2 className="font-bold text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              Select MoSPI Statistical Manual
            </h2>
            <p className="text-xs opacity-70 font-medium">Choose from official National Statistical Systems Training Academy (NSSTA) handbooks:</p>

            <div className="space-y-3">
              {MOCK_SAMPLE_MANUALS.map(manual => (
                <div
                  key={manual.id}
                  onClick={() => {
                    setSelectedDocId(manual.id);
                    setTargetSkillId(manual.skillId);
                    setCustomTitle('');
                    setCustomText('');
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedDocId === manual.id && !customTitle
                      ? 'bg-indigo-500/10 border-indigo-500 font-semibold'
                      : 'eng-card opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-indigo-500">{manual.title}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-500/10">{manual.fileSize}</span>
                  </div>
                  <p className="text-xs opacity-75 mt-1 font-medium">{manual.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Document Upload / Text Input */}
          <div className="lg:col-span-5 eng-card p-6 lg:p-8 space-y-4">
            <h2 className="font-bold text-base flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-500" />
              Or Custom Excerpt / Manual Note
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold block mb-1">Target Competency</label>
                <select
                  value={targetSkillId}
                  onChange={(e) => setTargetSkillId(e.target.value)}
                  className="w-full eng-input rounded-xl px-3 py-2 text-xs font-medium"
                >
                  {MOSPI_SKILLS.map(skill => (
                    <option key={skill.id} value={skill.id} className="bg-slate-900 text-white">{skill.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Document Name</label>
                <input
                  type="text"
                  placeholder="e.g. CPI Methodology Note 2024.pdf"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full eng-input rounded-xl px-3 py-2 text-xs font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Paste Text Excerpt</label>
                <textarea
                  rows={4}
                  placeholder="Paste manual paragraph or notes here..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full eng-input rounded-xl p-3 text-xs font-medium"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateQuiz}
              disabled={isGenerating}
              className="w-full eng-btn-primary text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Generating Questions...</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4 text-white" />
                  <span>Generate Quiz</span>
                </>
              )}
            </button>

            {isGenerating && (
              <div className="p-3.5 rounded-xl bg-slate-500/10 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <p className="text-xs text-indigo-500 font-mono font-semibold animate-pulse">{generationStep}</p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full w-3/4 animate-pulse rounded-full" />
                </div>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Interactive Quiz Player & Results */
        <div className="eng-card p-6 lg:p-8 space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono text-indigo-500 font-bold uppercase tracking-wider">ACTIVE ASSESSMENT</span>
              <h2 className="text-lg font-bold">{activeQuiz.documentTitle}</h2>
            </div>
            <button
              onClick={() => setActiveQuiz(null)}
              className="px-3.5 py-1.5 rounded-xl eng-card hover:border-slate-400 text-xs font-semibold transition-all cursor-pointer"
            >
              Exit Quiz
            </button>
          </div>

          {!attemptResult ? (
            /* Quiz Questions Form */
            <div className="space-y-6">
              {activeQuiz.questions.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-xl bg-slate-500/5 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-indigo-500/15 text-indigo-500">
                      Question {idx + 1} of {activeQuiz.totalQuestions}
                    </span>
                    <span className="text-[11px] opacity-75 font-medium">{q.subtopic}</span>
                  </div>

                  <p className="font-bold text-sm">{q.question}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleAnswerSelect(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white font-bold shadow-sm'
                              : 'eng-card opacity-80 hover:opacity-100'
                          }`}
                        >
                          <span className="font-mono font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(userAnswers).length < activeQuiz.totalQuestions}
                  className={`px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                    Object.keys(userAnswers).length === activeQuiz.totalQuestions
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                      : 'eng-card opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span>Submit Quiz Answers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Quiz Evaluation Report */
            <div className="space-y-6">
              
              <div className="p-6 rounded-xl bg-slate-500/5 border border-slate-200 dark:border-slate-800 text-center space-y-3">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold">Quiz Evaluation Summary</h3>
                <div className="text-3xl font-black text-emerald-500">{attemptResult.attempt.scorePercent}%</div>

                {attemptResult.levelUpEarned ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 max-w-md mx-auto text-xs text-emerald-500 font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span><strong>Competency Level Upgraded!</strong> Skill profile updated to <strong>Advanced (Level 3)</strong>.</span>
                  </div>
                ) : (
                  <p className="text-xs opacity-75 font-medium">Review the itemized feedback below to strengthen target topics.</p>
                )}
              </div>

              {/* Subtopic Breakdown */}
              <div className="p-4 rounded-xl bg-slate-500/5 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase opacity-70">Subtopic Accuracy breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {Object.entries(attemptResult.attempt.topicScores).map(([topic, stat]) => (
                    <div key={topic} className="p-2.5 rounded-lg bg-slate-900/10 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-semibold">{topic}</span>
                      <span className={`text-xs font-mono font-bold ${stat.scorePercent >= 70 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {stat.correct} / {stat.total} ({stat.scorePercent}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Explanations */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm">Question Feedback</h4>
                {activeQuiz.questions.map((q, idx) => {
                  const userAns = userAnswers[q.id];
                  const isCorrect = userAns === q.correctOptionIndex;

                  return (
                    <div key={q.id} className={`p-4 rounded-xl border space-y-2 ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-rose-500/5 border-rose-500/30'}`}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold">Q{idx + 1}: {q.question}</span>
                        {isCorrect ? (
                          <span className="text-emerald-500 flex items-center gap-1 font-bold"><CheckCircle2 className="w-4 h-4" /> Correct</span>
                        ) : (
                          <span className="text-rose-500 flex items-center gap-1 font-bold"><XCircle className="w-4 h-4" /> Incorrect</span>
                        )}
                      </div>

                      <div className="text-xs space-y-1 pt-1 font-medium">
                        <p>Your Selection: <strong className={isCorrect ? 'text-emerald-500' : 'text-rose-500'}>{q.options[userAns]}</strong></p>
                        {!isCorrect && (
                          <p>Correct Option: <strong className="text-emerald-500">{q.options[q.correctOptionIndex]}</strong></p>
                        )}
                        <div className="p-2.5 rounded-lg bg-slate-900/10 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 mt-2 text-[11px] leading-relaxed">
                          <strong className="text-indigo-500 block mb-0.5">Explanation:</strong>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveQuiz(null)}
                  className="px-5 py-2.5 rounded-xl eng-btn-primary text-white font-bold text-xs cursor-pointer"
                >
                  Take Another Quiz
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};

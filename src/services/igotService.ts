import type { Course, SkillGapItem, SkillLevel } from '../types';

import { MOCK_COURSES } from '../data/mockData';

export interface CourseProvider {
  getCourses(): Promise<Course[]>;
  getCourseById(courseId: string): Promise<Course | null>;
  searchCourses(query: string): Promise<Course[]>;
  getRecommendationsForGaps(gaps: SkillGapItem[]): Promise<RecommendedCourse[]>;
}

export interface RecommendedCourse extends Course {
  recommendationScore: number; // 0 - 100
  targetGapSeverity: 'high' | 'medium' | 'low';
  recommendationReason: string;
}

export class MockIGotCourseProvider implements CourseProvider {
  private courses: Course[] = MOCK_COURSES;

  async getCourses(): Promise<Course[]> {
    return [...this.courses];
  }

  async getCourseById(courseId: string): Promise<Course | null> {
    return this.courses.find(c => c.id === courseId) || null;
  }

  async searchCourses(query: string): Promise<Course[]> {
    const q = query.toLowerCase();
    return this.courses.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.description.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  async getRecommendationsForGaps(gaps: SkillGapItem[]): Promise<RecommendedCourse[]> {
    // Filter to skills that actually have a gap (gapDelta > 0)
    const activeGaps = gaps.filter(g => g.gapDelta > 0);
    if (activeGaps.length === 0) return [];

    const recommendations: RecommendedCourse[] = [];

    activeGaps.forEach(gap => {
      // Find courses matching this skill
      const matchingCourses = this.courses.filter(c => c.skillId === gap.skillId);

      matchingCourses.forEach(course => {
        let score = 50; // base score

        // Gap severity weight
        if (gap.severity === 'high') score += 35;
        else if (gap.severity === 'medium') score += 25;
        else if (gap.severity === 'low') score += 15;

        // Level match check (ideal course is current level + 1)
        const idealLevel: SkillLevel = Math.min(3, gap.currentLevel + 1) as SkillLevel;
        if (course.targetLevel === idealLevel) score += 15;
        else if (course.targetLevel === gap.requiredLevel) score += 10;

        // Rating boost
        score += (course.rating - 4.5) * 10;

        let reason = '';
        if (gap.severity === 'high') {
          reason = `Critical Skill Gap: High priority for ${gap.skillName} (Current: L${gap.currentLevel} → Required: L${gap.requiredLevel})`;
        } else if (gap.severity === 'medium') {
          reason = `Targeted Upskilling: Required for ${gap.skillName} progression`;
        } else {
          reason = `Skill Refinement: Perfect fit for ${gap.skillName}`;
        }

        recommendations.push({
          ...course,
          recommendationScore: Math.min(99, Math.round(score)),
          targetGapSeverity: gap.severity === 'none' ? 'low' : gap.severity,
          recommendationReason: reason
        });
      });
    });

    // Sort by recommendation score descending
    return recommendations.sort((a, b) => b.recommendationScore - a.recommendationScore);
  }
}

export const defaultCourseProvider: CourseProvider = new MockIGotCourseProvider();

export interface DayActivity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  platforms: {
    github: number;
    leetcode: number;
    codeforces: string;
  };
}

export interface ActivityStats {
  totalActivity: number;
  currentStreak: number;
  bestStreak: number;
  activeDays: number;
  platformsCount: number;
  peakMonth: string;
  score: number;
  consistency: string;
  githubTotal: number;
  leetcodeTotal: number;
  codeforcesTotal: number;
}

export interface ActivityData {
  days: DayActivity[];
  stats: ActivityStats;
}

export class GeneratedActivityProvider {
  private static cachedData: ActivityData | null = null;

  static async fetchActivity(): Promise<ActivityData> {
    if (this.cachedData) return this.cachedData;

    // Simulate network delay for provider pattern
    await new Promise(resolve => setTimeout(resolve, 300));

    const days: DayActivity[] = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 364);

    let currentStreak = 0;
    let bestStreak = 0;
    let totalActivity = 0;
    let activeDays = 0;
    
    let githubTotal = 0;
    let leetcodeTotal = 0;
    let codeforcesTotal = 0;

    const monthCounts: Record<string, number> = {};

    let inHackathon = false;
    let hackathonDaysLeft = 0;
    
    let inBurnout = false;
    let burnoutDaysLeft = 0;

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0];
      const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday
      const monthStr = d.toLocaleString('default', { month: 'long' });

      // Realistic generation logic
      let baseProb = 0.65; // 65% chance of activity on a normal day
      
      // Weekends slightly lower, except for contests
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        baseProb = 0.45;
      }
      
      // Random events
      if (!inHackathon && !inBurnout && Math.random() < 0.015) {
        inHackathon = true;
        hackathonDaysLeft = Math.floor(Math.random() * 3) + 2; // 2-4 days
      }
      
      if (!inHackathon && !inBurnout && Math.random() < 0.02) {
        inBurnout = true;
        burnoutDaysLeft = Math.floor(Math.random() * 4) + 1; // 1-4 days
      }

      let github = 0;
      let leetcode = 0;
      let codeforces = '';
      let codeforcesPoints = 0;
      
      if (inBurnout) {
        // Very low activity
        if (Math.random() < 0.1) github = 1;
        burnoutDaysLeft--;
        if (burnoutDaysLeft <= 0) inBurnout = false;
      } else if (inHackathon) {
        // High activity
        github = Math.floor(Math.random() * 12) + 5;
        if (Math.random() < 0.3) leetcode = Math.floor(Math.random() * 3) + 1;
        hackathonDaysLeft--;
        if (hackathonDaysLeft <= 0) inHackathon = false;
      } else {
        // Normal day
        if (Math.random() < baseProb) {
          if (Math.random() < 0.75) github = Math.floor(Math.random() * 6) + 1;
          if (Math.random() < 0.6) leetcode = Math.floor(Math.random() * 5) + 1;
        }
      }

      // Codeforces mostly on weekends or occasionally
      if ((dayOfWeek === 0 || dayOfWeek === 6 || Math.random() < 0.1) && !inBurnout) {
        if (Math.random() < 0.2) {
          codeforces = Math.random() < 0.6 ? 'Contest' : 'Practice';
          codeforcesPoints = codeforces === 'Contest' ? 5 : 2;
        }
      }

      const total = github + leetcode + codeforcesPoints;
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      
      if (total > 0) {
        activeDays++;
        totalActivity += total;
        githubTotal += github;
        leetcodeTotal += leetcode;
        if (codeforces) codeforcesTotal++;

        currentStreak++;
        if (currentStreak > bestStreak) bestStreak = currentStreak;
        
        monthCounts[monthStr] = (monthCounts[monthStr] || 0) + total;
        
        if (total >= 12) level = 4;
        else if (total >= 7) level = 3;
        else if (total >= 3) level = 2;
        else level = 1;
      } else {
        currentStreak = 0;
      }

      days.push({
        date: dateString,
        count: total,
        level,
        platforms: { github, leetcode, codeforces }
      });
    }

    // Determine Peak Month
    let peakMonth = 'January';
    let maxMonthCount = 0;
    for (const [m, c] of Object.entries(monthCounts)) {
      if (c > maxMonthCount) {
        maxMonthCount = c;
        peakMonth = m;
      }
    }

    // Calculate Consistency & Score
    const activeRatio = activeDays / 365;
    let consistency = 'Average';
    if (activeRatio > 0.8) consistency = 'Exceptional';
    else if (activeRatio > 0.6) consistency = 'Excellent';
    else if (activeRatio > 0.4) consistency = 'Good';

    // Base score on active ratio, streaks, and total output. Max 99.
    const scoreVal = Math.min(
      Math.round((activeRatio * 55) + (Math.min(bestStreak, 40) * 0.6) + (Math.min(totalActivity, 1500) / 1500 * 20)), 
      98
    );

    this.cachedData = {
      days,
      stats: {
        totalActivity,
        currentStreak,
        bestStreak,
        activeDays,
        platformsCount: 3,
        peakMonth,
        score: Math.max(scoreVal, 75), // Floor it at 75 for positive vibes
        consistency,
        githubTotal,
        leetcodeTotal,
        codeforcesTotal
      }
    };

    return this.cachedData;
  }
}

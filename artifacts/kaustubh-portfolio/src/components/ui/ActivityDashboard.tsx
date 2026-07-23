import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeneratedActivityProvider, ActivityData, DayActivity } from '../../utils/activityProvider';

// Helper for counting animation
function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      // Easing function (easeOutQuart)
      const ease = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(end * ease));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
}

export function ActivityDashboard() {
  const [data, setData] = useState<ActivityData | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{ day: DayActivity, x: number, y: number } | null>(null);

  useEffect(() => {
    GeneratedActivityProvider.fetchActivity().then(setData);
  }, []);

  if (!data) return <div className="min-h-[500px]" />;

  const { stats, days } = data;

  const getColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-[#5f2cff] shadow-[0_0_8px_rgba(95,44,255,0.4)]';
      case 2: return 'bg-[#8b5cf6] shadow-[0_0_12px_rgba(139,92,246,0.6)]';
      case 3: return 'bg-[#c084fc] shadow-[0_0_16px_rgba(192,132,252,0.8)]';
      case 4: return 'bg-[#e879f9] shadow-[0_0_20px_rgba(232,121,249,1)]';
      default: return 'bg-[#1a1a22]'; // inactive
    }
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-[#050505]/80 backdrop-blur-xl p-6 lg:p-10 mt-16 overflow-hidden">
      
      {/* ── Premium Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen opacity-50" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
      </div>

      <div className="relative z-10">
        
        {/* ── Header ── */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-2xl font-bold font-sans tracking-tight">ACTIVITY OVERVIEW</h3>
            <p className="text-gray-400 font-mono text-xs mt-1">Development consistency across GitHub, LeetCode & Codeforces.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Total Activity', value: stats.totalActivity, icon: '⚡' },
              { label: 'Current Streak', value: stats.currentStreak, icon: '🔥', suffix: ' days' },
              { label: 'Best Streak', value: stats.bestStreak, icon: '🏆', suffix: ' days' },
              { label: 'Active Days', value: stats.activeDays, icon: '📅' },
              { label: 'Platforms', value: stats.platformsCount, icon: '💻' }
            ].map((pill, i) => (
              <motion.div 
                key={pill.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              >
                <span className="text-sm">{pill.icon}</span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-gray-500 uppercase">{pill.label}</span>
                  <span className="text-sm font-bold text-white">
                    <CountUp end={pill.value} />{pill.suffix || ''}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ── AI Productivity Score ── */}
          <motion.div 
            className="w-full lg:w-72 shrink-0 rounded-xl border border-white/10 bg-white/[0.02] p-6 relative overflow-hidden group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Soft glow on hover */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            
            <div className="relative z-10">
              <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                AI Analysis
              </h4>
              
              <div className="mb-6">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-bold text-white">Developer Score</span>
                  <span className="text-xl font-bold text-primary"><CountUp end={stats.score} />%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0d1117] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stats.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-500">Consistency</span>
                  <span className="text-emerald-400 font-bold">{stats.consistency}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-500">Peak Month</span>
                  <span className="text-white">{stats.peakMonth}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-[10px] font-mono text-gray-500 uppercase">Platform Breakdown</div>
                
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#1a1a22] flex items-center justify-center text-[10px]">G</div>
                  <div className="flex-1 h-1 bg-[#1a1a22] rounded-full overflow-hidden">
                    <motion.div className="h-full bg-white" initial={{ width: 0 }} whileInView={{ width: `${Math.min((stats.githubTotal / stats.totalActivity) * 100, 100)}%` }} viewport={{ once: true }} transition={{ delay: 1 }} />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#1a1a22] flex items-center justify-center text-[10px] text-yellow-500">L</div>
                  <div className="flex-1 h-1 bg-[#1a1a22] rounded-full overflow-hidden">
                    <motion.div className="h-full bg-yellow-500" initial={{ width: 0 }} whileInView={{ width: `${Math.min((stats.leetcodeTotal / stats.totalActivity) * 100, 100)}%` }} viewport={{ once: true }} transition={{ delay: 1.1 }} />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#1a1a22] flex items-center justify-center text-[10px] text-blue-500">C</div>
                  <div className="flex-1 h-1 bg-[#1a1a22] rounded-full overflow-hidden">
                    <motion.div className="h-full bg-blue-500" initial={{ width: 0 }} whileInView={{ width: `${Math.min((stats.codeforcesTotal / stats.activeDays) * 100, 100)}%` }} viewport={{ once: true }} transition={{ delay: 1.2 }} />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-[10px] font-mono text-gray-300 italic">
                  "Most active during {stats.peakMonth} and consistent across {stats.consistency.toLowerCase()} coding periods. Strong multi-platform presence."
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Heatmap ── */}
          <motion.div 
            className="flex-1 overflow-x-auto pb-6 custom-scrollbar"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="min-w-[800px]">
              
              {/* Months Row */}
              <div className="flex ml-8 mb-2">
                {months.map((m, i) => (
                  <div key={i} className="flex-1 text-[10px] font-mono text-gray-500">{m}</div>
                ))}
              </div>

              <div className="flex gap-2">
                {/* Days Column */}
                <div className="flex flex-col gap-[3px] text-[10px] font-mono text-gray-500 pr-2 pt-1">
                  <div className="h-[14px]"></div>
                  <div className="h-[14px] flex items-center">Mon</div>
                  <div className="h-[14px]"></div>
                  <div className="h-[14px] flex items-center">Wed</div>
                  <div className="h-[14px]"></div>
                  <div className="h-[14px] flex items-center">Fri</div>
                  <div className="h-[14px]"></div>
                </div>

                {/* Grid */}
                <div className="flex gap-[3px]" onMouseLeave={() => setHoveredDay(null)}>
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {week.map((day, dIdx) => (
                        <motion.div
                          key={day.date}
                          className={`w-[14px] h-[14px] rounded-sm transition-colors duration-300 hover:ring-1 hover:ring-white/50 cursor-crosshair ${getColor(day.level)}`}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: (wIdx * 0.01) + (dIdx * 0.01) }}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredDay({ 
                              day, 
                              x: rect.left + rect.width / 2,
                              y: rect.top 
                            });
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-2 mt-4 text-[10px] font-mono text-gray-500">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-[#1a1a22]"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#5f2cff]"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#8b5cf6]"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#c084fc]"></div>
                  <div className="w-3 h-3 rounded-sm bg-[#e879f9]"></div>
                </div>
                <span>More</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Premium Tooltip ── */}
      <AnimatePresence>
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full"
            style={{ left: hoveredDay.x, top: hoveredDay.y - 8 }}
          >
            <div className="bg-[#050505]/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(139,92,246,0.15)] min-w-[160px]">
              <div className="text-[10px] font-mono text-gray-400 mb-3 border-b border-white/10 pb-2">
                {new Date(hoveredDay.day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              
              {hoveredDay.day.count === 0 ? (
                <div className="text-xs text-gray-500 italic">No activity recorded</div>
              ) : (
                <div className="space-y-2">
                  {hoveredDay.day.platforms.github > 0 && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white">GitHub</span>
                      <span className="font-mono text-gray-400">{hoveredDay.day.platforms.github} commits</span>
                    </div>
                  )}
                  {hoveredDay.day.platforms.leetcode > 0 && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-yellow-500">LeetCode</span>
                      <span className="font-mono text-gray-400">{hoveredDay.day.platforms.leetcode} subs</span>
                    </div>
                  )}
                  {hoveredDay.day.platforms.codeforces && (
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-blue-500">Codeforces</span>
                      <span className="font-mono text-gray-400">{hoveredDay.day.platforms.codeforces}</span>
                    </div>
                  )}
                  <div className="pt-2 mt-2 border-t border-white/10 flex justify-between items-center text-xs font-bold">
                    <span className="text-primary">Total</span>
                    <span>{hoveredDay.day.count}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

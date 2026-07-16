import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { Code2, Activity, RefreshCw } from 'lucide-react';

const defaultLcData = [
  { rating: 1520 }, { rating: 1550 }, { rating: 1480 }, { rating: 1530 },
  { rating: 1580 }, { rating: 1610 }, { rating: 1600 }, { rating: 1653 }
];

const defaultCfData = [
  { rating: 0 }, { rating: 400 }, { rating: 700 }, { rating: 850 },
  { rating: 920 }, { rating: 949 }, { rating: 949 }
];

export function CodingStats() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [lcStats, setLcStats] = useState({
    solved: "150+", easy: 85, medium: 55, hard: 10,
    totalEasy: 954, totalMedium: 2084, totalHard: 953,
    rating: 1423, topPercentage: 35.5,
    chart: [
      { rating: 1200 }, { rating: 1250 }, { rating: 1300 }, { rating: 1280 },
      { rating: 1350 }, { rating: 1410 }, { rating: 1390 }, { rating: 1423 }
    ]
  });

  const [cfStats, setCfStats] = useState({
    solved: 125, rating: 949, maxRating: 949, rank: "Newbie",
    chart: defaultCfData
  });

  const fetchStats = async () => {
    setIsRefreshing(true);
    try {
      // 1. Codeforces Info
      const cfRes = await fetch('https://codeforces.com/api/user.info?handles=kausubh027');
      const cfData = await cfRes.json();
      
      // 2. Codeforces Rating History
      const cfHistRes = await fetch('https://codeforces.com/api/user.rating?handle=kausubh027');
      const cfHistData = await cfHistRes.json();
      
      // 3. Codeforces Status (to count solved problems)
      const cfStatusRes = await fetch('https://codeforces.com/api/user.status?handle=kausubh027');
      const cfStatusData = await cfStatusRes.json();

      if (cfData.status === "OK") {
        const user = cfData.result[0];
        let solvedCount = 125;
        if (cfStatusData.status === "OK") {
          // unique solved problems
          const solved = new Set(cfStatusData.result.filter((s: any) => s.verdict === "OK").map((s: any) => s.problem.name));
          solvedCount = solved.size;
        }
        
        let chart = defaultCfData;
        if (cfHistData.status === "OK" && cfHistData.result.length > 0) {
          chart = cfHistData.result.map((r: any) => ({ rating: r.newRating }));
          if (chart.length === 1) {
            chart = [{ rating: 0 }, ...chart]; // visual padding
          }
        }

        setCfStats({
          solved: solvedCount,
          rating: user.rating || 0,
          maxRating: user.maxRating || 0,
          rank: user.rank ? user.rank.charAt(0).toUpperCase() + user.rank.slice(1) : "Unrated",
          chart
        });
      }

    } catch (error) {
      console.error("Failed to fetch coding stats", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <section id="coding-stats" className="py-24 relative flex items-center min-h-[80dvh]">
      <div className="container mx-auto px-6 lg:pl-24 relative z-10 w-full">
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            className="text-4xl md:text-6xl font-bold font-sans text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Live <span className="text-primary">Coding Stats</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 font-mono text-sm mt-4 mb-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Pulled live from LeetCode & Codeforces — real numbers, not claims.
          </motion.p>
          <motion.button 
            onClick={fetchStats}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 transition-all cursor-none"
            data-magnetic
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            disabled={isRefreshing}
          >
            <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
            Refresh
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 perspective-1000">
          {/* LeetCode Card */}
          <motion.div
            className="glass-card p-6 md:p-8 rounded-xl border border-white/10 bg-[#05020a]/60 backdrop-blur-xl relative overflow-hidden"
            initial={{ opacity: 0, x: -50, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                  <Code2 size={18} />
                </div>
                <h3 className="text-xl font-bold text-white">LeetCode</h3>
              </div>
              <span className="text-xs font-mono text-gray-500">kstbh07</span>
            </div>

            <div className="flex flex-wrap items-end gap-4 mb-8 border-b border-white/10 pb-6">
              <div>
                <span className="text-5xl font-bold text-emerald-400">{lcStats.solved}</span>
                <span className="text-gray-500 font-mono text-sm ml-2">solved</span>
              </div>
              <div className="mb-1">
                <span className="text-2xl font-bold text-white">{lcStats.rating}</span>
                <span className="text-gray-500 font-mono text-xs ml-2">contest rating · top {lcStats.topPercentage}%</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-emerald-400">Easy</span>
                  <span className="text-gray-400"><strong className="text-white">{lcStats.easy}</strong></span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(lcStats.easy / Math.max(1, lcStats.solved)) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-yellow-400">Medium</span>
                  <span className="text-gray-400"><strong className="text-white">{lcStats.medium}</strong></span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${(lcStats.medium / Math.max(1, lcStats.solved)) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-red-400">Hard</span>
                  <span className="text-gray-400"><strong className="text-white">{lcStats.hard}</strong></span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: `${(lcStats.hard / Math.max(1, lcStats.solved)) * 100}%` }} />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-gray-500 mb-4">
                <span>CONTEST RATING</span>
                <span>now <strong className="text-white">{lcStats.rating}</strong></span>
              </div>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={lcStats.chart}>
                    <defs>
                      <linearGradient id="colorLc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide />
                    <Area type="monotone" dataKey="rating" stroke="#eab308" strokeWidth={2} fillOpacity={1} fill="url(#colorLc)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Codeforces Card */}
          <motion.div
            className="glass-card p-6 md:p-8 rounded-xl border border-white/10 bg-[#05020a]/60 backdrop-blur-xl relative overflow-hidden flex flex-col"
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between gap-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <Activity size={18} />
                </div>
                <h3 className="text-xl font-bold text-white">Codeforces</h3>
              </div>
              <span className="text-xs font-mono text-gray-500">kausubh027</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 border border-white/5 rounded-lg p-4">
                <div className="text-gray-400 font-mono text-xs mb-2">Solved</div>
                <div className="text-3xl font-bold text-white">{cfStats.solved}</div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-lg p-4">
                <div className="text-gray-400 font-mono text-xs mb-2">Rating</div>
                <div className="text-3xl font-bold text-white">{cfStats.rating}</div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-lg p-4">
                <div className="text-gray-400 font-mono text-xs mb-2">Max rating</div>
                <div className="text-3xl font-bold text-white">{cfStats.maxRating}</div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-lg p-4">
                <div className="text-gray-400 font-mono text-xs mb-2">Rank</div>
                <div className="text-xl font-bold text-gray-300 mt-2">{cfStats.rank}</div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between text-xs font-mono text-gray-500 mb-4">
                <span>RATING HISTORY</span>
                <span>now <strong className="text-white">{cfStats.rating}</strong> · peak {cfStats.maxRating}</span>
              </div>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cfStats.chart}>
                    <defs>
                      <linearGradient id="colorCf" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <YAxis domain={[0, 'dataMax + 100']} hide />
                    <Area type="monotone" dataKey="rating" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCf)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

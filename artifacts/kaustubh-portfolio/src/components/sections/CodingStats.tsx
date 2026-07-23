import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ActivityDashboard } from '../ui/ActivityDashboard';
import { DeveloperDNA } from '../ui/DeveloperDNA';

const LEETCODE_CARD_URL = 'https://leetcard.jacoblin.cool/kstbh07?theme=dark&font=Karma';

/* ─── Skeleton ─── */
function Skeleton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`animate-pulse rounded-lg bg-white/5 ${className}`} style={{ minHeight: 120, ...style }} />;
}

/* ─── Codeforces live card ─── */
interface CfUser {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contribution: number;
  friendOfCount: number;
  avatar: string;
}

function CodeforcesCard() {
  const [user, setUser] = useState<CfUser | null>(null);
  const [solved, setSolved] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCf = async () => {
      try {
        const [infoRes, statusRes] = await Promise.all([
          fetch('https://codeforces.com/api/user.info?handles=kausubh027'),
          fetch('https://codeforces.com/api/user.status?handle=kausubh027'),
        ]);
        const infoData = await infoRes.json();
        const statusData = await statusRes.json();

        if (infoData.status === 'OK') {
          const u = infoData.result[0];
          setUser({
            handle: u.handle,
            rating: u.rating || 0,
            maxRating: u.maxRating || 0,
            rank: u.rank ? u.rank.charAt(0).toUpperCase() + u.rank.slice(1) : 'Unrated',
            maxRank: u.maxRank ? u.maxRank.charAt(0).toUpperCase() + u.maxRank.slice(1) : 'Unrated',
            contribution: u.contribution || 0,
            friendOfCount: u.friendOfCount || 0,
            avatar: u.avatar || u.titlePhoto || '',
          });
        }
        if (statusData.status === 'OK') {
          const s = new Set(statusData.result.filter((x: any) => x.verdict === 'OK').map((x: any) => x.problem.name));
          setSolved(s.size);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCf();
  }, []);

  const getRankColor = (rank: string) => {
    const r = rank.toLowerCase();
    if (r === 'newbie') return 'text-gray-400';
    if (r === 'pupil') return 'text-green-400';
    if (r === 'specialist') return 'text-cyan-400';
    if (r === 'expert') return 'text-blue-400';
    if (r === 'candidate master') return 'text-violet-400';
    if (r === 'master' || r === 'international master') return 'text-orange-400';
    if (r === 'grandmaster' || r === 'international grandmaster' || r === 'legendary grandmaster') return 'text-red-400';
    return 'text-gray-400';
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-white/8 bg-[#0d1117]/50 backdrop-blur-sm p-6 h-full flex flex-col justify-center">
        <Skeleton style={{ minHeight: 48, width: '60%', marginBottom: 16 }} />
        <Skeleton style={{ minHeight: 24, width: '80%', marginBottom: 10 }} />
        <Skeleton style={{ minHeight: 24, width: '70%', marginBottom: 10 }} />
        <Skeleton style={{ minHeight: 24, width: '50%' }} />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="rounded-lg border border-white/8 bg-[#0d1117]/50 backdrop-blur-sm p-5 h-full flex items-center justify-center">
        <p className="text-gray-600 font-mono text-xs text-center">Unable to load Codeforces statistics.</p>
      </div>
    );
  }

  const stats = [
    { label: 'Rating', value: user.rating, color: 'text-cyan-400' },
    { label: 'Max Rating', value: user.maxRating, color: 'text-yellow-400' },
    { label: 'Solved', value: solved, color: 'text-emerald-400' },
    { label: 'Contribution', value: user.contribution >= 0 ? `+${user.contribution}` : user.contribution, color: user.contribution >= 0 ? 'text-green-400' : 'text-red-400' },
  ];

  return (
    <motion.div
      className="rounded-lg border border-white/8 bg-[#0d1117]/50 backdrop-blur-sm p-6 h-full flex flex-col justify-center relative overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      {/* Glow accent */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        {user.avatar && (
          <img
            src={user.avatar.startsWith('//') ? `https:${user.avatar}` : user.avatar}
            alt={user.handle}
            className="w-10 h-10 rounded-full border border-white/10 object-cover"
          />
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-white text-base truncate">{user.handle}</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-white/5 ${getRankColor(user.rank)}`}>
              {user.rank}
            </span>
          </div>
          <div className="text-[10px] font-mono text-gray-500">
            Max: <span className={getRankColor(user.maxRank)}>{user.maxRank}</span> · {user.friendOfCount} friends
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/[0.03] border border-white/5 rounded-md px-3 py-2">
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-0.5">{s.label}</div>
            <div className={`text-xl font-bold ${s.color} leading-tight`}>{s.value}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── LeetCode card (image-based) ─── */
function LeetCodeCard() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg border border-white/8 bg-[#0d1117]/50 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] h-full group flex items-center justify-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {!loaded && <Skeleton className="absolute inset-0 z-10" style={{ minHeight: '100%' }} />}
      {error ? (
        <div className="flex items-center justify-center h-full min-h-[200px] text-gray-600 font-mono text-xs px-4 text-center">
          Unable to load LeetCode statistics.
        </div>
      ) : (
        <img
          src={LEETCODE_CARD_URL}
          alt="LeetCode Statistics"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => { setError(true); setLoaded(true); }}
          className={`w-full h-full object-contain block transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </motion.div>
  );
}

/* ─── Main Section ─── */
export function CodingStats() {
  return (
    <section id="coding-stats" className="py-16 relative">
      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">

        {/* ── Header ── */}
        <div className="flex flex-col items-center mb-10">
          <motion.h2
            className="text-3xl md:text-5xl font-bold font-sans text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Live <span className="text-primary">Coding Stats</span>
          </motion.h2>
        </div>

        {/* ── LeetCode + Codeforces ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-12">
          <LeetCodeCard />
          <CodeforcesCard />
        </div>

        {/* ── Activity Dashboard (Heatmap + Score) ── */}
        <ActivityDashboard />

        {/* ── Developer DNA (Conclusion) ── */}
        <DeveloperDNA />

      </div>
    </section>
  );
}


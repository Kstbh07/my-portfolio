import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

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
      <div className="rounded-lg border border-white/8 bg-[#0d1117]/50 backdrop-blur-sm p-5 h-full">
        <Skeleton style={{ minHeight: 40, width: '60%', marginBottom: 12 }} />
        <Skeleton style={{ minHeight: 20, width: '80%', marginBottom: 8 }} />
        <Skeleton style={{ minHeight: 20, width: '70%', marginBottom: 8 }} />
        <Skeleton style={{ minHeight: 20, width: '50%' }} />
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
      className="rounded-lg border border-white/8 bg-[#0d1117]/50 backdrop-blur-sm p-5 h-full relative overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      {/* Glow accent */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {user.avatar && (
          <img
            src={user.avatar.startsWith('//') ? `https:${user.avatar}` : user.avatar}
            alt={user.handle}
            className="w-9 h-9 rounded-full border border-white/10 object-cover"
          />
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm truncate">{user.handle}</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border border-white/10 bg-white/5 ${getRankColor(user.rank)}`}>
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
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{s.label}</div>
            <div className={`text-lg font-bold ${s.color} leading-tight`}>{s.value}</div>
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
      className="relative overflow-hidden rounded-lg border border-white/8 bg-[#0d1117]/50 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] h-full group"
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
          className={`w-full h-full object-contain block transition-all duration-500 group-hover:scale-[1.02] ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </motion.div>
  );
}

/* ─── Main Section ─── */
export function CodingStats() {
  return (
    <section id="coding-stats" className="py-16 relative">
      <div className="container mx-auto px-6 lg:pl-24 relative z-10 w-full max-w-[1100px]">

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
          <motion.p
            className="text-gray-400 font-mono text-xs mt-3 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Real-time stats from LeetCode & Codeforces.
          </motion.p>
        </div>

        {/* ── LeetCode + Codeforces ── */}
        <motion.div
          className="flex items-center gap-2 mb-3"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-yellow-500/70"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l.842.691c.63.516 1.543.439 2.059-.19a1.379 1.379 0 0 0-.19-2.06l-.842-.69a5.323 5.323 0 0 0-2.035-1.076 5.26 5.26 0 0 0-1.18-.276 4.928 4.928 0 0 0-.733.009 1.37 1.37 0 0 0 .002-1.244l1.145-1.18A1.374 1.374 0 0 0 13.483 0z"/></svg>
          <span className="text-sm font-semibold text-white/80">Competitive</span>
          <span className="text-[10px] font-mono text-gray-500">LeetCode & Codeforces</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <LeetCodeCard />
          <CodeforcesCard />
        </div>

      </div>
    </section>
  );
}

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const GITHUB_USERNAME = 'Kstbh07';
const THEME = 'tokyonight';

const githubCards = {
  profileDetails: {
    url: `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${GITHUB_USERNAME}&theme=${THEME}`,
    alt: 'GitHub Profile Details',
    fullWidth: true,
  },
  reposPerLanguage: {
    url: `https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${GITHUB_USERNAME}&theme=${THEME}`,
    alt: 'Repos per Language',
  },
  mostCommitLanguage: {
    url: `https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${GITHUB_USERNAME}&theme=${THEME}`,
    alt: 'Most Commit Language',
  },
  stats: {
    url: `https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${GITHUB_USERNAME}&theme=${THEME}`,
    alt: 'GitHub Stats',
  },
  productiveTime: {
    url: `https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${GITHUB_USERNAME}&theme=${THEME}&utcOffset=5.5`,
    alt: 'Productive Time',
  },
};

const LEETCODE_CARD_URL = 'https://leetcard.jacoblin.cool/kstbh07?theme=dark&font=Karma';

/* ─── Skeleton placeholder ─── */
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-white/5 ${className}`}
      style={{ minHeight: 180 }}
    />
  );
}

/* ─── Lazy-loaded stat card with skeleton + error fallback ─── */
function StatCard({
  src,
  alt,
  delay = 0,
  className = '',
}: {
  src: string;
  alt: string;
  delay?: number;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const onLoad = useCallback(() => setLoaded(true), []);
  const onError = useCallback(() => {
    setError(true);
    setLoaded(true);
  }, []);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]/60 backdrop-blur-md transition-shadow hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:border-white/20 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
    >
      {/* skeleton while loading */}
      {!loaded && <Skeleton className="absolute inset-0 z-10" />}

      {error ? (
        <div className="flex items-center justify-center min-h-[180px] text-gray-500 font-mono text-sm px-4 text-center">
          Unable to load {alt}.
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={onLoad}
          onError={onError}
          className={`w-full h-auto block transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ aspectRatio: 'auto' }}
        />
      )}
    </motion.div>
  );
}

/* ─── Main section ─── */
export function CodingStats() {
  return (
    <section id="coding-stats" className="py-24 relative flex items-center min-h-[80dvh]">
      <div className="container mx-auto px-6 lg:pl-24 relative z-10 w-full">
        {/* Header */}
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
            className="text-gray-400 font-mono text-sm mt-4 text-center max-w-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Real-time stats pulled from GitHub & LeetCode — real numbers, not claims.
          </motion.p>
        </div>

        {/* ── GitHub Section ── */}
        <motion.h3
          className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex w-8 h-8 rounded bg-white/10 items-center justify-center text-white">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 17.07 3.633 16.7 3.633 16.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </span>
          GitHub
          <span className="text-xs font-mono text-gray-500 font-normal">@{GITHUB_USERNAME}</span>
        </motion.h3>

        <div className="space-y-4 mb-16">
          {/* Row 1: Profile Details — full width */}
          <StatCard
            src={githubCards.profileDetails.url}
            alt={githubCards.profileDetails.alt}
            delay={0.1}
          />

          {/* Row 2: Repos per Language + Most Commit Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard
              src={githubCards.reposPerLanguage.url}
              alt={githubCards.reposPerLanguage.alt}
              delay={0.15}
            />
            <StatCard
              src={githubCards.mostCommitLanguage.url}
              alt={githubCards.mostCommitLanguage.alt}
              delay={0.2}
            />
          </div>

          {/* Row 3: Stats + Productive Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard
              src={githubCards.stats.url}
              alt={githubCards.stats.alt}
              delay={0.25}
            />
            <StatCard
              src={githubCards.productiveTime.url}
              alt={githubCards.productiveTime.alt}
              delay={0.3}
            />
          </div>
        </div>

        {/* ── LeetCode Section ── */}
        <motion.h3
          className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex w-8 h-8 rounded bg-yellow-500/20 items-center justify-center text-yellow-500">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l.842.691c.63.516 1.543.439 2.059-.19a1.379 1.379 0 0 0-.19-2.06l-.842-.69a5.323 5.323 0 0 0-2.035-1.076 5.26 5.26 0 0 0-1.18-.276 4.928 4.928 0 0 0-.733.009 1.37 1.37 0 0 0 .002-1.244l1.145-1.18A1.374 1.374 0 0 0 13.483 0zM8.204 12.44a1.376 1.376 0 0 0-1.397.342l-1.743 1.774a5.34 5.34 0 0 0-1.303 2.084 5.474 5.474 0 0 0-.128.526 5.594 5.594 0 0 0 .06 2.394 5.93 5.93 0 0 0 .357 1.038 6.07 6.07 0 0 0 1.299 1.853l4.277 4.194.039.037c2.248 2.166 5.852 2.134 8.063-.074l2.396-2.392a1.379 1.379 0 0 0 .003-1.955 1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164l1.743-1.774a1.38 1.38 0 0 0-.554-2.312z"/></svg>
          </span>
          LeetCode
          <span className="text-xs font-mono text-gray-500 font-normal">@kstbh07</span>
        </motion.h3>

        <StatCard
          src={LEETCODE_CARD_URL}
          alt="LeetCode Statistics"
          delay={0.1}
        />
      </div>
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { SITE } from '@/lib/site';

export const HeroVideo = () => {
  const videoRef = React.useRef(null);
  const sectionRef = React.useRef(null);
  const [canPlay, setCanPlay] = React.useState(false);
  const reduce = useReducedMotion();

  // Parallax / zoom on hero scroll
  const { scrollY } = useScroll();
  const mediaY = useTransform(scrollY, [0, 800], [0, 160]);
  const mediaScale = useTransform(scrollY, [0, 800], [1.05, 1.15]);
  const overlayOpacity = useTransform(scrollY, [0, 600], [1, 0.5]);

  React.useEffect(() => {
    if (reduce) return;
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => setCanPlay(true);
    v.addEventListener('canplay', onCanPlay);
    v.play().catch(() => {});
    return () => v.removeEventListener('canplay', onCanPlay);
  }, [reduce]);

  const ease = [0.22, 1, 0.36, 1];
  const fadeUp = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 28 },
    show: (i = 0) => (reduce ? { opacity: 1 } : { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.15 + i * 0.12 } }),
  };

  return (
    <section
      ref={sectionRef}
      data-testid="home-hero"
      className="relative bg-noise overflow-hidden text-[#F6F3EC] min-h-[100svh] flex items-center"
    >
      {/* Media layer with parallax */}
      <motion.div
        aria-hidden
        className="absolute inset-0 w-full h-full"
        style={reduce ? undefined : { y: mediaY, scale: mediaScale }}
      >
        <img
          src={SITE.hero.posterUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${canPlay ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={SITE.hero.posterUrl}
        >
          {SITE.hero.videoSources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
      </motion.div>

      {/* Gradient overlays */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={reduce ? undefined : { opacity: overlayOpacity }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,27,43,0.55) 0%, rgba(11,27,43,0.50) 45%, rgba(11,27,43,0.88) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(1200px 600px at 20% 20%, rgba(200,162,74,0.20), rgba(0,0,0,0) 60%)' }} />
      </motion.div>

      <div className="relative z-10 bahari-container w-full pt-32 sm:pt-36 lg:pt-44 pb-12 lg:pb-24">
        <div className="max-w-4xl">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="flex items-center gap-3 mb-5">
            <span className="inline-block h-px w-10 bg-[#C8A24A]" />
            <span className="eyebrow text-[#C8A24A]">Bahari Global Holdings</span>
          </motion.div>
          <h1 className="font-display text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-7xl tracking-tight">
            <motion.span variants={fadeUp} initial="hidden" animate="show" custom={1} className="block">Navigating Trade,</motion.span>
            <motion.span variants={fadeUp} initial="hidden" animate="show" custom={2} className="block">
              Connecting <span className="text-[#C8A24A] inline-block">Markets</span>.
            </motion.span>
          </h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="mt-5 sm:mt-7 max-w-3xl text-sm sm:text-base lg:text-lg text-[#F6F3EC]/85 leading-relaxed"
          >
            Maritime Logistics • Vessel Chartering • Port Agency • Husbandry Services • Freight Forwarding • Global Trade Solutions
          </motion.p>
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="mt-7 sm:mt-9 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3"
          >
            <Link
              to="/contact"
              data-testid="home-hero-primary-cta"
              className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-[#C8A24A] text-[#0B1B2B] text-xs sm:text-sm font-semibold tracking-wide uppercase hover:bg-[#B8923E] transition-colors shadow-[0_10px_30px_rgba(200,162,74,0.30)]"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/maritime-services"
              data-testid="home-hero-secondary-cta"
              className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-white/30 text-[#F6F3EC] text-xs sm:text-sm font-semibold tracking-wide uppercase hover:border-[#C8A24A] hover:text-[#C8A24A] hover:bg-white/5 transition-colors"
            >
              <Play className="w-4 h-4" /> Explore Services
            </Link>
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={5}
          className="mt-10 sm:mt-14 lg:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
          data-testid="hero-trust-strip"
        >
          {[
            { k: '32+', l: 'Ports Served' },
            { k: '24/7', l: 'Operations Desk' },
            { k: 'AAA', l: 'Compliance Posture' },
            { k: '15+', l: 'Years Experience' },
          ].map((b) => (
            <div key={b.l} className="bg-[#0B1B2B]/55 p-4 sm:p-5 lg:p-6">
              <div className="font-display text-2xl sm:text-3xl text-[#C8A24A]">{b.k}</div>
              <div className="mt-1 text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#F6F3EC]/70">{b.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#F6F3EC]/60"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[0.22em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-[#C8A24A] to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </section>
  );
};

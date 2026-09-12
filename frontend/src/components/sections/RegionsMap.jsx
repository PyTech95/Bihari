import React from 'react';
import { MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

// Stylized SVG world map with animated gold pins.
const MARKERS = [
  { id: 'us-mia', x: 295, y: 245, label: 'Miami / Port Everglades' },
  { id: 'us-hou', x: 250, y: 240, label: 'Houston' },
  { id: 'us-jax', x: 295, y: 235, label: 'Jacksonville' },
  { id: 'us-nol', x: 275, y: 240, label: 'New Orleans' },
  { id: 'kingston', x: 305, y: 270, label: 'Kingston, Jamaica' },
  { id: 'pap', x: 318, y: 268, label: 'Port-au-Prince, Haiti' },
  { id: 'sd', x: 326, y: 268, label: 'Santo Domingo, DR' },
  { id: 'sjuan', x: 340, y: 265, label: 'San Juan, PR' },
  { id: 'pos', x: 355, y: 285, label: 'Port of Spain' },
  { id: 'brid', x: 360, y: 278, label: 'Bridgetown' },
  { id: 'cartagena', x: 320, y: 295, label: 'Cartagena, Colombia' },
  { id: 'panama', x: 305, y: 305, label: 'Manzanillo, Panama' },
  { id: 'veracruz', x: 240, y: 270, label: 'Veracruz, Mexico' },
  { id: 'rotterdam', x: 510, y: 175, label: 'Rotterdam (Partner)' },
  { id: 'singapore', x: 745, y: 305, label: 'Singapore (Partner)' },
];

// Smooth animated trade route lines
const ROUTES = [
  { from: 'us-mia', to: 'kingston' },
  { from: 'us-mia', to: 'sd' },
  { from: 'us-hou', to: 'cartagena' },
  { from: 'us-mia', to: 'sjuan' },
  { from: 'kingston', to: 'pap' },
  { from: 'cartagena', to: 'panama' },
  { from: 'us-hou', to: 'veracruz' },
];

const getMarker = (id) => MARKERS.find((m) => m.id === id);

export const RegionsMap = () => {
  const [hover, setHover] = React.useState(null);
  const reduce = useReducedMotion();
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[rgba(200,162,74,0.25)] bg-[#0B1B2B] text-[#F6F3EC] shadow-[0_18px_50px_rgba(11,27,43,0.25)]" data-testid="regions-map">
      <svg viewBox="0 0 960 480" className="w-full h-auto" role="img" aria-label="Bahari regional presence map">
        <defs>
          <radialGradient id="oceanGlow" cx="30%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#10263D" />
            <stop offset="100%" stopColor="#0B1B2B" />
          </radialGradient>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(200,162,74,0.08)" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(200,162,74,0)" />
            <stop offset="50%" stopColor="rgba(200,162,74,0.85)" />
            <stop offset="100%" stopColor="rgba(200,162,74,0)" />
          </linearGradient>
        </defs>
        <rect width="960" height="480" fill="url(#oceanGlow)" />
        <rect width="960" height="480" fill="url(#grid)" />

        {/* Continents */}
        <g fill="rgba(200,162,74,0.08)" stroke="rgba(200,162,74,0.35)" strokeWidth="0.8">
          <path d="M120,140 C160,120 220,110 280,130 C320,145 340,170 320,210 C310,235 280,255 250,250 C220,260 195,275 200,300 C180,295 140,260 130,220 C115,190 100,160 120,140 Z" />
          <path d="M260,260 C275,265 285,275 290,290 C300,300 310,305 305,315 C285,315 265,305 250,290 C245,275 250,265 260,260 Z" />
          <path d="M310,300 C340,310 370,340 365,400 C350,440 320,455 300,440 C285,415 300,375 290,345 C285,325 300,305 310,300 Z" />
          <path d="M460,150 C500,140 540,150 560,170 C555,190 530,200 510,200 C490,210 470,200 460,180 C455,170 455,160 460,150 Z" />
          <path d="M500,210 C540,210 560,240 555,290 C545,335 520,355 500,345 C480,320 480,280 490,250 C490,235 495,220 500,210 Z" />
          <path d="M580,180 C660,160 740,180 800,210 C840,240 850,280 820,310 C780,310 720,305 670,290 C620,275 590,240 580,210 C575,200 575,190 580,180 Z" />
          <path d="M790,360 C815,350 835,360 840,380 C830,395 805,395 790,385 C785,375 785,367 790,360 Z" />
        </g>

        <line x1="0" y1="280" x2="960" y2="280" stroke="rgba(200,162,74,0.20)" strokeDasharray="4 6" strokeWidth="0.7" />

        {/* Animated trade routes */}
        <g>
          {ROUTES.map((r, i) => {
            const a = getMarker(r.from); const b = getMarker(r.to);
            if (!a || !b) return null;
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2 - 18; // arc upward
            const d = `M ${a.x},${a.y} Q ${mx},${my} ${b.x},${b.y}`;
            return (
              <g key={i}>
                <path d={d} stroke="rgba(200,162,74,0.18)" strokeWidth="1" fill="none" />
                {!reduce && (
                  <motion.path
                    d={d}
                    stroke="url(#routeGrad)"
                    strokeWidth="1.4"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 2.4, delay: 0.2 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Markers with pulse */}
        {MARKERS.map((m, idx) => (
          <g
            key={m.id}
            onMouseEnter={() => setHover(m.id)}
            onMouseLeave={() => setHover(null)}
            className="cursor-pointer"
            data-testid={`regions-marker-${m.id}`}
          >
            {!reduce && (
              <motion.circle
                cx={m.x}
                cy={m.y}
                r={10}
                fill="#C8A24A"
                initial={{ opacity: 0.0, scale: 0.6 }}
                animate={{ opacity: [0.0, 0.35, 0.0], scale: [0.6, 1.8, 0.6] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: (idx % 6) * 0.4, ease: 'easeOut' }}
                style={{ transformOrigin: `${m.x}px ${m.y}px` }}
              />
            )}
            <circle cx={m.x} cy={m.y} r={hover === m.id ? 7 : 5} fill="#C8A24A" opacity="0.95" />
            <circle cx={m.x} cy={m.y} r={hover === m.id ? 14 : 10} fill="#C8A24A" opacity="0.18" />
            {hover === m.id && (
              <g>
                <rect x={m.x + 10} y={m.y - 22} rx="4" ry="4" width={Math.max(120, m.label.length * 5)} height="22" fill="#10263D" stroke="#C8A24A" strokeOpacity="0.7" />
                <text x={m.x + 18} y={m.y - 7} fill="#F6F3EC" fontSize="11" fontFamily="Inter, sans-serif">{m.label}</text>
              </g>
            )}
          </g>
        ))}
      </svg>

      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 bg-[rgba(11,27,43,0.7)] backdrop-blur px-2.5 sm:px-3 py-1.5 rounded-md text-[10px] sm:text-xs border border-white/10">
        <MapPin className="w-3.5 h-3.5 text-[#C8A24A]" />
        <span className="hidden sm:inline">Caribbean • United States • International network</span>
        <span className="sm:hidden">Global maritime network</span>
      </div>
    </div>
  );
};

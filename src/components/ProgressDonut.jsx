import { useRef } from "react";

export default function ProgressDonut({
  percent = 0,
  size = 220,
  stroke = 24,
  colors = ["#71CB90", "#B5E8A4"],
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, percent));
  const dash = (clamped / 100) * c;
  const gradId = useRef(`grad_${Math.random().toString(36).slice(2)}`).current;
  const shadowId = useRef(
    `shadow_${Math.random().toString(36).slice(2)}`
  ).current;
  const glowId = useRef(`glow_${Math.random().toString(36).slice(2)}`).current;

  return (
    <div
      className="relative inline-block animate-pulse-slow"
      style={{ width: size, height: size }}
    >
      {/* Outer glow effects - multiple layers */}
      <div
        className="absolute inset-0 rounded-full opacity-30 blur-2xl animate-pulse"
        style={{
          background: `radial-gradient(circle, ${colors[0]}, ${
            colors[1] || colors[0]
          })`,
        }}
      />
      <div
        className="absolute inset-2 rounded-full opacity-40 blur-xl"
        style={{
          background: `conic-gradient(from 0deg, ${colors[0]}, ${
            colors[1] || colors[0]
          }, ${colors[0]})`,
        }}
      />

      <svg
        width={size}
        height={size}
        className="block relative z-10 drop-shadow-2xl"
      >
        <defs>
          {/* Multi-color gradient for the progress arc */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} stopOpacity="1" />
            <stop
              offset="25%"
              stopColor={colors[1] || colors[0]}
              stopOpacity="1"
            />
            <stop offset="50%" stopColor={colors[0]} stopOpacity="0.9" />
            <stop
              offset="75%"
              stopColor={colors[1] || colors[0]}
              stopOpacity="1"
            />
            <stop offset="100%" stopColor={colors[0]} stopOpacity="1" />
          </linearGradient>

          {/* Shadow filter */}
          <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dx="0" dy="3" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glow filter */}
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {/* Background circle with subtle gradient */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#e5e7eb"
            strokeWidth={stroke}
            fill="none"
            opacity="0.3"
          />

          {/* Inner shadow circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r - 2}
            stroke="#d1d5db"
            strokeWidth={2}
            fill="none"
            opacity="0.2"
          />

          {/* Progress circle with animated gradient */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={`url(#${gradId})`}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={`${dash} ${c - dash}`}
            strokeLinecap="round"
            filter={`url(#${glowId})`}
            style={{
              transition: "stroke-dasharray 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* Highlight effect on progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r + stroke / 4}
            stroke="white"
            strokeWidth={2}
            fill="none"
            strokeDasharray={`${dash * 0.95} ${c - dash * 0.95}`}
            strokeLinecap="round"
            opacity="0.4"
            style={{
              transition: "stroke-dasharray 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </g>

        {/* Center circle background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r - stroke}
          fill="white"
          filter={`url(#${shadowId})`}
        />

        {/* Percentage text with gradient */}
        <defs>
          <linearGradient
            id={`text_${gradId}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1] || colors[0]} />
          </linearGradient>
        </defs>

        <text
          x="50%"
          y="48%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="font-extrabold"
          style={{
            fill: `url(#text_${gradId})`,
            fontSize: `${size * 0.22}px`,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {Math.round(clamped)}%
        </text>

        {/* Subtitle */}
        <text
          x="50%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="font-medium"
          style={{
            fill: "#6b7280",
            fontSize: `${size * 0.08}px`,
          }}
        >
          Tercapai
        </text>
      </svg>
    </div>
  );
}

import { cn } from "@/lib/utils"; // 如果你没有 cn，就把这一行删掉并删除下面 cn(...) 用法

type Props = {
  className?: string;
  size?: number; // px
  label?: string;
};

export function BangbooLoader({ className, size = 72, label }: Props) {
  return (
    <div className={cn("inline-flex flex-col items-center gap-2", className)}>
      <div
        className="bangboo-loader"
        style={{ width: size, height: size }}
        aria-label={label ?? "loading"}
        role="img"
      >
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          {/* 背景 */}
          <rect x="0" y="0" width="120" height="120" rx="18" className="bg" />

          {/* 洞（左/右） */}
          <g className="holes">
            <g transform="translate(22,74)">
              <ellipse cx="18" cy="12" rx="18" ry="10" className="holeShadow" />
              <ellipse cx="18" cy="12" rx="14" ry="7" className="holeInner" />
              <ellipse cx="18" cy="12" rx="18" ry="10" className="holeRim" />
            </g>

            <g transform="translate(62,74)">
              <ellipse cx="18" cy="12" rx="18" ry="10" className="holeShadow" />
              <ellipse cx="18" cy="12" rx="14" ry="7" className="holeInner" />
              <ellipse cx="18" cy="12" rx="18" ry="10" className="holeRim" />
            </g>
          </g>

          {/* 邦布（来自 200x200 SVG，等比缩放到 120x120） */}
          <g className="bangboo" transform="translate(0, -6)">
            {/* scale = 120 / 200 = 0.6 */}
            <g transform="scale(0.6)">
              {/* ears */}
              <ellipse cx="70" cy="35" rx="16" ry="38" className="ear" />
              <ellipse
                cx="130"
                cy="38"
                rx="16"
                ry="38"
                className="ear"
                transform="rotate(20 130 38)"
              />

              <ellipse cx="70" cy="40" rx="7" ry="20" fill="#8B3A3A" />
              <ellipse
                cx="130"
                cy="42"
                rx="7"
                ry="20"
                fill="#8B3A3A"
                transform="rotate(20 130 42)"
              />

              {/* body */}
              <ellipse cx="100" cy="115" rx="60" ry="65" className="face" />

              {/* face mask */}
              <ellipse cx="100" cy="95" rx="45" ry="30" fill="#0B0B0B" />

              {/* eyes */}
              <circle
                cx="85"
                cy="95"
                r="10"
                fill="none"
                stroke="#58FF2A"
                strokeWidth="5"
              />
              <circle
                cx="115"
                cy="95"
                r="10"
                fill="none"
                stroke="#58FF2A"
                strokeWidth="5"
              />

              {/* arms */}
              <ellipse cx="45" cy="120" rx="10" ry="20" className="face" />
              <ellipse cx="155" cy="120" rx="10" ry="14" className="face" />

              {/* feet */}
              <ellipse cx="80" cy="175" rx="10" ry="12" className="face" />
              <ellipse cx="120" cy="175" rx="10" ry="12" className="face" />

              {/* belly pad */}
              <circle cx="100" cy="135" r="15" fill="#F28C8C" />
              <circle cx="85" cy="120" r="5" fill="#F28C8C" />
              <circle cx="115" cy="120" r="5" fill="#F28C8C" />
              <circle cx="100" cy="115" r="5" fill="#F28C8C" />
            </g>
          </g>
        </svg>
      </div>

      {label ? (
        <div className="text-xs text-muted-foreground">{label}</div>
      ) : null}

      {/* scoped CSS */}
      <style>{css}</style>
    </div>
  );
}

const css = `
.bangboo-loader {
  display: inline-block;
  border-radius: 18px;
}

.bangboo-loader .bg { fill: var(--background); }

.bangboo-loader .holeRim { 
  fill: transparent; 
  stroke: var(--border); 
  stroke-width: 2; 
  opacity: .9; 
}
.bangboo-loader .holeInner { fill: var(--muted); opacity: .55; }
.bangboo-loader .holeShadow { fill: #000; opacity: .18; }

.bangboo-loader .trail { 
  fill: none; 
  stroke: var(--muted-foreground); 
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 6 8;
  opacity: 0;
}

.bangboo-loader .face { fill: var(--card); stroke: var(--border); stroke-width: 2; }
.bangboo-loader .ear  { fill: var(--card); stroke: var(--border); stroke-width: 2; }
.bangboo-loader .eye  { fill: var(--foreground); opacity: .9; }
.bangboo-loader .mouth { fill: none; stroke: var(--foreground); stroke-width: 2; stroke-linecap: round; opacity: .8; }
.bangboo-loader .mark  { stroke: var(--muted-foreground); stroke-width: 2; stroke-linecap: round; opacity: .9; }
.bangboo-loader .groundCover { fill: var(--background); }

.bangboo-loader svg { overflow: visible; }

.bangboo-loader .bangboo {
  transform-origin: 0 0;
  animation: bb-move 1.8s infinite ease-in-out;
}

.bangboo-loader .body {
  transform-origin: 40px 78px;
  animation: bb-bob 1.8s infinite ease-in-out;
}

.bangboo-loader .dirtTrail .trail {
  animation: bb-trail 1.8s infinite linear;
}

\
@keyframes bb-bob {
  0%, 10%  { transform: scale(1); }
  15%      { transform: scale(1.03); }
  20%      { transform: scale(1.01); }
  28%      { transform: scale(0.98); }
  34%      { transform: scale(0.92); }

  52%      { transform: scale(0.98); }
  60%      { transform: scale(1.03); }
  70%      { transform: scale(1.01); }
  84%      { transform: scale(0.92); }

  100%     { transform: scale(1); }
}

@keyframes bb-trail {
  0%, 28%   { opacity: 0; stroke-dashoffset: 0; }
  34%       { opacity: .55; }
  48%       { opacity: .55; stroke-dashoffset: -60; }
  52%       { opacity: 0; }

  70%, 78%  { opacity: 0; }
  84%       { opacity: .55; stroke-dashoffset: 0; }
  96%       { opacity: .55; stroke-dashoffset: -60; }
  100%      { opacity: 0; }
}
`;

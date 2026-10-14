import type { ProjectType } from "@/lib/projects";

/**
 * Illustration architecturale vectorielle utilisée tant qu'aucune photo
 * réelle n'est fournie pour un projet. Style « plan / élévation »,
 * en cohérence avec la géométrie du logo.
 */

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const W = 400;
const H = 300;
const GROUND = 238;

function Windows({ x, y, w, h, cols, rows }: { x: number; y: number; w: number; h: number; cols: number; rows: number }) {
  const cells = [];
  const cw = w / cols;
  const rh = h / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={x + c * cw + cw * 0.22}
          y={y + r * rh + rh * 0.25}
          width={cw * 0.56}
          height={rh * 0.5}
          fill="rgba(244,242,237,0.10)"
          stroke="none"
        />,
      );
    }
  }
  return <>{cells}</>;
}

function Residential({ v }: { v: number }) {
  const towers = [
    { x: 70, w: 70, h: 150 + (v % 20) },
    { x: 165, w: 76, h: 190 },
    { x: 266, w: 70, h: 130 + (v % 30) },
  ];
  return (
    <>
      {towers.map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={GROUND - t.h} width={t.w} height={t.h} />
          {Array.from({ length: Math.floor(t.h / 13) }).map((_, j) => (
            <line key={j} x1={t.x} x2={t.x + t.w} y1={GROUND - 13 * (j + 1)} y2={GROUND - 13 * (j + 1)} strokeOpacity={0.35} />
          ))}
          <Windows x={t.x} y={GROUND - t.h} w={t.w} h={t.h} cols={4} rows={Math.floor(t.h / 13)} />
        </g>
      ))}
    </>
  );
}

function Office({ v }: { v: number }) {
  const h = 200 + (v % 15);
  return (
    <>
      <path d={`M150 ${GROUND} V${GROUND - h} L250 ${GROUND - h + 22} V${GROUND}`} />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1={150 + i * 12.5} x2={150 + i * 12.5} y1={GROUND - h + i * 2.75} y2={GROUND} strokeOpacity={0.35} />
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={`h${i}`} x1={150} x2={250} y1={GROUND - h + 18 + i * 12} y2={GROUND - h + 40 + i * 12} strokeOpacity={0.18} />
      ))}
      <rect x={60} y={GROUND - 70} width={90} height={70} />
      <Windows x={60} y={GROUND - 70} w={90} h={70} cols={5} rows={4} />
      <rect x={250} y={GROUND - 95} width={96} height={95} />
      <Windows x={250} y={GROUND - 95} w={96} h={95} cols={5} rows={6} />
    </>
  );
}

function PublicBuilding() {
  return (
    <>
      <rect x={50} y={GROUND - 96} width={300} height={96} />
      <path d={`M40 ${GROUND - 96} H360 M40 ${GROUND - 108} H360 V${GROUND - 96} M40 ${GROUND - 108} V${GROUND - 96}`} />
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1={68 + i * 26.4} x2={68 + i * 26.4} y1={GROUND - 96} y2={GROUND - 14} />
      ))}
      <rect x={170} y={GROUND - 150} width={60} height={42} />
      <Windows x={170} y={GROUND - 150} w={60} h={42} cols={3} rows={2} />
      <path d={`M50 ${GROUND - 14} H350`} strokeOpacity={0.5} />
      <path d={`M60 ${GROUND - 7} H340`} strokeOpacity={0.35} />
    </>
  );
}

function Industrial({ v }: { v: number }) {
  const bays = 5 + (v % 2);
  const bw = 230 / bays;
  return (
    <>
      <path
        d={
          `M40 ${GROUND} V${GROUND - 70} ` +
          Array.from({ length: bays })
            .map((_, i) => `L${40 + i * bw + bw * 0.75} ${GROUND - 104} L${40 + (i + 1) * bw} ${GROUND - 70}`)
            .join(" ") +
          ` V${GROUND}`
        }
      />
      {Array.from({ length: bays }).map((_, i) => (
        <line key={i} x1={40 + i * bw + bw * 0.75} x2={40 + i * bw + bw * 0.75} y1={GROUND - 104} y2={GROUND - 70} strokeOpacity={0.35} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={`d${i}`} x={52 + i * 36} y={GROUND - 34} width={24} height={34} fill="rgba(244,242,237,0.08)" />
      ))}
      <rect x={292} y={GROUND - 150} width={30} height={150} rx={0} />
      <path d={`M292 ${GROUND - 150} Q307 ${GROUND - 168} 322 ${GROUND - 150}`} />
      <rect x={330} y={GROUND - 130} width={30} height={130} />
      <path d={`M330 ${GROUND - 130} Q345 ${GROUND - 148} 360 ${GROUND - 130}`} />
      <line x1={307} x2={345} y1={GROUND - 176} y2={GROUND - 176} strokeOpacity={0.5} />
    </>
  );
}

function Infrastructure() {
  const deck = GROUND - 92;
  return (
    <>
      <path d={`M10 ${deck} H390 M10 ${deck + 10} H390`} />
      {[80, 160, 240, 320].map((x) => (
        <path key={x} d={`M${x - 8} ${deck + 10} V${GROUND + 14} M${x + 8} ${deck + 10} V${GROUND + 14} M${x - 16} ${GROUND + 14} H${x + 16}`} />
      ))}
      {[0, 80, 160, 240, 320].map((x) => (
        <path key={`a${x}`} d={`M${x + 8} ${deck + 10} Q${x + 40} ${deck + 46} ${x + 72} ${deck + 10}`} strokeOpacity={0.4} />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={i} x1={20 + i * 19} x2={20 + i * 19} y1={deck} y2={deck - 12} strokeOpacity={0.35} />
      ))}
      <line x1={10} x2={390} y1={deck - 12} y2={deck - 12} strokeOpacity={0.35} />
      <path d={`M0 ${GROUND + 22} Q100 ${GROUND + 8} 200 ${GROUND + 22} T400 ${GROUND + 22}`} strokeOpacity={0.3} />
    </>
  );
}

export default function ProjectVisual({ type, seed, label }: { type: ProjectType; seed: string; label?: string }) {
  const v = hash(seed);
  const gid = `g-${v.toString(36)}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={label ?? type}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <pattern id={`${gid}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="#121110" />
      <rect width={W} height={H} fill={`url(#${gid}-grid)`} />
      <g fill="none" stroke="#f4f2ed" strokeWidth={1.4} strokeOpacity={0.85}>
        {type === "residential" && <Residential v={v} />}
        {type === "commercial" && <Office v={v} />}
        {type === "public" && <PublicBuilding />}
        {type === "industrial" && <Industrial v={v} />}
        {type === "civil" && <Infrastructure />}
        {type === "fitout" && <PublicBuilding />}
        <line x1={0} x2={W} y1={GROUND} y2={GROUND} strokeOpacity={0.9} />
      </g>
      {/* cotation */}
      <g stroke="#b08d57" strokeWidth={1} fill="none">
        <path d={`M24 ${GROUND + 30} H${W - 24} M24 ${GROUND + 24} V${GROUND + 36} M${W - 24} ${GROUND + 24} V${GROUND + 36}`} />
      </g>
      <polygon points={`0,0 ${W * 0.62},0 0,${H * 0.9}`} fill={`url(#${gid})`} />
    </svg>
  );
}

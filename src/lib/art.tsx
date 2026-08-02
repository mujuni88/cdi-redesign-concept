/**
 * Course artwork.
 *
 * A Netflix card shows a still from the film. These show a still from the
 * analysis: every poster is the actual chart type that course teaches you to
 * produce — a volcano plot for differential expression, a Manhattan plot for
 * GWAS, a PCoA ordination for microbiome diversity. The shapes are generated
 * from plausible distributions rather than drawn by hand, so they read as data
 * rather than as decoration.
 *
 * Everything is deterministic (seeded PRNG) so server and client render the
 * same pixels, and everything is inline SVG so there are no image requests.
 */

export type ArtVariant =
  | "volcano"
  | "pcoa"
  | "umap"
  | "manhattan"
  | "heatmap"
  | "roc"
  | "regression"
  | "smallmultiples"
  | "joins"
  | "timeline"
  | "funnel"
  | "pipeline"
  | "cleaning";

/** mulberry32 — small, fast, and stable across environments. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Quantize to 4dp. Math.log/cos/sin/pow are not bit-identical across JS
 * engines, so Node and the browser disagree in the last decimal and React
 * reports a hydration mismatch on the SVG coordinates. Rounding well above
 * that error makes server and client agree exactly.
 */
const q = (n: number) => Math.round(n * 1e4) / 1e4;

/** Box–Muller, so scatter clouds look sampled rather than sprinkled. */
function normal(rand: () => number) {
  const u = Math.max(rand(), 1e-9);
  const v = rand();
  return q(Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v));
}

const W = 320;
const H = 200;

const VIRIDIS = ["#440154", "#414487", "#31688e", "#21918c", "#35b779", "#90d743"];

type ArtProps = { seed?: number; className?: string };

function Frame({
  children,
  gradientId,
  from,
  to,
}: {
  children: React.ReactNode;
  gradientId: string;
  from: string;
  to: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${gradientId})`} />
      {children}
    </svg>
  );
}

/* ── Differential expression ─────────────────────────────────────────────── */

function Volcano({ seed = 7 }: ArtProps) {
  const rand = rng(seed);
  const id = `v${seed}`;
  const pts = Array.from({ length: 260 }, () => {
    const fc = normal(rand) * 1.5;
    // Significance rises with |fold change|, which is what makes the V shape.
    const p = Math.abs(normal(rand)) * 1.6 + Math.abs(fc) * 1.5;
    return { fc, p };
  });
  const x = (fc: number) => W / 2 + fc * 22;
  const y = (p: number) => H - 14 - p * 13;

  return (
    <Frame gradientId={id} from="#0b1f28" to="#06131a">
      <line
        x1={0}
        x2={W}
        y1={y(3.2)}
        y2={y(3.2)}
        stroke="#f7c546"
        strokeWidth={0.6}
        strokeDasharray="3 3"
        opacity={0.5}
      />
      {pts.map((pt, i) => {
        const sig = pt.p > 3.2 && Math.abs(pt.fc) > 1;
        const up = pt.fc > 0;
        return (
          <circle
            key={i}
            cx={x(pt.fc)}
            cy={y(pt.p)}
            r={sig ? 2.4 : 1.5}
            fill={sig ? (up ? "#f7c546" : "#21918c") : "#3d5a66"}
            opacity={sig ? 0.95 : 0.5}
          />
        );
      })}
    </Frame>
  );
}

/* ── Microbiome ordination ───────────────────────────────────────────────── */

function Pcoa({ seed = 3 }: ArtProps) {
  const rand = rng(seed);
  const id = `p${seed}`;
  const groups = [
    { cx: 110, cy: 90, color: "#21918c" },
    { cx: 215, cy: 118, color: "#f7c546" },
  ];
  return (
    <Frame gradientId={id} from="#08202a" to="#06131a">
      <line x1={0} x2={W} y1={H / 2} y2={H / 2} stroke="#1d3641" strokeWidth={0.6} />
      <line x1={W / 2} x2={W / 2} y1={0} y2={H} stroke="#1d3641" strokeWidth={0.6} />
      {groups.map((g, gi) => (
        <g key={gi}>
          <ellipse
            cx={g.cx}
            cy={g.cy}
            rx={42}
            ry={30}
            fill={g.color}
            opacity={0.09}
            stroke={g.color}
            strokeOpacity={0.35}
            strokeWidth={0.8}
          />
          {Array.from({ length: 26 }, (_, i) => (
            <circle
              key={i}
              cx={g.cx + normal(rand) * 19}
              cy={g.cy + normal(rand) * 13}
              r={2.6}
              fill={g.color}
              opacity={0.85}
            />
          ))}
        </g>
      ))}
    </Frame>
  );
}

/* ── Single-cell clusters ────────────────────────────────────────────────── */

function Umap({ seed = 11 }: ArtProps) {
  const rand = rng(seed);
  const id = `u${seed}`;
  const clusters = [
    { cx: 78, cy: 72, n: 46, c: VIRIDIS[0] },
    { cx: 148, cy: 118, n: 54, c: VIRIDIS[2] },
    { cx: 214, cy: 62, n: 42, c: VIRIDIS[3] },
    { cx: 246, cy: 140, n: 34, c: VIRIDIS[4] },
    { cx: 108, cy: 158, n: 28, c: VIRIDIS[5] },
  ];
  return (
    <Frame gradientId={id} from="#0a1a24" to="#06131a">
      {clusters.map((cl, ci) => (
        <g key={ci}>
          {Array.from({ length: cl.n }, (_, i) => (
            <circle
              key={i}
              cx={cl.cx + normal(rand) * 15}
              cy={cl.cy + normal(rand) * 12}
              r={2.2}
              fill={cl.c}
              opacity={0.9}
            />
          ))}
        </g>
      ))}
    </Frame>
  );
}

/* ── GWAS ────────────────────────────────────────────────────────────────── */

function Manhattan({ seed = 5 }: ArtProps) {
  const rand = rng(seed);
  const id = `m${seed}`;
  const bands = 8;
  const perBand = 34;
  const peaks = [2, 5];
  const pts: { x: number; y: number; c: string }[] = [];

  for (let b = 0; b < bands; b++) {
    for (let i = 0; i < perBand; i++) {
      const x = (b * perBand + i) * (W / (bands * perBand));
      let p = Math.abs(normal(rand)) * 1.4 + 0.4;
      // A couple of chromosomes carry a real signal.
      if (peaks.includes(b) && Math.abs(i - perBand / 2) < 4) {
        p += 6 - Math.abs(i - perBand / 2);
      }
      const hit = p > 6;
      pts.push({
        x,
        y: H - 12 - p * 12,
        c: hit ? "#f7c546" : b % 2 === 0 ? "#31688e" : "#21918c",
      });
    }
  }

  return (
    <Frame gradientId={id} from="#09202b" to="#06131a">
      <line
        x1={0}
        x2={W}
        y1={H - 12 - 6 * 12}
        y2={H - 12 - 6 * 12}
        stroke="#f7c546"
        strokeWidth={0.6}
        strokeDasharray="3 3"
        opacity={0.5}
      />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={1.7} fill={p.c} opacity={0.85} />
      ))}
    </Frame>
  );
}

/* ── Proteomics abundance heatmap ────────────────────────────────────────── */

function Heatmap({ seed = 13 }: ArtProps) {
  const rand = rng(seed);
  const id = `h${seed}`;
  const cols = 16;
  const rows = 9;
  const cw = W / cols;
  const ch = (H - 20) / rows;
  return (
    <Frame gradientId={id} from="#0a1b24" to="#06131a">
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          // Row-blocked structure so it reads as clustered, not as noise.
          const base = q(Math.sin(r * 1.1)) * 0.5 + 0.5;
          const v = Math.min(0.99, Math.max(0, base * 0.7 + rand() * 0.5));
          const idx = Math.min(VIRIDIS.length - 1, Math.floor(v * VIRIDIS.length));
          return (
            <rect
              key={`${r}-${c}`}
              x={c * cw}
              y={12 + r * ch}
              width={cw - 1}
              height={ch - 1}
              fill={VIRIDIS[idx]}
              opacity={0.85}
            />
          );
        }),
      )}
    </Frame>
  );
}

/* ── Model evaluation ────────────────────────────────────────────────────── */

function Roc({ seed = 17 }: ArtProps) {
  const id = `r${seed}`;
  const pad = 26;
  const size = H - pad * 2;
  const x0 = (W - size) / 2;
  const y0 = pad;
  // A concave ROC curve: y = x^0.32 gives a believable AUC ≈ 0.88.
  const pts = Array.from({ length: 40 }, (_, i) => {
    const t = i / 39;
    return [x0 + t * size, y0 + size - q(Math.pow(t, 0.32)) * size];
  });
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const area = `${d} L${x0 + size},${y0 + size} L${x0},${y0 + size} Z`;

  return (
    <Frame gradientId={id} from="#0a1c26" to="#06131a">
      <rect x={x0} y={y0} width={size} height={size} fill="none" stroke="#1d3641" strokeWidth={0.8} />
      <line
        x1={x0}
        y1={y0 + size}
        x2={x0 + size}
        y2={y0}
        stroke="#3d5a66"
        strokeWidth={0.8}
        strokeDasharray="3 3"
      />
      <path d={area} fill="#21918c" opacity={0.18} />
      <path d={d} fill="none" stroke="#35b779" strokeWidth={2.2} strokeLinecap="round" />
    </Frame>
  );
}

/* ── Foundations: scatter and fit ────────────────────────────────────────── */

function Regression({ seed = 23 }: ArtProps) {
  const rand = rng(seed);
  const id = `g${seed}`;
  const pts = Array.from({ length: 46 }, () => {
    const x = rand();
    const y = 0.22 + x * 0.62 + normal(rand) * 0.09;
    return { x: 28 + x * (W - 56), y: H - 26 - y * (H - 60) };
  });
  return (
    <Frame gradientId={id} from="#0a1e27" to="#06131a">
      <line x1={28} y1={H - 26} x2={W - 28} y2={H - 26} stroke="#1d3641" strokeWidth={0.8} />
      <line x1={28} y1={22} x2={28} y2={H - 26} stroke="#1d3641" strokeWidth={0.8} />
      <line
        x1={28}
        y1={H - 26 - 0.24 * (H - 60)}
        x2={W - 28}
        y2={H - 26 - 0.85 * (H - 60)}
        stroke="#f7c546"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.9}
      />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.8} fill="#31688e" opacity={0.9} />
      ))}
    </Frame>
  );
}

/* ── Visualization: small multiples ──────────────────────────────────────── */

function SmallMultiples({ seed = 29 }: ArtProps) {
  const rand = rng(seed);
  const id = `s${seed}`;
  const cols = 3;
  const rows = 2;
  const pw = (W - 24) / cols;
  const ph = (H - 24) / rows;
  return (
    <Frame gradientId={id} from="#0a1d26" to="#06131a">
      {Array.from({ length: rows * cols }, (_, k) => {
        const cx = 12 + (k % cols) * pw;
        const cy = 12 + Math.floor(k / cols) * ph;
        const bars = 6;
        const bw = (pw - 14) / bars;
        return (
          <g key={k}>
            <rect
              x={cx}
              y={cy}
              width={pw - 8}
              height={ph - 8}
              fill="#0d2028"
              stroke="#1d3641"
              strokeWidth={0.7}
              rx={3}
            />
            {Array.from({ length: bars }, (_, b) => {
              const h = 8 + rand() * (ph - 30);
              return (
                <rect
                  key={b}
                  x={cx + 6 + b * bw}
                  y={cy + ph - 12 - h}
                  width={bw - 2.5}
                  height={h}
                  fill={VIRIDIS[(k + b) % VIRIDIS.length]}
                  opacity={0.9}
                  rx={1}
                />
              );
            })}
          </g>
        );
      })}
    </Frame>
  );
}

/* ── SQL joins ───────────────────────────────────────────────────────────── */

function Joins({ seed = 31 }: ArtProps) {
  const id = `j${seed}`;
  const table = (x: number, y: number, label: string) => (
    <g>
      <rect x={x} y={y} width={78} height={58} rx={4} fill="#0d2028" stroke="#21918c" strokeWidth={1} />
      <rect x={x} y={y} width={78} height={13} rx={4} fill="#21918c" opacity={0.28} />
      <text x={x + 6} y={y + 9.5} fill="#8aa4ad" fontSize={7} fontFamily="monospace">
        {label}
      </text>
      {[0, 1, 2].map((r) => (
        <rect key={r} x={x + 6} y={y + 20 + r * 11} width={66} height={5} rx={1} fill="#1d3641" />
      ))}
    </g>
  );
  return (
    <Frame gradientId={id} from="#0a1e28" to="#06131a">
      {table(24, 40, "patients")}
      {table(216, 100, "encounters")}
      <path
        d="M102,62 C150,62 168,124 216,124"
        fill="none"
        stroke="#f7c546"
        strokeWidth={1.6}
        strokeDasharray="4 3"
      />
      <circle cx={102} cy={62} r={3.2} fill="#f7c546" />
      <circle cx={216} cy={124} r={3.2} fill="#f7c546" />
    </Frame>
  );
}

/* ── Clinical timeline ───────────────────────────────────────────────────── */

function Timeline({ seed = 37 }: ArtProps) {
  const rand = rng(seed);
  const id = `t${seed}`;
  const lanes = 4;
  return (
    <Frame gradientId={id} from="#0a1c26" to="#06131a">
      {Array.from({ length: lanes }, (_, l) => {
        const y = 42 + l * 34;
        const n = 3 + Math.floor(rand() * 3);
        return (
          <g key={l}>
            <line x1={24} x2={W - 24} y1={y} y2={y} stroke="#1d3641" strokeWidth={1} />
            {Array.from({ length: n }, (_, i) => {
              const cx = 40 + rand() * (W - 80);
              return (
                <circle key={i} cx={cx} cy={y} r={4} fill={VIRIDIS[(l + i) % VIRIDIS.length]} />
              );
            })}
          </g>
        );
      })}
      {/* The index event: everything is measured relative to this line. */}
      <line x1={132} x2={132} y1={26} y2={H - 20} stroke="#f7c546" strokeWidth={1.4} strokeDasharray="4 3" />
      <text x={137} y={34} fill="#f7c546" fontSize={7.5} fontFamily="monospace">
        index
      </text>
    </Frame>
  );
}

/* ── Study screening funnel ──────────────────────────────────────────────── */

function Funnel({ seed = 41 }: ArtProps) {
  const id = `f${seed}`;
  const steps = [
    { w: 250, label: "1,284 found" },
    { w: 196, label: "412 screened" },
    { w: 140, label: "96 eligible" },
    { w: 84, label: "18 included" },
  ];
  return (
    <Frame gradientId={id} from="#0a1d27" to="#06131a">
      {steps.map((s, i) => (
        <g key={i}>
          <rect
            x={(W - s.w) / 2}
            y={26 + i * 40}
            width={s.w}
            height={26}
            rx={4}
            fill={VIRIDIS[i + 1]}
            opacity={0.85}
          />
          <text
            x={W / 2}
            y={43 + i * 40}
            fill="#06131a"
            fontSize={9}
            fontFamily="monospace"
            textAnchor="middle"
          >
            {s.label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

/* ── Acquisition pipeline ────────────────────────────────────────────────── */

function Pipeline({ seed = 43 }: ArtProps) {
  const id = `pl${seed}`;
  const nodes = [
    { x: 46, y: 60 },
    { x: 128, y: 60 },
    { x: 128, y: 140 },
    { x: 214, y: 100 },
    { x: 282, y: 100 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 3],
    [3, 4],
  ];
  return (
    <Frame gradientId={id} from="#0a1e28" to="#06131a">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#21918c"
          strokeWidth={1.3}
          opacity={0.6}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={13} fill="#0d2028" stroke={VIRIDIS[i + 1]} strokeWidth={1.8} />
          <circle cx={n.x} cy={n.y} r={4.5} fill={VIRIDIS[i + 1]} />
        </g>
      ))}
    </Frame>
  );
}

/* ── The cleaning lesson: the duplicate rows themselves ──────────────────── */

function Cleaning({ seed = 3 }: ArtProps) {
  const id = `c${seed}`;
  const rows = 8;
  const dupes = [2, 5];
  return (
    <Frame gradientId={id} from="#0d2430" to="#06131a">
      {Array.from({ length: rows }, (_, r) => {
        const y = 24 + r * 20;
        const isDupe = dupes.includes(r);
        return (
          <g key={r}>
            <rect
              x={22}
              y={y}
              width={W - 44}
              height={15}
              rx={2}
              fill={isDupe ? "#f7c546" : "#12303c"}
              opacity={isDupe ? 0.22 : 1}
            />
            {[0, 1, 2, 3, 4].map((c) => (
              <rect
                key={c}
                x={30 + c * 54}
                y={y + 5}
                width={c === 4 ? 40 : 30}
                height={5}
                rx={1}
                fill={isDupe ? "#f7c546" : "#2b4a58"}
                opacity={isDupe ? 0.95 : 1}
              />
            ))}
            {isDupe && (
              <text x={W - 34} y={y + 11} fill="#f7c546" fontSize={9} fontFamily="monospace">
                ▲
              </text>
            )}
          </g>
        );
      })}
    </Frame>
  );
}

const REGISTRY: Record<ArtVariant, (p: ArtProps) => React.JSX.Element> = {
  volcano: Volcano,
  pcoa: Pcoa,
  umap: Umap,
  manhattan: Manhattan,
  heatmap: Heatmap,
  roc: Roc,
  regression: Regression,
  smallmultiples: SmallMultiples,
  joins: Joins,
  timeline: Timeline,
  funnel: Funnel,
  pipeline: Pipeline,
  cleaning: Cleaning,
};

/** What the poster is actually showing, for the card's caption. */
export const ART_CAPTION: Record<ArtVariant, string> = {
  volcano: "volcano plot · log₂FC vs −log₁₀p",
  pcoa: "Bray-Curtis PCoA ordination",
  umap: "UMAP · clustered cell populations",
  manhattan: "Manhattan plot · genome-wide",
  heatmap: "abundance heatmap · clustered",
  roc: "ROC curve · AUC 0.88",
  regression: "fitted linear model",
  smallmultiples: "small multiples · faceted",
  joins: "relational join",
  timeline: "patient timeline · index event",
  funnel: "study screening funnel",
  pipeline: "acquisition workflow",
  cleaning: "identical rows, flagged",
};

export function CourseArt({
  variant,
  seed,
  className = "",
}: {
  variant: ArtVariant;
  seed?: number;
  className?: string;
}) {
  const Component = REGISTRY[variant];
  return (
    <div className={`overflow-hidden ${className}`}>
      <Component seed={seed} />
    </div>
  );
}

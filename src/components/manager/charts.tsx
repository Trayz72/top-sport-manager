import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Series = { key: string; label: string; color: string };

const axis = {
  stroke: "var(--color-border)",
  tick: { fill: "var(--color-muted-foreground)", fontSize: 11 },
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  backgroundColor: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "var(--color-popover-foreground)",
};

export function OperationsChart({
  type,
  data,
  xKey,
  series,
  height = 260,
  layout = "vertical",
}: {
  type: "bar" | "area";
  data: Record<string, unknown>[];
  xKey: string;
  series: Series[];
  height?: number;
  layout?: "vertical" | "horizontal";
}) {
  // Horizontal (category-on-the-left) bars are rendered as a lightweight
  // CSS bar list — recharts' vertical layout collapses category bands here.
  if (type === "bar" && layout === "horizontal") {
    const s = series[0]!;
    const max = Math.max(
      1,
      ...data.map((d) => Number(d[s.key] ?? 0)),
    );
    return (
      <div className="space-y-3" style={{ minHeight: height }}>
        {data.map((d, i) => {
          const value = Number(d[s.key] ?? 0);
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="w-24 shrink-0 truncate text-xs text-muted-foreground">
                {String(d[xKey])}
              </span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(value / max) * 100}%`, backgroundColor: s.color }}
                />
              </div>
              <span className="numeric w-10 shrink-0 text-right text-xs font-semibold">
                {value}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>

      {type === "bar" ? (
        <BarChart
          data={data}
          layout={layout === "horizontal" ? "vertical" : "horizontal"}
          margin={{ top: 8, right: 8, bottom: 0, left: layout === "horizontal" ? 24 : 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          {layout === "horizontal" ? (
            <>
              <XAxis type="number" {...axis} />
              <YAxis
                type="category"
                dataKey={xKey}
                width={90}
                interval={0}
                {...axis}
              />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} {...axis} />
              <YAxis {...axis} width={38} />
            </>
          )}
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-accent)" }} />
          {series.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label}
              fill={s.color}
              radius={layout === "horizontal" ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              maxBarSize={28}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      ) : (
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            {series.map((s) => (
              <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey={xKey} {...axis} />
          <YAxis {...axis} width={48} />
          <Tooltip contentStyle={tooltipStyle} />
          {series.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={2}
              fill={`url(#grad-${s.key})`}
            />
          ))}
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
}

const pieColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function SharePie({
  data,
  height = 260,
}: {
  data: { name: string; value: number }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={54}
          outerRadius={84}
          paddingAngle={2}
          stroke="var(--color-card)"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={pieColors[i % pieColors.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: 11, color: "var(--color-muted-foreground)" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

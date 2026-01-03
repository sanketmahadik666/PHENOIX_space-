import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 550 },
  { name: "Thu", value: 450 },
  { name: "Fri", value: 600 },
  { name: "Sat", value: 500 },
  { name: "Sun", value: 700 },
];

export function StatsChart() {
  // Custom Ethereal Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border/50 bg-background/80 p-3 shadow-xl backdrop-blur-md">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm font-bold text-primary">
            {payload[0].value} Visitors
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full h-[400px] border-none shadow-none bg-transparent">
        <CardHeader>
            <CardTitle className="text-xl font-light">Weekly Traffic</CardTitle>
            <CardDescription>
                Overview of platform activity
            </CardDescription>
        </CardHeader>
        <CardContent className="h-[320px] w-full pl-0">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false} 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeOpacity={0.1}
                />
                <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    dy={10}
                />
                <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    dx={-10}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                />
                </AreaChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}

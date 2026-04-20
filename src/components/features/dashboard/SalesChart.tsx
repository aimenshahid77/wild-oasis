import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SalesChart({ dashboard, day }: { dashboard: any[]; day: number }) {
  const allDates = Array.from({ length: day }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (day - 1 - i));
    return date.toISOString().split("T")[0];
  });

  const chartData = allDates.map((date) => ({
    date: new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),

    totalSales: dashboard
      .filter((b) => b.startDate.startsWith(date))
      .reduce((sum, b) => sum + b.totalPrice, 0),
    extrasSales: dashboard
      .filter((b) => b.startDate.startsWith(date))
      .reduce((sum, b) => sum + b.extrasPrice, 0),
  }));

  console.log(chartData);
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">
        Sales from {chartData.at(0)?.date} — {chartData.at(-1)?.date}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke="#6366f1"
            fill="#e0e7ff"
            name="Total Sales"
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke="#22c55e"
            fill="#dcfce7"
            name="Extras Sales"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;

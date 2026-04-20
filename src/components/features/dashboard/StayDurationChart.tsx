import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function StayDurationChart({ dashboard }: { dashboard: any[] }) {
  const categories = [
    { duration: "1 night", min: 1, max: 1 },
    { duration: "2 nights", min: 2, max: 2 },
    { duration: "3 nights", min: 3, max: 3 },
    { duration: "4-5 nights", min: 4, max: 5 },
    { duration: "6-7 nights", min: 6, max: 7 },
    { duration: "8-14 nights", min: 8, max: 14 },
    { duration: "15-21 nights", min: 15, max: 21 },
    { duration: "21+ nights", min: 21, max: 1000 },
  ];

  const chartData = categories.map((category) => ({
    duration: category.duration,
    value: dashboard.filter(
      (booking: any) =>
        booking.numNights >= category.min && booking.numNights <= category.max,
    ).length,
  }));

  console.log(chartData);
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Stay duration summary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="duration"
            innerRadius={85}
            outerRadius={110}
          >
            {chartData.map((_, index) => (
              <Cell
                key={index}
                fill={
                  [
                    "#ef4444",
                    "#f97316",
                    "#eab308",
                    "#22c55e",
                    "#14b8a6",
                    "#3b82f6",
                    "#8b5cf6",
                    "#ec4899",
                  ][index]
                }
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StayDurationChart;

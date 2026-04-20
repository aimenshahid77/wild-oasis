import { useBookingParams } from "@/hooks/useBookingParams";
function DashboardFilter() {
  const { day, setDay } = useBookingParams();
  const base = "px-4 py-2 text-sm font-medium rounded-md transition";
  const active = "bg-violet-600 text-white shadow";
  const inactive = "bg-white text-gray-600 border hover:bg-gray-100";

  const filters = [
    { label: "Last 7 days", value: 7 },
    { label: "Last 30 days", value: 30 },
    { label: "Last 90 days", value: 90 },
  ];
  return (
    <>
      <div>
        {filters.map((filters) => (
          <button
            key={filters.value}
            onClick={() => setDay(filters.value)}
            className={`${base} ${day === filters.value ? active : inactive}`}
          >
            {filters.label}
          </button>
        ))}
      </div>
    </>
  );
}

export default DashboardFilter;

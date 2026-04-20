import { useBookingParams } from "@/hooks/useBookingParams";

function BookingFilters() {
  const { status, setStatus } = useBookingParams();

  const base = "px-4 py-2 text-sm font-medium rounded-md transition";
  const active = "bg-violet-600 text-white shadow";
  const inactive = "bg-white text-gray-600 border hover:bg-gray-100";

  const filters = [
    { label: " All", value: "all" },
    { label: " Check-Out", value: "checked-out" },
    { label: " Unconfirmed", value: "unconfirmed" },
    { label: " Check-In", value: "checked-in" },
  ];

  return (
    <div>
      {filters.map((filters) => (
        <button
          key={filters.value}
          onClick={() => setStatus(filters.value)}
          className={`${base} ${status === filters.value ? active : inactive}`}
        >
          {filters.label}
        </button>
      ))}
    </div>
  );
}

export default BookingFilters;

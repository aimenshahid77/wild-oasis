import BookingsTable from "@/components/features/bookings/BookingsTable";
import BookingFilters from "../features/bookings/BookingFilters";
import { BookingSortBy } from "../features/bookings/BookingSortBy";

export default function Bookings() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">All Bookings</h1>
        <div className="flex items-center gap-3">
          <BookingFilters />
          <BookingSortBy />
        </div>
      </div>

      <BookingsTable />
    </div>
  );
}

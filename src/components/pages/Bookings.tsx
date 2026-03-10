import BookingsTable from "../features/bookings/BookingsTable";

const Bookings = () => {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-3xl font-bold">All Bookings</h1>
      <BookingsTable />
    </div>
  );
};

export default Bookings;

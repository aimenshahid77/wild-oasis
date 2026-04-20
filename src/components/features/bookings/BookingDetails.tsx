import { getBookingsById } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MapPin } from "lucide-react";

function BookingDetails({ bookingId }: { bookingId: number }) {
  const { data: bookingDetails } = useQuery({
    queryKey: ["booking-by-id"],
    queryFn: () => getBookingsById(bookingId),
  });

  if (!bookingDetails) return null;

  const {
    cabins: { name, regularPrice },
  } = bookingDetails;

  const {
    guests: { countryFlag, email, fullName, created_at, nationalID },
  } = bookingDetails;

  const {
    totalPrice,
    status,
    numNights,
    id,
    extrasPrice,
    startDate,
    endDate,
    numGuests,
    isPaid,
    hasBreakfast,
  } = bookingDetails;

  const formattedDate1 = format(new Date(startDate), "dd MMMM yyyy");
  const formattedDate2 = format(new Date(endDate), "dd MMMM yyyy");
  const formattedDate3 = format(
    new Date(created_at),
    "yyyy-MM-dd 'at' HH:mm:ss",
  );

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Booking #{id}</h1>
        <Badge className="capitalize text-sm">{status}</Badge>
      </div>

      <div className="bg-violet-500 text-white rounded-lg p-5 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-lg font-medium">
          <MapPin size={20} />
          {numNights} Nights in Cabin {name}
        </div>
        <p className="text-sm opacity-90">
          From {formattedDate1} to {formattedDate2}
        </p>
      </div>

      <div className="flex items-center gap-4 border rounded-lg p-4">
        <img
          src={countryFlag}
          alt="country flag"
          className="w-12 h-12 rounded object-cover"
        />

        <div className="flex flex-col">
          <h1 className="font-semibold text-lg">
            {fullName} + {numGuests} Guests
          </h1>
          <p className="text-sm text-gray-600">{email}</p>
          <p className="text-sm text-gray-500">{nationalID}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border rounded-lg p-4">
        <h1 className="font-medium">Has Breakfast:</h1>
        <span className="text-gray-700">{hasBreakfast ? "Yes" : "No"}</span>
      </div>

      <div className="border rounded-lg p-4 space-y-2">
        <h1 className="font-semibold text-lg">Total Price: {totalPrice}</h1>
        <p className="text-sm text-gray-600">
          Price of breakfast: {extrasPrice}
        </p>
        <p className="text-sm text-gray-600">Price of cabins: {regularPrice}</p>

        <p
          className={`text-sm font-medium ${
            isPaid ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPaid ? "Has been paid" : "Needs to be paid"}
        </p>
      </div>

      <p className="text-sm text-gray-500">Booked at: {formattedDate3}</p>
    </div>
  );
}

export default BookingDetails;

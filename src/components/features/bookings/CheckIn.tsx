import { getBookingsById } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { format } from "date-fns";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useCheckin } from "@/hooks/useBookings";
import { toast } from "sonner";

function CheckIn() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [checkbox, setcheckbox] = useState(false);

  const { data: bookingDetails } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingsById(Number(bookingId)),
  });

  const { mutate, isPending } = useCheckin();

  if (!bookingDetails) return null;

  const {
    cabins: { name, regularPrice },
    guests: { countryFlag, email, fullName, created_at, nationalID },
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

  const start = format(new Date(startDate), "dd MMM yyyy");
  const end = format(new Date(endDate), "dd MMM yyyy");
  const created = format(new Date(created_at), "dd MMM yyyy, HH:mm");

  return (
    <div className="p-10 space-y-12">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl p-8 flex items-center justify-between shadow-lg">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Booking #{id}</h1>

          <div className="flex items-center gap-3 text-lg">
            <MapPin size={20} />
            {numNights} nights in <b>Cabin {name}</b>
          </div>

          <p className="opacity-90">
            {start} → {end}
          </p>
        </div>

        <div className="flex gap-3">
          <Badge className="bg-white text-black capitalize">{status}</Badge>
          <Badge variant={isPaid ? "default" : "destructive"}>
            {isPaid ? "Paid" : "Unpaid"}
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between border-b pb-6">
        <div className="flex items-center gap-5">
          <img
            src={countryFlag}
            alt="flag"
            className="w-14 h-14 rounded-lg object-cover shadow"
          />

          <div>
            <h2 className="text-xl font-semibold">
              {fullName} + {numGuests} guests
            </h2>
            <p className="text-gray-600">{email}</p>
            <p className="text-gray-500 text-sm">{nationalID}</p>
          </div>
        </div>

        <p className="text-gray-500 text-sm">Booked at {created}</p>
      </div>

      <div className="space-y-4 text-lg">
        <div className="flex justify-between">
          <span>Cabin price</span>
          <span>${regularPrice}</span>
        </div>

        <div className="flex justify-between">
          <span>Breakfast</span>
          <span>{hasBreakfast ? `$${extrasPrice}` : "Not included"}</span>
        </div>

        <div className="flex justify-between text-2xl font-bold pt-4 border-t">
          <span>Total price</span>
          <span>${totalPrice}</span>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl flex items-center justify-between">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={checkbox}
            onChange={() => setcheckbox(!checkbox)}
            className="w-4 h-4"
          />

          <span>
            Confirm that <b>{fullName}</b> has paid <b>${totalPrice}</b>
          </span>
        </label>

        <div className="flex gap-4">
          <button
            disabled={!checkbox || isPending}
            onClick={() =>
              mutate(bookingId, {
                onSuccess: () => {
                  toast.success("Booking checked in successfully");
                  navigate("/bookings");
                },
              })
            }
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300"
          >
            Check in booking
          </button>

          <button
            onClick={() => navigate("/bookings")}
            className="px-6 py-2 border rounded-lg hover:bg-gray-100"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;

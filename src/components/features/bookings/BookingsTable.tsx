import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBookings } from "@/hooks/useBookings";
import { useBookingParams } from "@/hooks/useBookingParams";
import BookingStatusBadge from "./BookingStatusBadge";
import BookingsPagination from "./BookingsPagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Eye, MapPin, Trash2 } from "lucide-react";
import SeeAllDialogue from "./SeeAllDialogue";
import { useNavigate } from "react-router";
import { useCheckOut } from "@/hooks/useBookings";
import { toast } from "sonner";
import { useDeleteBooking } from "@/hooks/useBookings";

const ITEMS_PER_PAGE = 10;

export default function BookingsTable() {
  const { bookings: allBookings, isLoading } = useBookings();
  const { page, status, sortBy } = useBookingParams();
  const navigate = useNavigate();
  const { mutate: checkOut } = useCheckOut();
  const { mutate: deletebooking } = useDeleteBooking();

  // Paginate
  const filteredBookings =
    status === "all"
      ? allBookings
      : allBookings.filter((booking) => booking.status === status);

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === "date-recent")
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    if (sortBy === "date-earlier")
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    if (sortBy === "amount-high") return b.totalPrice - a.totalPrice;
    if (sortBy === "amount-low") return a.totalPrice - b.totalPrice;
    return 0; // no sort if param is missing
  });

  const totalCount = sortedBookings.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const bookings = sortedBookings.slice(start, start + ITEMS_PER_PAGE);

  if (isLoading)
    return <p className="text-muted-foreground p-4">Loading bookings...</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Cabin</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">
                  {booking.cabins?.name ?? "—"}
                </TableCell>

                <TableCell>
                  <div className="font-medium">
                    {booking.guests?.fullName ?? "—"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {booking.guests?.email ?? "—"}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="font-medium">
                    {booking.numNights} night stay
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {booking.startDate} to {booking.endDate}
                  </div>
                </TableCell>

                <TableCell>
                  <BookingStatusBadge status={booking.status} />
                </TableCell>

                <TableCell className="text-right font-medium">
                  ${booking.totalPrice.toFixed(2)}
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="p-1">
                        <Ellipsis size={20} />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-48">
                      <DropdownMenuGroup className="space-y-1">
                        <DropdownMenuLabel
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Eye size={16} />
                          <SeeAllDialogue bookingId={booking.id} />{" "}
                          {/* If SeeAllDialogue renders a button/modal trigger */}
                        </DropdownMenuLabel>

                        {booking.status === "unconfirmed" && (
                          <DropdownMenuLabel
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1"
                            onClick={() => navigate(`/checkin/${booking.id}`)}
                          >
                            <MapPin size={16} /> CheckIn
                          </DropdownMenuLabel>
                        )}

                        {booking.status === "checked-in" && (
                          <DropdownMenuLabel
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1"
                            onClick={() =>
                              checkOut(booking.id, {
                                onSuccess: () =>
                                  toast.success(
                                    "Booking checked out successfully",
                                  ),
                              })
                            }
                          >
                            <MapPin size={16} /> Check-out
                          </DropdownMenuLabel>
                        )}

                        <DropdownMenuLabel
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1 text-red-600"
                          onClick={() =>
                            deletebooking(booking.id, {
                              onSuccess: () =>
                                toast.success("Booking deleted successfully"),
                            })
                          }
                        >
                          <Trash2 size={16} /> Delete
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <BookingsPagination totalPages={totalPages} totalCount={totalCount} />
    </div>
  );
}

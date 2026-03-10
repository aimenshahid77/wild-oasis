import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBookings } from "@/hooks/useBookings";
import { format, isToday } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function BookingsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, bookings, error, pageCount } = useBookings(currentPage);

  if (isLoading) return <p className="p-4 text-center">Loading bookings...</p>;
  if (error) return <p className="p-4 text-center text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border">
        <Table>
          {/* <TableCaption>A list of your bookings.</TableCaption> */}
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Cabin</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => {
              return (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.cabins?.name || `Cabin ${booking.cabinId}`}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {booking.guests?.fullName || "Unknown Guest"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {booking.guests?.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>
                        {isToday(new Date(booking.startDate))
                          ? "Today"
                          : format(new Date(booking.startDate), "MMM dd yyyy")}{" "}
                        &mdash;{" "}
                        {format(new Date(booking.endDate), "MMM dd yyyy")}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {booking.numNights} night{booking.numNights > 1 ? "s" : ""}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        booking.status === "unconfirmed"
                          ? "bg-blue-100 text-blue-800"
                          : booking.status === "checked-in"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking.status.replace("-", " ")}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${booking.totalPrice?.toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pageCount > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < pageCount) setCurrentPage(currentPage + 1);
                }}
                className={currentPage === pageCount ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

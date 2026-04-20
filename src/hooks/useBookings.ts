import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkInBooking,
  checkOutBooking,
  deleteBooking,
  getBookings,
  type BookingWithRelations,
} from "@/services/apiBookings";

export function useBookings() {
  const { data: bookings = [], isLoading } = useQuery<BookingWithRelations[]>({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { bookings, isLoading };
}

export function useCheckin() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string | number ) => checkInBooking(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["today-activity"] });
    },
  });
  return { mutate, isPending };
}

export function useCheckOut() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string | number) => checkOutBooking(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["today-activity"] });
    },
  });
  return { mutate, isPending };
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string | number ) => deleteBooking(Number(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] }),
  });
  return { mutate, isPending };
}



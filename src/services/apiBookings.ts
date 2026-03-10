import supabase from "../helper/supabaseClient";
import type { Booking } from "../types";

export const PAGE_SIZE = 10;

export async function getBookings({
  page,
}: {
  page: number;
}): Promise<{ data: Booking[]; count: number }> {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)", { count: "exact" });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count: count || 0 };
}

import type { Tables } from "@/types/supabase";
import supabase from "../helper/supabaseClient";

export type BookingWithRelations = Tables<"bookings"> & {
  cabins: { name: string } | null;
  guests: { fullName: string; email: string } | null;
};

export async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select(`*, cabins(name), guests(fullName, email)`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}

export async function getBookingsById(id: number) {
  try {
    if (!id) throw new Error("ID is not defined.");
    const { data, error } = await supabase
      .from("bookings")
      .select(" *, cabins(*), guests(*)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to get Booking");
    }
  }
}

export async function checkInBooking(id: number) {
  try {
    if (!id) throw new Error("ID is not defined");
    const { data, error } = await supabase
      .from("bookings")
      .update({ status: "checked-in" })
      .eq("id", id);

    if (error) throw error;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("failed to get what you asked for.");
    }
  }
}

export async function checkOutBooking(id: number) {
  try {
    if (!id) throw new Error("ID is not defined");
    const { data, error } = await supabase
      .from("bookings")
      .update({ status: "checked-out" })
      .eq("id", id);

    if (error) throw error;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("failed to get what you asked for.");
    }
  }
}



export async function deleteBooking(id: number) {
  try {
    if (!id) throw new Error("ID is not defined");
    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("failed to get what you asked for.");
    }
  }
}

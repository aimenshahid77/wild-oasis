import supabase from "../helper/supabaseClient";
export async function getDashboardData(days: number) {
  try {
    if (!days) throw new Error("Day is not defined");
    const date = new Date();
    date.setDate(date.getDate() - days);
    const dateFromXDaysAgo = date.toISOString();
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .gte("startDate", dateFromXDaysAgo);

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

export async function getCabinsCount() {
  try {
    const { count, error } = await supabase
      .from("cabins")
      .select("*", { count: "exact", head: true });
    if (error) throw error;
    return count;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("failed to get what you asked for.");
    }
  }
}

export async function getStaysTodayActivity() {
  const today = new Date().toISOString().split("T")[0]
  const todayStart = `${today}T00:00:00`
  const todayEnd = `${today}T23:59:59`

  const { data: arrivals, error: error1 } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .eq("status", "unconfirmed")
    .gte("startDate", todayStart)
    .lte("startDate", todayEnd)

  const { data: departures, error: error2 } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .eq("status", "checked-in")
    .gte("endDate", todayStart)
    .lte("endDate", todayEnd)

  if (error1 || error2) throw new Error("Could not fetch today activity")

  return [...(arrivals || []), ...(departures || [])]
}

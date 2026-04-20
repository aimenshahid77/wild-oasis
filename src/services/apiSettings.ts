import supabase from "@/helper/supabaseClient";

export async function getSettings() {
  try {
    const { data: settings, error } = await supabase.from("settings").select("*").single();

    if (error) throw new Error(error.message);
    return settings;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

}

export async function updateSettings(newSettings: {minBookingLength: number, maxBookingLength: number, maxGuestsPerBooking: number, breakfastPrice: number}) {
  try {
  const { data, error } = await supabase
  .from('settings')
  .update(newSettings)
  .eq('id', 1)
  .select()
  if (error) throw new Error(error.message);
  return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

}

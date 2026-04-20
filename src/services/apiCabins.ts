import type { Tables, TablesInsert } from "@/types/supabase"; // adjust path if needed
import supabase from "../helper/supabaseClient";

type Cabin = Tables<"cabins">;
type InsertCabin = TablesInsert<"cabins">;

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function addCabin(
  newCabin: Omit<InsertCabin, "image"> & { image: File },
) {
  try {
    const imagePath = `${Date.now()}-${newCabin.image.name.replaceAll("/", "-")}`;

    const { data: imageData, error: imageError } = await supabase.storage
      .from("cabinimages")
      .upload(imagePath, newCabin.image);

    if (imageError) throw new Error(imageError.message);

    const { data: publicUrlData } = supabase.storage
      .from("cabinimages")
      .getPublicUrl(imageData.path);

    const publicUrl = publicUrlData.publicUrl;

    const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: publicUrl }])
      .select();

    if (error) throw new Error(error.message);

    return { data, message: "Cabin added successfully" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
}

export async function createCabin(cabin: InsertCabin): Promise<Cabin> {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabin])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function editCabin({
  id,
  updatedCabin,
}: {
  id: number;
  updatedCabin: Omit<InsertCabin, "image"> & { image: File | string };
}) {
  try {
    let publicUrl: string = updatedCabin.image as string;

    if (updatedCabin.image instanceof File) {
      const imagePath = `${Date.now()}-${updatedCabin.image.name.replaceAll("/", "-")}`;

      const { data: imageData, error: imageError } = await supabase.storage
        .from("cabinimages")
        .upload(imagePath, updatedCabin.image);

      if (imageError) throw new Error(imageError.message);

      const { data: publicUrlData } = supabase.storage
        .from("cabinimages")
        .getPublicUrl(imageData.path);

      publicUrl = publicUrlData.publicUrl;
    }

    const { data, error } = await supabase
      .from("cabins")
      .update({ ...updatedCabin, image: publicUrl })
      .eq("id", id)
      .select();

    if (error) throw new Error(error.message);

    return { data, message: "Cabin successfully edited" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong during editing");
    }
  }
}

export async function deleteCabin(id: number): Promise<void> {
  const { data: bookings } = await supabase
    .from("bookings")
    .select("id")
    .eq("cabinID", id);

  if (bookings && bookings.length > 0) {
    throw new Error("This cabin has existing bookings and cannot be deleted.");
  }

  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error(error.message); 

  // delete query and error message ( success and error mesg difference)
}

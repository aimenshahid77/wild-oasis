import type { TablesInsert } from "./supabase";

export type InsertCabin = Omit<TablesInsert<"cabins">, "image"> & {
  image: File;
};

import type { Cabins } from "@/types/cabins.types";

export function getFilteredAndSorted(
  cabins: Cabins[],
  discount: string,
  sortBy: string,
) {
  let result = cabins;
  if (discount === "no-discount")
    result = cabins.filter((c) => c.discount === 0);
  if (discount === "with-discount")
    result = cabins.filter((c) => c.discount > 0);

  const sorted = [...result];
  if (sortBy === "name-asc")
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "name-desc")
    sorted.sort((a, b) => b.name.localeCompare(a.name));
  if (sortBy === "price-asc")
    sorted.sort((a, b) => a.regularPrice - b.regularPrice);
  if (sortBy === "price-desc")
    sorted.sort((a, b) => b.regularPrice - a.regularPrice);
  if (sortBy === "capacity-asc")
    sorted.sort((a, b) => a.maxCapacity - b.maxCapacity);
  if (sortBy === "capacity-desc")
    sorted.sort((a, b) => b.maxCapacity - a.maxCapacity);

  return sorted;
}

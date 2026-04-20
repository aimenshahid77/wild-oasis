import { useSearchParams } from "react-router-dom";

export function useCabinParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const discount = searchParams.get("discount") ?? "all"; // "all" | "no-discount" | "with-discount"
  const sortBy = searchParams.get("sortBy") ?? "name-asc"; // default sort

  function setDiscount(value: string) {
    setSearchParams((prev) => {
      prev.set("discount", value);
      return prev; // preserves other existing params like sortBy
    });
  }

  function setSortBy(value: string) {
    setSearchParams((prev) => {
      prev.set("sortBy", value);
      return prev;
    });
  }

  return { discount, sortBy, setDiscount, setSortBy };
}



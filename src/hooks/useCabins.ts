import { useEffect, useState } from "react";
import { getCabins } from "../services/apiCabins";
import type { Cabin } from "../types";

export function useCabins() {
  const [isLoading, setIsLoading] = useState(true);
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCabins() {
      try {
        setIsLoading(true);
        const data = await getCabins();
        setCabins(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCabins();
  }, []);

  return { isLoading, cabins, error };
}

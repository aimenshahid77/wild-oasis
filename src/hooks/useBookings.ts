import { useEffect, useState } from "react";
import { getBookings, PAGE_SIZE } from "../services/apiBookings";

export function useBookings(currentPage: number) {
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchBookings() {
      try {
        setIsLoading(true);
        const { data, count } = await getBookings({ page: currentPage });
        setBookings(data);
        setCount(count);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings();
  }, [currentPage]);

  const pageCount = Math.ceil(count / PAGE_SIZE);

  return { isLoading, bookings, error, count, pageCount };
}

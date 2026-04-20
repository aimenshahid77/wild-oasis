import { useSearchParams } from "react-router-dom";

export function useBookingParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const day = Number(searchParams.get("day") ?? 7);

  function setPage(value: number) {
    searchParams.set("page", String(value));
    setSearchParams(searchParams);
  }

  function setDay(value: number) {
    searchParams.set("day", String(value));
    setSearchParams(searchParams);
  }

  const status = searchParams.get("status") ?? "all";
  function setStatus(value: string) {
    searchParams.set("status", String(value));
    setSearchParams(searchParams);
  }

  const sortBy = searchParams.get("sortBy") ?? "date-recent";
  function setsortBy(value: string) {
    searchParams.set("sortBy", String(value));
    setSearchParams(searchParams);
  }

  return { page, setPage, status, setStatus, sortBy, setsortBy, day, setDay };
}

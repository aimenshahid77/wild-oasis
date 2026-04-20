import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBookingParams } from "@/hooks/useBookingParams";

export function BookingSortBy() {
  const { sortBy, setsortBy } = useBookingParams();

  return (
    <Select value={sortBy ?? ""} onValueChange={setsortBy}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="date-recent">Date (recent first)</SelectItem>
        <SelectItem value="date-earlier">Date (earlier first)</SelectItem>
        <SelectItem value="amount-high">Amount (high first)</SelectItem>
        <SelectItem value="amount-low">Amount (low first)</SelectItem>
      </SelectContent>
    </Select>
  );
}

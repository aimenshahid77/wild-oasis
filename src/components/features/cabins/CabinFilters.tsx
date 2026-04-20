import { useCabinParams } from "@/hooks/useCabinParams";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CabinFilters() {
  const { discount, sortBy, setDiscount, setSortBy } = useCabinParams();

  return (
    <div className="flex items-center gap-3 mb-4">
      {/* Discount filter buttons */}
      <div className="flex items-center gap-1 border rounded-md p-1">
        {[
          { label: "All", value: "all" },
          { label: "No discount", value: "no-discount" },
          { label: "With discount", value: "with-discount" },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setDiscount(option.value)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              discount === option.value
                ? "bg-violet-600 text-white"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-52">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper" side="bottom" align="end" className="z-50">
          <SelectItem value="name-asc">Sort by name (A-Z)</SelectItem>
          <SelectItem value="name-desc">Sort by name (Z-A)</SelectItem>
          <SelectItem value="price-asc">Sort by price (low first)</SelectItem>
          <SelectItem value="price-desc">Sort by price (high first)</SelectItem>
          <SelectItem value="capacity-asc">
            Sort by capacity (low first)
          </SelectItem>
          <SelectItem value="capacity-desc">
            Sort by capacity (high first)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

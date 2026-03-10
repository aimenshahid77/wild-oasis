import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCabins } from "@/hooks/useCabins";
import AddCabins from "./AddCabins";

export default function CabinsTable() {
  const { isLoading, cabins, error } = useCabins();

  if (isLoading) return <p className="p-4 text-center">Loading cabins...</p>;
  if (error)
    return <p className="p-4 text-center text-red-500">Error: {error}</p>;

  return (
   <>
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[80px]"></TableHead>
            <TableHead className="w-[100px]">Cabins</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Discount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cabins.map((cabin) => (
            <TableRow key={cabin.id}>
              <TableCell>
                {cabin.image ? (
                  <img
                    src={cabin.image}
                    alt={cabin.name}
                    className="w-16 h-12 object-cover rounded-sm border"
                  />
                ) : (
                  <div className="w-16 h-12 bg-muted rounded-sm border flex items-center justify-center text-muted-foreground text-xs">
                    No img
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">{cabin.name}</TableCell>
              <TableCell>Up to {cabin.maxCapacity} guests</TableCell>
              <TableCell>${cabin.regularPrice.toFixed(2)}</TableCell>
              <TableCell className="text-right whitespace-nowrap">
                {cabin.discount > 0 ? (
                  <span className="text-green-600 font-medium">
                    ${cabin.discount.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-muted-foreground">&mdash;</span>
                )}
              </TableCell>
            </TableRow>
          ))}
          {cabins.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No cabins found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

    
    </div>
    <AddCabins/>
   </>
    
  );
}

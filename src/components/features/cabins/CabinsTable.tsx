import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "@/services/apiCabins";
import { useCabinParams } from "@/hooks/useCabinParams";
import { getFilteredAndSorted } from "@/lib/cabinUtils";
import CabinsDialog from "./CabinsDialog";
import AddCabinForm from "./AddCabinForm";
import CabinRowActions from "./CabinRowActions"; 

export default function CabinsTable() {
  const { data: cabins = [] } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const { discount, sortBy } = useCabinParams();
  const processedCabins = getFilteredAndSorted(cabins, discount, sortBy);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[160px]"></TableHead>
              <TableHead className="w-[100px]">Cabins</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Discount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedCabins.map((cabin) => (
              <TableRow key={cabin.id}>
                <TableCell>
                  {cabin.image ? (
                    <img
                      src={cabin.image}
                      alt={cabin.name ?? "Cabin"}
                      className="w-40 h-32 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-40 h-32 bg-muted rounded-lg border flex items-center justify-center text-muted-foreground text-xs">
                      No img
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{cabin.name}</TableCell>
                <TableCell>Up to {cabin.maxCapacity} guests</TableCell>
                <TableCell>${(cabin.regularPrice ?? 0).toFixed(2)}</TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  {(cabin.discount ?? 0) > 0 ? (
                    <span className="text-green-600 font-medium">
                      ${(cabin.discount ?? 0).toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">&mdash;</span>
                  )}
                </TableCell>
                <TableCell>
                  <CabinRowActions cabin={cabin} />{" "}
              
                </TableCell>
              </TableRow>
            ))}
            {processedCabins.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No cabins found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <CabinsDialog
          btn="Add new cabin"
          heading="Add New Cabin"
          description="Fill in the details to add a new cabin to the list."
          cabinForm={<AddCabinForm />}
          variant="button"
        />
      </div>
    </>
  );
}

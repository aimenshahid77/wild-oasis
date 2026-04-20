import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin, createCabin } from "@/services/apiCabins";
import { toast } from "sonner";
import type { Tables } from "@/types/supabase";

type Cabin = Tables<"cabins">;

export function useCabinActions() {
  const queryClient = useQueryClient();

  const { mutate: removeCabin, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteCabin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message); 
    },
  });

  const { mutate: duplicateCabin, isPending: isDuplicating } = useMutation({
    mutationFn: (cabin: Cabin) => {
      toast.loading(`Duplicating "${cabin.name}"...`, { id: "duplicate" }); // 👈 loading toast
      return createCabin({
        name: `Copy of ${cabin.name}`,
        maxCapacity: cabin.maxCapacity,
        regularPrice: cabin.regularPrice,
        discount: cabin.discount,
        image: cabin.image,
        description: cabin.description,
      });
    },
    onSuccess: (_, cabin) => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success(`"${cabin.name}" has been duplicated!`, {
        id: "duplicate",
      }); // 👈 replaces loader
    },
    onError: () => {
      toast.error("Failed to duplicate cabin", { id: "duplicate" });
    },
  });

  return { removeCabin, isDeleting, duplicateCabin, isDuplicating };
}

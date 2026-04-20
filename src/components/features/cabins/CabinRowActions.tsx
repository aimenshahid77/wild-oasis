import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Pencil, Copy, Trash2 } from "lucide-react";
import CabinsDialog from "./CabinsDialog";
import EditCabinForm from "./EditCabinForm";
import { useCabinActions } from "@/hooks/useCabinActions";
import type { Tables } from "@/types/supabase";

type CabinRowActionsProps = {
  cabin: Tables<"cabins">;
};

export default function CabinRowActions({ cabin }: CabinRowActionsProps) {
  const { removeCabin, isDeleting, duplicateCabin, isDuplicating } =
    useCabinActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {/* Edit */}
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <CabinsDialog
              variant="actions"
              btn={
                <span className="flex items-center gap-2">
                  <Pencil className="h-4 w-4" /> Edit cabin
                </span>
              }
              heading="Edit Cabin"
              description="Make changes to your cabin here."
              cabinForm={<EditCabinForm cabin={cabin} />}
            />
          </DropdownMenuItem>

          {/* Duplicate */}
          <DropdownMenuItem
            onClick={() => duplicateCabin(cabin)}
            disabled={isDuplicating}
          >
            <Copy className="h-4 w-4 mr-2" />
            {isDuplicating ? "Duplicating..." : "Duplicate cabin"}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Delete */}
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              removeCabin(cabin.id);
            }}
            disabled={isDeleting}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isDeleting ? "Deleting..." : "Delete cabin"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

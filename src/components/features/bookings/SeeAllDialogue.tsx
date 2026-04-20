import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BookingDetails from "./BookingDetails";
function SeeAllDialogue({ bookingId }: { bookingId: number }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger>View Details</DialogTrigger>
        <DialogContent>
          {/* search about the tag which is used to hide the dialogue title and dialogue description */}
          <BookingDetails bookingId={bookingId} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SeeAllDialogue;

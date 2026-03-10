import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCabinForm from "./AddCabinForm";

const AddCabins = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className=" bg-black text-white h-10 rounded-md text-md font-bold w-40">
            Add New Cabin
          </button>
        </DialogTrigger>
        <DialogContent className="overflow-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-center font-bold ">
              New Cabin
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              Add a beautiful cabin to your collection.
            </DialogDescription>
          </DialogHeader>
          <AddCabinForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCabins;

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CabinsDialog = ({
  btn,
  heading,
  description,
  cabinForm,
  variant,
}: {
  btn: string;
  heading: string;
  description: string;
  cabinForm: React.ReactNode;
  variant: string;
}) => {
  return (
    <Dialog>
      {variant === "button" ? (
        <DialogTrigger asChild>
          <button className=" bg-black text-white h-10 rounded-md text-md font-bold w-40">
            {btn}
          </button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <button>{btn}</button>
        </DialogTrigger>
      )}
      <DialogContent className="overflow-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-center font-bold ">
            {heading}
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            {description}
          </DialogDescription>
        </DialogHeader>
        {cabinForm}
      </DialogContent>
    </Dialog>
  );
};

export default CabinsDialog;

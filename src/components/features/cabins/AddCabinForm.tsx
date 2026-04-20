import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { addCabin } from "@/services/apiCabins";

const cabinSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long.")
    .max(10, "Name can only be 10 characters long."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(100, "Description can only be 100 characters long"),
  regularPrice: z // ✅ renamed from price
    .transform(Number)
    .pipe(
      z
        .number("Enter cabin price")
        .min(1, "Enter a cabin price")
        .max(10000, "Price is too high"),
    ),
  maxCapacity: z
    .transform(Number)
    .pipe(
      z
        .number("Enter cabin capacity")
        .min(1, "Enter a valid capacity")
        .max(20, "Cannot host more than 20 guests"),
    ),
  discount: z
    .transform(Number)
    .pipe(
      z
        .number("Enter 0 if no discount")
        .min(0, "Discount cannot be negative")
        .max(10000, "Discount is too high"),
    ),
  image: z.instanceof(File, { message: "Please select an image" }),
});

export type cabinSchemaType = z.infer<typeof cabinSchema>;

const AddCabinForm = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] }); // ✅ refreshes table after add
    },
    onError: (error) => {
      console.error("Failed to add cabin:", error);
    },
  });

  const { handleSubmit, control } = useForm<cabinSchemaType>({
    resolver: zodResolver(cabinSchema),
    defaultValues: {
      name: "",
      description: "",
      regularPrice: 0, // ✅ renamed from price
      maxCapacity: 0,
      discount: 0,
    },
  });

  const formSubmit = (values: cabinSchemaType) => {
    mutate(values); // ✅ actually calls addCabin
  };

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Cabin Name</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Cabin name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Cabin Description</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Cabin description"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="regularPrice"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Cabin Price</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Cabin price"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="maxCapacity"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Cabin Max Capacity</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Cabin max capacity"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="discount"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Cabin Discount</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Cabin discount"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="image"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Cabin Image</FieldLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  ref={field.ref}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <button
          type="submit"
          disabled={isPending}
          className="bg-black rounded-md text-white font-bold h-10 w-40 mt-4 disabled:opacity-50"
        >
          {isPending ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddCabinForm;

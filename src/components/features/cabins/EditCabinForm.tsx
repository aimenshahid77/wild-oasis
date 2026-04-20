import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "@/services/apiCabins";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Cabins } from "@/types/cabins.types";
import { Button } from "@/components/ui/button";


const editCabinFormSchema = z
    .object({
        name: z
            .string()
            .min(3, "Please enter a valid name")
            .max(50, "Name should not exceed 50 characters"),
        maxCapacity: z
            .number({ message: "Enter a valid capacity" })
            .min(1, "Enter a valid capacity")
            .max(20, "Cannot host more than 20 guests"),
        regularPrice: z
            .number({ message: "Enter a cabin price" })
            .min(1, "Enter a cabin price")
            .max(10000, "Price is too high"),
        discount: z
            .number({ message: "Enter 0 if no discount" })
            .min(0, "Discount cannot be negative")
            .max(10000, "Discount is too high"),
        description: z
            .string()
            .min(10, "Description must be at least 10 characters")
            .max(300, "Description is too long"),
        image: z.union([z.instanceof(File), z.string()]).optional(),
    })
    .refine((data) => data.discount < data.regularPrice, {
        message: "Discount must be less than regular price",
        path: ["discount"],
    });

type EditCabinFormValues = z.infer<typeof editCabinFormSchema>;

function EditCabinForm({ cabin }: { cabin: Cabins }) {
    const queryClient = useQueryClient();

    const { handleSubmit, control, reset } = useForm<EditCabinFormValues>({
        resolver: zodResolver(editCabinFormSchema),
        defaultValues: {
            name: cabin.name,
            maxCapacity: cabin.maxCapacity,
            regularPrice: cabin.regularPrice,
            discount: cabin.discount ?? 0,
            description: cabin.description,
            image: cabin.image,
        },
    });

    const { mutate: editCabinApi, isPending: isEditingCabin } = useMutation({
        mutationKey: ["edit-cabin", cabin.id],
        mutationFn: editCabin,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            toast.success(data.message);
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    function onSubmit(values: EditCabinFormValues) {
        editCabinApi({ id: cabin.id, updatedCabin: values });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                {/* Name */}
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Cabin Name</FieldLabel>
                            <Input
                                {...field}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter cabin name"
                                autoComplete="off"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/* Capacity */}
                <Controller
                    name="maxCapacity"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Capacity</FieldLabel>
                            <Input
                                {...field}
                                type="number"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter cabin capacity"
                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/* Price */}
                <Controller
                    name="regularPrice"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                            <Input
                                {...field}
                                type="number"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter cabin price"
                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/* Discount */}
                <Controller
                    name="discount"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Discount</FieldLabel>
                            <Input
                                {...field}
                                type="number"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter cabin discount"
                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/* Description */}
                <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                            <Input
                                {...field}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter cabin description"
                                autoComplete="off"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/* Image */}
                <Controller
                    name="image"
                    control={control}
                    render={({ field: { onChange, ref, name }, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={name}>
                                Image{" "}
                                <span className="text-muted-foreground text-xs font-normal">
                                    (leave empty to keep current)
                                </span>
                            </FieldLabel>
                            {cabin.image && (
                                <img
                                    src={cabin.image}
                                    alt="current cabin"
                                    className="h-24 w-40 rounded-md object-cover mb-1"
                                />
                            )}
                            <Input
                                className="cursor-pointer file:px-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-indigo-600 hover:file:bg-indigo-100"
                                type="file"
                                accept="image/*"
                                onChange={(e) => onChange(e.target.files?.[0])}
                                ref={ref}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="flex justify-end gap-3 mt-6">
                <Button
                    variant="outline"
                    className="cursor-pointer"
                    type="button"
                    onClick={() => reset()}
                    disabled={isEditingCabin}
                >
                    Reset
                </Button>
                <Button
                    disabled={isEditingCabin}
                    className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
                    type="submit"
                >
                    {isEditingCabin ? (
                        <>
                            Saving
                            <Loader2 className="animate-spin ml-2 h-4 w-4" />
                        </>
                    ) : (
                        "Save changes"
                    )}
                </Button>
            </div>
        </form>
    );
}

export default EditCabinForm;
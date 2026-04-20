import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Moon, Calendar, Users, DollarSign, Save } from "lucide-react";

import {
  Field,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getSettings, updateSettings } from "@/services/apiSettings";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const settingsSchema = z.object({
  minBookingLength: z
    .number()
    .min(1, "Minimum nights must be at least 1")
    .max(100, "Minimum nights cannot exceed 365"),
  maxBookingLength: z
    .number()
    .min(1, "Maximum nights must be at least 1")
    .max(400, "Maximum nights cannot exceed 9999"),
  maxGuestsPerBooking: z
    .number()
    .min(1, "Maximum guests must be at least 1")
    .max(10, "Maximum guests cannot exceed 100"),
  breakfastPrice: z
    .number()
    .min(0, "Breakfast price cannot be negative")
    .max(1000, "Breakfast price is too high"),
});

type settingsSchemaType = z.infer<typeof settingsSchema>;

function SettingsC() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success(" Settings have been succesfully updated. ");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const { handleSubmit, control } = useForm<settingsSchemaType>({
    resolver: zodResolver(settingsSchema),
    defaultValues: async () => {
      const data = await getSettings();
      return {
        minBookingLength: data?.minBookingLength ?? 0,
        maxBookingLength: data?.maxBookingLength ?? 0,
        maxGuestsPerBooking: data?.maxGuestsPerBooking ?? 0,
        breakfastPrice: data?.breakfastPrice ?? 0,
      };
    },
  });

  const formSubmit = (values: settingsSchemaType) => {
    mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div>
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Hotel Settings</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Configure global booking limits and pricing
            </p>
          </div>

          <form onSubmit={handleSubmit(formSubmit)} className="space-y-8">
            <FieldGroup className="flex flex-col gap-6">
              {/* Minimum Nights */}
              <Controller
                name="minBookingLength"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block ml-1">
                      Minimum nights per booking
                    </label>
                    <div className="relative group">
                      <Moon
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition"
                        size={18}
                      />
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        aria-invalid={fieldState.invalid}
                        placeholder="Minimum nights per booking"
                        autoComplete="off"
                        className="pl-10 h-14 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                      />
                    </div>
                    {fieldState.invalid && (
                      <p className="text-xs text-destructive mt-1 ml-1">
                        {fieldState.error?.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              {/* Maximum Nights */}
              <Controller
                name="maxBookingLength"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block ml-1">
                      Maximum nights per booking
                    </label>
                    <div className="relative group">
                      <Calendar
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition"
                        size={18}
                      />
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        aria-invalid={fieldState.invalid}
                        placeholder="Maximum nights per booking"
                        autoComplete="off"
                        className="pl-10 h-14 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                      />
                    </div>
                    {fieldState.invalid && (
                      <p className="text-xs text-destructive mt-1 ml-1">
                        {fieldState.error?.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              {/* Maximum Guests */}
              <Controller
                name="maxGuestsPerBooking"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block ml-1">
                      Maximum guests per booking
                    </label>
                    <div className="relative group">
                      <Users
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition"
                        size={18}
                      />
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        aria-invalid={fieldState.invalid}
                        placeholder="Maximum guests per booking"
                        autoComplete="off"
                        className="pl-10 h-14 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                      />
                    </div>
                    {fieldState.invalid && (
                      <p className="text-xs text-destructive mt-1 ml-1">
                        {fieldState.error?.message}
                      </p>
                    )}
                  </Field>
                )}
              />

              {/* Breakfast Price */}
              <Controller
                name="breakfastPrice"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block ml-1">
                      Breakfast price ($)
                    </label>
                    <div className="relative group">
                      <DollarSign
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition"
                        size={18}
                      />
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        aria-invalid={fieldState.invalid}
                        placeholder="Breakfast price ($)"
                        autoComplete="off"
                        className="pl-10 h-14 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                      />
                    </div>
                    {fieldState.invalid && (
                      <p className="text-xs text-destructive mt-1 ml-1">
                        {fieldState.error?.message}
                      </p>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isPending}
                className="h-14 px-12 text-base rounded-xl font-semibold bg-violet-600 text-white shadow-lg shadow-violet-600/30 hover:bg-violet-700 hover:-translate-y-0.5 transition-all duration-200"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save size={18} />
                    Update Settings
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingsC;

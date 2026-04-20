import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEditUserPassword } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PasswordSchema = z
  .object({
    newpassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmnewPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newpassword === data.confirmnewPassword, {
    message: "passwords do not match",
    path: ["confirmnewPassword"],
  });

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;

function PasswordForm() {
  const { control, handleSubmit, reset } = useForm<PasswordSchemaType>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      newpassword: "",
      confirmnewPassword: "",
    },
  });
  const { mutate, isPending } = useEditUserPassword();

  const formSubmit = (values: PasswordSchemaType) => {
    mutate(
      { password: values.newpassword },
      {
        onSuccess: () => reset(),
      }
    );
  };

  return (
    <Card className="shadow-lg border-slate-100 overflow-hidden mt-8">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
        <CardTitle className="text-xl font-bold text-slate-800">Update password</CardTitle>
        <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-8 pb-10">
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
          <FieldGroup className="max-w-2xl">
            <Controller
              name="newpassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-semibold text-slate-700">New Password (min 8 chars)</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    onChange={(e) => field.onChange(e.target.value)}
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    className="h-12 rounded-lg border-slate-200 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              name="confirmnewPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm font-semibold text-slate-700">Confirm New Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    onChange={(e) => field.onChange(e.target.value)}
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    className="h-12 rounded-lg border-slate-200 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex justify-end pt-4 gap-3 border-t border-slate-100 mt-8">
            <Button type="reset" variant="outline" className="px-6" onClick={() => reset()}>Cancel</Button>
            <Button disabled={isPending} className="px-8 bg-slate-900 hover:bg-slate-800 min-w-[160px]">
              {isPending ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default PasswordForm;

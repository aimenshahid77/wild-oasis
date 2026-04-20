import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getUser } from "@/services/apiAuth";
import { useEditUser } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PasswordForm from "./PasswordForm";

const AccountSchema = z.object({
  fullName: z
    .string()
    .min(3, "Name must be at least 3 characters long.")
    .max(10, "Name can only be 10 characters long."),
  emailaddress: z.string().email("must be a valid email"),
  avatar: z.any().optional(),
});

export type AccountSchemaType = z.infer<typeof AccountSchema>;

function Account() {
  const { control, handleSubmit } = useForm<AccountSchemaType>({
    resolver: zodResolver(AccountSchema),
    defaultValues: async () => {
      const data = await getUser();
      return {
        fullName: data?.user_metadata?.fullName ?? "",
        emailaddress: data?.email ?? "",
        avatar: undefined,
      };
    },
  });
  const { mutate, isPending } = useEditUser();

  const formSubmit = (values: AccountSchemaType) => {
    mutate({
      fullName: values.fullName,
      email: values.emailaddress,
      image: values.avatar,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-8 px-4">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Update your account</h1>
        <p className="text-slate-500">Manage your profile information and security settings.</p>
      </header>

      <Card className="shadow-lg border-slate-100 overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
          <CardTitle className="text-xl font-bold text-slate-800">Update user data</CardTitle>
          <CardDescription>Changes will be reflected across the platform.</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-8 pb-10">
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
            <FieldGroup className="max-w-2xl">
              <Controller
                name="fullName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-slate-700">Full Name</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      onChange={(e) => field.onChange(e.target.value)}
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. John Doe"
                      className="h-12 rounded-lg border-slate-200 focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="emailaddress"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-slate-700">Email Address</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      onChange={(e) => field.onChange(e.target.value)}
                      aria-invalid={fieldState.invalid}
                      placeholder="john@example.com"
                      className="h-12 rounded-lg border-slate-200 focus:ring-2 focus:ring-primary/20 transition-all bg-slate-50/50 text-slate-500 cursor-not-allowed"
                      disabled
                    />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="avatar"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-semibold text-slate-700">Avatar Image</FieldLabel>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        className="h-12 py-2.5 px-3 rounded-lg border-slate-200 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 transition-all cursor-pointer"
                      />
                    </div>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="flex justify-end pt-4 gap-3 border-t border-slate-100 mt-8">
              <Button type="button" variant="outline" className="px-6">Cancel</Button>
              <Button disabled={isPending} className="px-8 bg-slate-900 hover:bg-slate-800 min-w-[140px]">
                {isPending ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <PasswordForm />
      </div>
    </div>
  );
}

export default Account;

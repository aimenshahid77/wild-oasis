import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, UserPlus, CheckCircle2 } from "lucide-react";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/hooks/useAuth";

const UserSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Name must be at least 3 characters long.")
      .max(10, "Name can only be 10 characters long."),
    emailaddress: z.string().email("must be a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

export type UserSchemaType = z.infer<typeof UserSchema>;

function UserForm() {
  const { control, handleSubmit, reset } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      fullName: "",
      emailaddress: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useCreateUser();

  function onsubmit(data: UserSchemaType) {
    return mutate(
      {
        email: data.emailaddress,
        password: data.password,
        fullName: data.fullName,
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create New User</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Add a new member to your organization
          </p>
        </div>

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
          <FieldGroup className="flex flex-col gap-6">
            {/* Full Name */}
            <Controller
              name="fullName"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block ml-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition"
                      size={18}
                    />
                    <Input
                      {...field}
                      placeholder="Full Name"
                      autoComplete="name"
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

            {/* Email Address */}
            <Controller
              name="emailaddress"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition"
                      size={18}
                    />
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email Address"
                      autoComplete="email"
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

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block ml-1">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition"
                      size={18}
                    />
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
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

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block ml-1">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <CheckCircle2
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition"
                      size={18}
                    />
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm Password"
                      autoComplete="new-password"
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

          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="h-14 px-12 text-base rounded-xl font-semibold bg-violet-600 text-white shadow-lg shadow-violet-600/30 hover:bg-violet-700 hover:-translate-y-0.5 transition-all duration-200"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus size={18} />
                  Create User
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;

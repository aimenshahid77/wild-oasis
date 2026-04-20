import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, UserPlus, CheckCircle2, Mountain } from "lucide-react";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router";

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

function SignUp() {
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
  const navigate = useNavigate();

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
          navigate("/");
        },
      },
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section - Image & Branding */}
      <div className="relative flex-1 hidden lg:block animate-in fade-in duration-1000">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/login-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        
        <div className="absolute top-12 left-12 flex items-center gap-3 text-white z-10">
          <div className="p-2 bg-primary/20 backdrop-blur-md rounded-xl border border-white/20">
            <Mountain className="w-8 h-8" />
          </div>
          <span className="text-2xl font-bold tracking-tight">The Wild Oasis</span>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex-1 flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-[480px] backdrop-blur-xl saturate-150 bg-background/70 border border-border/30 rounded-2xl p-10 shadow-2xl animate-in slide-in-from-right-10 duration-700">
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join us to experience The Wild Oasis</p>
          </div>

          <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
            <FieldGroup className="space-y-4">
              {/* Full Name */}
              <Controller
                name="fullName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 transition-colors pointer-events-none group-focus-within:text-primary">
                        <User size={18} />
                      </div>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Full Name"
                        autoComplete="name"
                        className="bg-secondary/50 h-12 rounded-xl pl-10 border border-border hover:border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 outline-none"
                      />
                    </div>
                    {fieldState.invalid && (
                      <p className="text-xs text-destructive mt-1.5 ml-1 animate-in fade-in slide-in-from-top-1">
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
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 transition-colors pointer-events-none group-focus-within:text-primary">
                        <Mail size={18} />
                      </div>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Email Address"
                        autoComplete="email"
                        type="email"
                        className="bg-secondary/50 h-12 rounded-xl pl-10 border border-border hover:border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 outline-none"
                      />
                    </div>
                    {fieldState.invalid && (
                      <p className="text-xs text-destructive mt-1.5 ml-1 animate-in fade-in slide-in-from-top-1">
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
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 transition-colors pointer-events-none group-focus-within:text-primary">
                        <Lock size={18} />
                      </div>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Password"
                        autoComplete="new-password"
                        type="password"
                        className="bg-secondary/50 h-12 rounded-xl pl-10 border border-border hover:border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 outline-none"
                      />
                    </div>
                    {fieldState.invalid && (
                      <p className="text-xs text-destructive mt-1.5 ml-1 animate-in fade-in slide-in-from-top-1">
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
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 transition-colors pointer-events-none group-focus-within:text-primary">
                        <CheckCircle2 size={18} />
                      </div>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        type="password"
                        className="bg-secondary/50 h-12 rounded-xl pl-10 border border-border hover:border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 outline-none"
                      />
                    </div>
                    {fieldState.invalid && (
                      <p className="text-xs text-destructive mt-1.5 ml-1 animate-in fade-in slide-in-from-top-1">
                        {fieldState.error?.message}
                      </p>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 mt-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus size={18} />
                  Sign Up
                </span>
              )}
            </Button>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

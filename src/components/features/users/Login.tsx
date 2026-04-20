import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, Mail, Lock, Mountain } from "lucide-react";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoginUser } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router";
import "./Login.css";

const LoginSchema = z.object({
  emailaddress: z.string().email("must be a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

function Login() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      emailaddress: "",
      password: "",
    },
  });
  const { mutate, isPending } = useLoginUser();

  function onsubmit(data: LoginSchemaType) {
    return mutate(
      {
        email: data.emailaddress,
        password: data.password,
      },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  }

  return (
    <div className="login-container">
      <div className="login-image-section animate-in fade-in duration-1000">
        <div className="absolute top-12 left-12 flex items-center gap-3 text-white z-10">
          <div className="p-2 bg-primary/20 backdrop-blur-md rounded-xl border border-white/20">
            <Mountain className="w-8 h-8" />
          </div>
          <span className="text-2xl font-bold tracking-tight">The Wild Oasis</span>
        </div>
      </div>

      <div className="login-form-section">
        <div className="glass-card animate-in slide-in-from-right-10 duration-700">
          <div className="mb-8 text-center sm:text-left">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Please enter your details to Log in</p>
          </div>

          <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
            <FieldGroup>
              <Controller
                name="emailaddress"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
                        <Mail size={18} />
                      </div>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Email Address"
                        autoComplete="email"
                        type="email"
                        className="premium-input pl-10 h-12 rounded-xl"
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

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
                        <Lock size={18} />
                      </div>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Password"
                        autoComplete="current-password"
                        type="password"
                        className="premium-input pl-10 h-12 rounded-xl"
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
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Logging in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn size={18} />
                  Login In
                </span>
              )}
            </Button>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to={"/signup"} className="font-semibold text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

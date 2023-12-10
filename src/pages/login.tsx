import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type LoginSchema, loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { SignInResponse, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginSchema) => {
    const { email, password } = data;

    const response: SignInResponse | undefined = await signIn<"credentials">(
      "credentials",
      {
        email: email,
        password: password,
        redirect: false,
        loading: false,
      },
    );

    if (response?.ok === false || null) {
      toast.error("Wrong Password!");

      return;
    } else {
      toast.success("Login successful!");

      return router.push("/app");
    }
  };

  return (
    <MaxWidthWrapper>
      <Card className="w-full sm:w-[500px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to your account to access your dashboard.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <CardContent className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@gmail.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={passwordType}
                          placeholder="********"
                          {...field}
                        />
                        {passwordType === "password" ? (
                          <Eye
                            size={20}
                            className="bg-background absolute right-4 top-2 cursor-pointer"
                            onClick={() => setPasswordType("text")}
                          />
                        ) : (
                          <EyeOff
                            size={20}
                            className="bg-background absolute right-4 top-2 cursor-pointer"
                            onClick={() => setPasswordType("password")}
                          />
                        )}
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="purple" type="submit">
                Login
              </Button>
            </CardFooter>
          </form>
        </Form>
        <p className="flex justify-center gap-2 pb-6 text-sm">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-purple hover:text-purple/75 transition-colors"
            onClick={() => router.push("/register")}
          >
            Register
          </Link>
        </p>
      </Card>
    </MaxWidthWrapper>
  );
};

export default Login;

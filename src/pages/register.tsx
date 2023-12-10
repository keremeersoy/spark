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
import { registerSchema, type RegisterSchema } from "@/schemas/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/utils/api";
import Link from "next/link";

const Register = () => {
  const router = useRouter();

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );
  const [confirmPasswordType, setConfirmPasswordType] = useState<
    "password" | "text"
  >("password");

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = api.auth.registerWithEmailAndPassword.useMutation();

  const handleRegister = async (data: RegisterSchema) => {
    const { name, surname, email, password } = data;

    console.log("data", data);

    const result = await registerMutation.mutateAsync({
      name,
      surname,
      email,
      password,
    });

    if (result === true) {
      toast.success("Successfully registered.");
      void router.push("/login");
    } else if (result === false) {
      toast.error("You have already register with this email.");
    } else {
      toast.error("Unexpected Error");
    }
  };

  return (
    <MaxWidthWrapper>
      <Card className="w-full sm:w-[500px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Create an account to access all the features.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)}>
            <CardContent className="flex flex-col space-y-4">
              <div className="justify-between space-y-4 sm:flex sm:space-y-0">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={confirmPasswordType}
                          placeholder="********"
                          {...field}
                        />
                        {confirmPasswordType === "password" ? (
                          <Eye
                            size={20}
                            className="bg-background absolute right-4 top-2 cursor-pointer"
                            onClick={() => setConfirmPasswordType("text")}
                          />
                        ) : (
                          <EyeOff
                            size={20}
                            className="bg-background absolute right-4 top-2 cursor-pointer"
                            onClick={() => setConfirmPasswordType("password")}
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
                Register
              </Button>
            </CardFooter>
          </form>
        </Form>
        <p className="flex justify-center gap-2 pb-6 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple hover:text-purple/75 transition-colors"
            onClick={() => router.push("/login")}
          >
            Login
          </Link>
        </p>
      </Card>
    </MaxWidthWrapper>
  );
};

export default Register;

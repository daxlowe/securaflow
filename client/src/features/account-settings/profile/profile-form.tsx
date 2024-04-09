import { isStrongPassword } from "validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { modifyUser } from "@/utils/modifyUser";
import { useAuthContext } from "@/hooks/useAuthContext";
import { getUserData } from "@/utils/getUserData";
import { User } from "@/types/";
import { useEffect, useState } from "react";

const profileFormSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "First Name must be at least 2 characters.",
    })
    .max(30, {
      message: "First Name must not be longer than 30 characters.",
    })
    .optional(),
  last_name: z
    .string()
    .min(2, {
      message: "Last Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Last Name must not be longer than 30 characters.",
    })
    .optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(30, {
      message: "Password must not be longer than 30 characters.",
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { user } = useAuthContext();

  const [defaultValues, setDefaultValues] = useState<
    Partial<ProfileFormValues>
  >({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    async function fetchData() {
      const data: User = await getUserData(user);
      const initialValues: Partial<ProfileFormValues> = {
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        password: "",
      };

      setDefaultValues(initialValues);
    }

    fetchData();
  }, [user]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      // Check if at least one field is not null
      if (!(data.first_name || data.last_name || data.email || data.password)) {
        toast({
          title: "Validation Error",
          description:
            "At least one of the fields (First Name, Last Name, Email, Password) must be filled.",
        });
        return; // Stop submission if all fields are null
      }

      // Check if password is strong enough
      if (data.password && !isStrongPassword(data.password)) {
        toast({
          title: "Password Weak",
          description:
            "Password must be at least 6 characters long and contain a combination of letters, numbers, and special characters.",
        });
        return; // Stop submission if password is weak
      }

      // Construct the payload with null values for fields not filled
      const payload: ProfileFormValues = {
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        password: data.password || "",
      };

      // Remove null values from payload
      const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== null)
      );

      // Perform submission
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(filteredPayload, null, 2)}
            </code>
          </pre>
        ),
      });

      modifyUser(filteredPayload, user);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again later.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={defaultValues.first_name || ""}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the first name that will be displayed on your profile
                and in emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder={defaultValues.last_name || ""} {...field} />
              </FormControl>
              <FormDescription>
                This is the last name that will be displayed on your profile and
                in emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder={defaultValues.email || ""} {...field} />
              </FormControl>
              <FormDescription>
                This is the email tied to your account.
              </FormDescription>
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
                <Input
                  type="password"
                  placeholder="Enter your new password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your new password must be at least 6 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}

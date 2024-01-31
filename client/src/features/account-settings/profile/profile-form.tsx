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

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(30, {
      message: "Password must not be longer than 30 characters.",
    }),
});



type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.


export function ProfileForm() {
  const { user } = useAuthContext();
  const defaultValues: Partial<ProfileFormValues> = getInitialData() as Partial<ProfileFormValues>;
  console.log("Default Values", defaultValues);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

 
  async function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    
    modifyUser(data, user);
  }

  async function getInitialData() : Promise<Partial<ProfileFormValues>>
  {
    const data: User = await getUserData(user);
    console.log(data);
    const initialValues: Partial<ProfileFormValues> = 
    {
      name: data.first_name + data.last_name,
      username: "unused",
      email: data.email,
      password: "temp"
    }
    
    return initialValues;
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder={defaultValues.name} {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder={defaultValues.username} {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
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
                <Input placeholder={defaultValues.email} {...field} />
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

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
import { useQuery } from "@tanstack/react-query";
import { Group, User } from "@/types";
import { useAuthContext } from "@/hooks/useAuthContext";
import { getGroups } from "@/utils/getGroups";

const orgFormSchema = z.object({
  inviteCode: z.string().length(8),
});

type OrgFormValues = z.infer<typeof orgFormSchema>;

async function getData(user: User) {
  return getGroups(user);
}

export function OrgsForm() {
  const { user } = useAuthContext();

  const form = useForm<OrgFormValues>({
    resolver: zodResolver(orgFormSchema),
    mode: "onChange",
  });

  async function onSubmit(data: OrgFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const { isPending, data, error } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: () => getData(user),
  });

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="inviteCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invite Code</FormLabel>
                <FormControl>
                  <Input placeholder="Organizations's Invite Code" {...field} />
                </FormControl>
                <FormDescription>
                  This is the invite code of the organization you would like to
                  join.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Join Organization</Button>
        </form>
      </Form>
      {isPending ? (
        <h1></h1>
      ) : (
        <div className="mt-[100px]">
          {data.map((group) => (
            <h1 key={group.name}>{group.name}</h1>
          ))}
        </div>
      )}
    </>
  );
}

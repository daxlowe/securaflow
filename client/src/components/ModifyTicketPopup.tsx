import { Task } from "@/features/dashboard/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { modifyTicket } from "@/utils/modifyTicket";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { useAuthContext } from "@/hooks/useAuthContext";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required"
  }),
  team: z.array(z.string()).optional(),
  description: z.string().min(1, {
    message: "Description is required"
  }),
  difficulty: z.coerce.number().min(1, {
    message: "Difficulty is on a scale of 1-3"
  }).max(3, {
    message: "Difficulty is on a scale of 1-3"
  }),
  name: z.string().min(1, {
    message: "Vulnerabilities must have a name"
  }),
  cve_id: z.string().min(1, {
    message: "Vulnerabilities must have a CVE ID"
  }),
  priority: z.string().min(1, {
    message: "Vulnerabilities must have a priority"
  }),
  assignees: z.array(z.string()).optional(),
  time_estimate: z.number().optional(),
  current_status: z.string().min(1, {
    message: "Current status is required"
  }),
  comments: z.string().optional()
})

interface ModifyTicketProps {
  task: Task | null;
}

export function ModifyTicket({ task }: ModifyTicketProps) {
  const { user } = useAuthContext()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const ticketData = {
        title: String(values.title),
        team: values.team?.map(t => String(t)) || [],
        description: String(values.description),
        difficulty: Number(values.difficulty),
        assignees: values.assignees?.map(a => String(a)) || [],
        time_estimate: Number(values.time_estimate),
        comments: [String(values.comments)],
      }

      const data = {
        ticketData,
        cve_id: String(values.cve_id),
        current_status: String(values.current_status),
      }

      const ticketResponse = await modifyTicket(
        data,
        task?.ticket._id || "No ID",
        user,
      );

      if (ticketResponse) {
        console.log("Ticket modified:", ticketResponse);
      } else {
        // handle error
      }
      // Handle success (e.g., clear form, show success message, etc.)
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error("Error modifying ticket:", error);
      window.alert(`The following error occured when trying to modify ticket: ${JSON.stringify(error)}`);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title,
      team: task?.ticket.team?.map(group => group._id) || Array(""), 
      description: task?.ticket.description || "",
      difficulty: task?.ticket.difficulty || 1,
      name: task?.ticket.vulnerability.name,
      cve_id: task?.ticket.vulnerability.cve_id,
      priority: task?.ticket.vulnerability.priority,
      assignees: task?.ticket.assignees?.map(user => user._id) || Array(""),
      time_estimate: task?.ticket.time_estimate || 1,
      current_status: task?.status,
      comments: task?.ticket.comments?.toString() || ""
    }
  })

  return (
    <>
        <DialogHeader>
          <DialogTitle>Modify Ticket</DialogTitle>
        </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <ScrollArea className="h-[75vh]">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="team"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                        <Input type="number" {...field}/>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vulnerability Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="cve_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVE ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={field.value}/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="assignees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assignees</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="current_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Status</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={field.value}/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="backlog">Backlog</SelectItem>
                          <SelectItem value="assigned">Assigned</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="code-review">Code Review</SelectItem>
                          <SelectItem value="complete">Complete</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comments</FormLabel>
                      <FormControl>
                        <Textarea defaultValue={field.value} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <Button type="submit">Modify</Button>
                </ScrollArea>
              </form>
          </Form>
    </>
  );
}

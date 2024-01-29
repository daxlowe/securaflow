import { Task } from "@/features/dashboard/types/index";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { modifyTicket } from "@/utils/modifyTicket";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DialogHeader, DialogTitle } from "./ui/dialog";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required"
  }),
  team: z.array(z.string()).optional(),
  description: z.string().min(1, {
    message: "Description is required"
  }),
  difficulty: z.number().min(1, {
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
  // //Initial state for form fields
  // const [formFields, setFormFields] = useState({
  //   title: "",
  //   team: "",
  //   description: "",
  //   difficulty: "1",
  //   name: "",
  //   cve_id: "",
  //   priority: "",
  //   assignees: "",
  //   time_estimate: "",
  //   current_status: "",
  //   comments: "",
  // });

  // // Populate form fields when the component mounts or task changes
  // useEffect(() => {
  //   if (task) {
  //     setFormFields({
  //       title: task.ticket.title || "",
  //       team: task.ticket.team?.toString() || "Select a team",
  //       description: task.ticket.description || "",
  //       difficulty: task.ticket.difficulty.toString() || "1",
  //       name: task.ticket.vulnerability.name,
  //       cve_id: task.ticket.vulnerability.cve_id,
  //       priority: task.ticket.vulnerability.priority,
  //       assignees: task.ticket.assignees?.toString() || "",
  //       time_estimate:
  //         task.ticket.time_estimate?.toString() || "Time Estimate (Hours)",
  //       current_status: task.ticket.current_status || "",
  //       comments: task.ticket.comments || "Write any comments here",
  //     });
  //   }
  // }, [task]);

  // // Handle form field changes
  // const handleChange = (e: any) => {
  //   const { id, value } = e.target;
  //   setFormFields({
  //     ...formFields,
  //     [id]: value,
  //   });
  // };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const ticketResponse = await modifyTicket(
        values,
        task?.ticket._id || "No ID"
      );
      console.log("Ticket modified:", ticketResponse);
      // Handle success (e.g., clear form, show success message, etc.)
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error("Error modifying ticket:", error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title,
      team: Array(""), 
      description: task?.ticket.description,
      difficulty: task?.ticket.difficulty || 1,
      name: task?.ticket.vulnerability.name,
      cve_id: task?.ticket.vulnerability.cve_id,
      priority: task?.ticket.vulnerability.priority,
      assignees: Array(""),
      comments: task?.ticket.comments
    }
  })

  return (
    <>
        <DialogHeader>
          <DialogTitle>Create Ticket</DialogTitle>
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
                        <Input defaultValue={field.value} {...field} />
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
                        <Input defaultValue={field.value} {...field} />
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
                        <Input {...field} />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value}/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Low</SelectItem>
                          <SelectItem value="2">Medium</SelectItem>
                          <SelectItem value="3">Hard</SelectItem>
                        </SelectContent>
                      </Select>
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
                        <Input defaultValue={field.value} {...field} />
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
                        <Input defaultValue={field.value} {...field} />
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
                      <FormLabel>Difficulty</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value}/>
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
                        <Input defaultValue={field.value} {...field} />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value}/>
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
                        <Input defaultValue={field.value} {...field} />
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

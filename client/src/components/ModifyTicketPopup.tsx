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
import { modifyTicket } from "@/utils/modifyTicket";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ModifyTicketProps {
  task: Task | null;
}

export function ModifyTicket({ task }: ModifyTicketProps) {
  //Initial state for form fields
  const [formFields, setFormFields] = useState({
    title: "",
    team: "",
    description: "",
    difficulty: "1",
    name: "",
    cve_id: "",
    priority: "",
    assignees: "",
    time_estimate: "",
    current_status: "",
    comments: "",
  });

  // Populate form fields when the component mounts or task changes
  useEffect(() => {
    if (task) {
      setFormFields({
        title: task.ticket.title || "",
        team: task.ticket.team?.toString() || "Select a team",
        description: task.ticket.description || "",
        difficulty: task.ticket.difficulty.toString() || "1",
        name: task.ticket.vulnerability.name,
        cve_id: task.ticket.vulnerability.cve_id,
        priority: task.ticket.vulnerability.priority,
        assignees: task.ticket.assignees?.toString() || "",
        time_estimate:
          task.ticket.time_estimate?.toString() || "Time Estimate (Hours)",
        current_status: task.ticket.current_status || "",
        comments: task.ticket.comments || "Write any comments here",
      });
    }
  }, [task]);

  // Handle form field changes
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormFields({
      ...formFields,
      [id]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const ticketResponse = await modifyTicket(
        formFields,
        task?.ticket._id || "No ID"
      );
      console.log("Ticket modified:", ticketResponse);
      // Handle success (e.g., clear form, show success message, etc.)
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error("Error modifying ticket:", error);
    }
  };

  return (
    <>
      <Card className="ticket h-[80vh]">
        <CardHeader>
          <CardTitle>Modify Ticket</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[65vh]">
            <CardContent>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={formFields.title}
                required={true}
                onChange={handleChange}
              />
              <Label htmlFor="team">Team</Label>
              <Input
                type="text"
                name="team"
                value={formFields.team}
                onChange={handleChange}
              />
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={formFields.description}
                required={true}
                onChange={handleChange}
              />
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select name="difficulty" required={true} defaultValue={formFields.difficulty}>
                <SelectTrigger onChange={handleChange}>
                  <SelectValue defaultValue={formFields.difficulty} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <Label htmlFor="name">Vulnerability Name</Label>
              <Input
                type="text"
                name="name"
                required={true}
                defaultValue={formFields.name}
              />
              <Label htmlFor="cve_id">CVE</Label>
              <Input
                type="text"
                name="cve_id"
                required={true}
                defaultValue={formFields.cve_id}
              />
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority" required={true}>
                <SelectTrigger>
                  <SelectValue defaultValue={formFields.priority} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              <Label htmlFor="assignees">Assignees</Label>
              <Input
                type="text"
                name="assignees"
                value={formFields.assignees}
                onChange={handleChange}
              />
              <Label htmlFor="time_estimate">Time Estimate</Label>
              <Input
                type="number"
                name="time_estimate"
                value={formFields.time_estimate}
                onChange={handleChange}
              />
              <Label htmlFor="current_status">Current Status</Label>
              <Select name="current_status" required={true} defaultValue={formFields.current_status}>
                <SelectTrigger onChange={handleChange} defaultValue={formFields.current_status}>
                  <SelectValue defaultValue={formFields.current_status}/>
                </SelectTrigger>
                <SelectContent defaultValue={formFields.current_status}>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="code-review">Code Review</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                </SelectContent>
              </Select>
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                value={formFields.comments}
                onChange={handleChange}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Modify</Button>
            </CardFooter>
          </ScrollArea>
        </form>
      </Card>
    </>
  );
}

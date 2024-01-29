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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
    assignees: "",
    timeEstimate: "",
    currentStatus: "",
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
        assignees: task.ticket.assignees?.toString() || "",
        timeEstimate:
          task.ticket.time_estimate?.toString() || "Time Estimate (Hours)",
        currentStatus: task.ticket.current_status || "",
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
                id="description"
                value={formFields.description}
                onChange={handleChange}
              />
              <RadioGroup
                defaultValue={formFields.difficulty}
                onChange={handleChange}
              >
                <Label htmlFor="low">Low</Label>
                <RadioGroupItem value="1" id="low" />
                <Label htmlFor="medium">Medium</Label>
                <RadioGroupItem value="2" id="medium" />
                <Label htmlFor="high">High</Label>
                <RadioGroupItem value="3" id="high" />
                <Label htmlFor="critical">Critical</Label>
                <RadioGroupItem value="4" id="critical" />
              </RadioGroup>
              <Label htmlFor="assignees">Assignees</Label>
              <Input
                type="text"
                id="assignees"
                value={formFields.assignees}
                onChange={handleChange}
              />
              <Label htmlFor="timeEstimate">Time Estimate</Label>
              <Input
                type="number"
                id="timeEstimate"
                value={formFields.timeEstimate}
                onChange={handleChange}
              />
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder={formFields.currentStatus}
                    onChange={handleChange}
                  />
                </SelectTrigger>
                <SelectContent defaultValue={formFields.currentStatus}>
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

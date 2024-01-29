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
import { createTicket } from "@/utils/createTicket";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CreateTicket() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Retrieve the form element
    const form = document.querySelector(
      'form[name="ticket-form"]'
    ) as HTMLFormElement;

    // Create a new FormData instance with the form
    const formData = new FormData(form);
    console.log(formData);

    try {
      // Pass formData to the createTicket function
      const ticketResponse = await createTicket(formData);
      console.log("Ticket created:", ticketResponse);
      // Handle success (e.g., clear form, show success message, etc.)
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <>
      <Card className="ticket h-[80vh]">
        <CardHeader>
          <CardTitle>Create Ticket</CardTitle>
        </CardHeader>
        <form name="ticket-form" onSubmit={handleSubmit}>
          <ScrollArea className="h-[65vh]">
            <CardContent>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                name="title"
                required={true}
                placeholder="Title of vulnerability"
              />
              <Label htmlFor="team">Team</Label>
              <Input
                type="text"
                name="team"
                required={false}
                placeholder="(Optional) Enter teams to assign ticket to."
              />
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                name="description"
                required={true}
                placeholder="Description of vulnerability"
              />
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select name="difficulty" required={true}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a difficulty" />
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
                placeholder="Name of vulnerability"
              />
              <Label htmlFor="cve_id">CVE</Label>
              <Input
                type="text"
                name="cve_id"
                required={true}
                placeholder="CVE ID"
              />
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority" required={true}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a priority" />
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
                required={false}
                placeholder="(Optional) Assign to employee(s)"
              />
              <Label htmlFor="time_estimate">Time Estimate</Label>
              <Input
                type="number"
                name="time_estimate"
                required={false}
                placeholder="(Optional) Time Estimate (Hours)"
              />
              <Select name="current_status" required={true}>
                <SelectTrigger>
                  <SelectValue placeholder="Current Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="code-review">Code Review</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                </SelectContent>
              </Select>
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                name="comments"
                required={false}
                placeholder="Write any comments here"
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Create</Button>
            </CardFooter>
          </ScrollArea>
        </form>
      </Card>
    </>
  );
}

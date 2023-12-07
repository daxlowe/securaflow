import { Task } from "@/features/dashboard/types/index"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ModifyTicketProps {
    task: Task;
  }
  
  export function ModifyTicket({task} : ModifyTicketProps) {
    return (
      <>
      <Card className="ticket">
      <CardHeader>
        <CardTitle>Modify Ticket</CardTitle> 
      </CardHeader>
      <form>
        <CardContent>
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" value={task.ticket.title} />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder= {task.ticket.team ?? "(Optional) Select a team" } />
            </SelectTrigger>
            <SelectContent defaultValue={task.ticket.team ?? "soc"}>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="soc">SOC</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="appsec">AppSec</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="description">Description</Label>
          <Input type="text" id="description" value={task.ticket.description} />
          <RadioGroup defaultValue={task.ticket.difficulty.toString()}>
            <RadioGroupItem value="1" id="low" />
            <Label htmlFor="low">Low</Label>
            <RadioGroupItem value="2" id="medium" />
            <Label htmlFor="medium">Medium</Label>
            <RadioGroupItem value="3" id="high" />
            <Label htmlFor="high">High</Label>
            <RadioGroupItem value="4" id="critical" />
            <Label htmlFor="critical">Critical</Label>
          </RadioGroup>
          <Label htmlFor="assignees">Assignees</Label>
          <Input type="text" id="assignees" value={task.ticket.assignees ?? ""} />
          <Label htmlFor="timeEstimate">Time Estimate</Label>
          <Input type="number" id="timeEstimate" value={task.ticket.time_estimate ?? "Time Estimate (Hours)"} />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={task.ticket.current_status} />
            </SelectTrigger>
            <SelectContent defaultValue={task.ticket.current_status}>
              <SelectItem value="backlog">Backlog</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="code-review">Code Review</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="comments">Comments</Label>
          <Textarea id="comments" value={task.ticket.comments ?? "Write any comments here"} />
        </CardContent>
        <CardFooter>
            <Button type="submit">Modify</Button>
        </CardFooter>
      </form>
    </Card>
    </>
    )
  }
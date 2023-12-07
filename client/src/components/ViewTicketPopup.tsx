import { Task } from "@/features/dashboard/types/index"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ViewTicketProps {
  task: Task;
}

export function ViewTicket({task} : ViewTicketProps) {
  const renderDifficulty = () => {
    if(task.ticket.difficulty.toString() == "1") {
      return "Low"
    } else if(task.ticket.difficulty.toString() == "2") {
      return "Medium"
    } else if(task.ticket.difficulty.toString() == "3") {
      return "High"
    } else {
      return "Critical"
    }
  };

    return (
      <>
      <Card className="ticket">
      <CardHeader>
        <CardTitle>{task.ticket.title}</CardTitle> 
      </CardHeader>
      <CardContent>
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" value={task.ticket.title} disabled />
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder={task.ticket.team ?? "No Team Currently Assigned" } />
            </SelectTrigger>
            <SelectContent defaultValue={task.ticket.team ?? "soc"}>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="soc">SOC</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="appsec">AppSec</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="description">Description</Label>
          <Input type="text" id="description" value={task.ticket.description} disabled/>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Input type="text" id="difficulty" value={renderDifficulty()} disabled />
          <Label htmlFor="assignees">Assignees</Label>
          <Input type="text" id="assignees" value={task.ticket.assignees ?? "No Assignees"} disabled />
          <Label htmlFor="timeEstimate">Time Estimate</Label>
          <Input type="number" id="timeEstimate" value={task.ticket.time_estimate ?? "No Time Estimate"} disabled />
          <Select disabled>
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
          <Textarea id="comments" value={task.ticket.comments ?? "No comments"} disabled />
      </CardContent>
    </Card>
    </>
    )
  }
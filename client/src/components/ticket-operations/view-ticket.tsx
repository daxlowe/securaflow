import { Ticket } from "@/types"
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

export function ViewTicket
{
    return (
<Card className="ticket">
      <CardHeader>
        <CardTitle>{ticket.name}</CardTitle> 
      </CardHeader>
      <CardContent>
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" value={ticket.name} disabled />
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder= {ticket.group ?? "No Team Currently Assigned" } />
            </SelectTrigger>
            <SelectContent defaultValue={ticket.group ?? "soc"}>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="soc">SOC</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="appsec">AppSec</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="description">Description</Label>
          <Input type="text" id="description" value={ticket.description} disabled/>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Input type="text" id="difficulty" value={renderDifficulty()} disabled />
          <Label htmlFor="assignees">Assignees</Label>
          <Input type="text" id="assignees" value={ticket.assignees ?? "No Assignees"} disabled />
          <Label htmlFor="timeEstimate">Time Estimate</Label>
          <Input type="number" id="timeEstimate" value={ticket.time_estimate ?? "No Time Estimate"} disabled />
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder={ticket.current_status} />
            </SelectTrigger>
            <SelectContent defaultValue={ticket.current_status}>
              <SelectItem value="backlog">Backlog</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="code-review">Code Review</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="comments">Comments</Label>
          <Textarea id="comments" value={ticket.comments ?? "No comments"} disabled />
      </CardContent>
    </Card>
    );
}
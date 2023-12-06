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

export function Ticket(ticket:Ticket, status:String) {
  const renderDifficulty = () => {
    if(ticket.difficulty.toString() == "1") {
      return "Low"
    } else if(ticket.difficulty.toString() == "2") {
      return "Medium"
    } else if(ticket.difficulty.toString() == "3") {
      return "High"
    } else {
      return "Critical"
    }
  };

  if(status == "create") {
    return (
    <Card className="ticket">
      <CardHeader>
        <CardTitle>Create Ticket</CardTitle> 
      </CardHeader>
      <form>
        <CardContent>
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" placeholder="Title of vulnerability" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="(Optional) Select a team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="soc">SOC</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="appsec">AppSec</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="description">Description</Label>
          <Input type="text" id="description" placeholder="Description of vulnerability" />
          <RadioGroup defaultValue="1">
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
          <Input type="text" id="assignees" placeholder="(Optional) Assign to employee(s)" />
          <Label htmlFor="timeEstimate">Time Estimate</Label>
          <Input type="number" id="timeEstimate" placeholder="Time Estimate (Hours)" />
          <Select>
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
          <Textarea id="comments" placeholder="Write any comments here" />
          </CardContent>
          <CardFooter>
            <Button type="submit">Create</Button>
          </CardFooter>
      </form>
    </Card>
    )
  }
  else if(status =="modify") {
    return (
      <Card className="ticket">
      <CardHeader>
        <CardTitle>Modify Ticket</CardTitle> 
      </CardHeader>
      <form>
        <CardContent>
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" value={ticket.name} />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder= {ticket.group ?? "(Optional) Select a team" } />
            </SelectTrigger>
            <SelectContent defaultValue={ticket.group ?? "soc"}>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="soc">SOC</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="appsec">AppSec</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="description">Description</Label>
          <Input type="text" id="description" value={ticket.description} />
          <RadioGroup defaultValue={ticket.difficulty.toString()}>
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
          <Input type="text" id="assignees" value={ticket.assignees ?? ""} />
          <Label htmlFor="timeEstimate">Time Estimate</Label>
          <Input type="number" id="timeEstimate" value={ticket.time_estimate ?? "Time Estimate (Hours)"} />
          <Select>
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
          <Textarea id="comments" value={ticket.comments ?? "Write any comments here"} />
        </CardContent>
        <CardFooter>
            <Button type="submit">Modify</Button>
        </CardFooter>
      </form>
    </Card>
    )
  }
  else {
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
    )
  }
}
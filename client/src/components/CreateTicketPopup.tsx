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

export function CreateTicket() {
  return (
    <>
      <Card className="ticket h-[80vh]">
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
    </>
  )
}
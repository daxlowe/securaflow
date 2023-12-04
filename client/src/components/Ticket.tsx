import * as React from "react"
import { Ticket } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Ticket(ticket:Ticket, status:String) {
  return (
    <Card className="ticket">
      <CardHeader>
        
      </CardHeader>
    </Card>
  )
}
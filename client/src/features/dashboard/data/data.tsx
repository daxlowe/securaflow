import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  PlusCircledIcon,
  StopwatchIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "open",
    label: "Open",
  },
  {
    value: "In Progress",
    label: "In Progress",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "In Progress",
    label: "In Progress",
    icon: StopwatchIcon,
    color: "text-muted-foreground", // Set the color property
  },
  {
    value: "Assigned",
    label: "Assigned",
    icon: PlusCircledIcon,
    color: "text-muted-foreground", // Set the color property
  },
  {
    value: "Open",
    label: "Open",
    icon: CircleIcon,
    color: "text-muted-foreground/60", // Set the color property
  },
  {
    value: "Closed",
    label: "Closed",
    icon: CheckCircledIcon,
    color: "text-muted-foreground/30", // Set the color property
  },
];

export const priorities = [
  {
    label: "Critical",
    value: "Critical",
    icon: ExclamationTriangleIcon,
    color: "text-red-500", // Set the color property
  },
  {
    label: "High",
    value: "High",
    icon: ArrowUpIcon,
    color: "text-muted-foreground", // Set the color property
  },
  {
    label: "Medium",
    value: "Medium",
    icon: ArrowRightIcon,
    color: "text-muted-foreground/60", // Set the color property
  },
  {
    label: "Low",
    value: "Low",
    icon: ArrowDownIcon,
    color: "text-muted-foreground/30", // Set the color property
  },
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
    color: "text-green-500", // Set the color property
  },
];

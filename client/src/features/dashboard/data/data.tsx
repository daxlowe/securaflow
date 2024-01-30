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
  },
  {
    value: "Assigned",
    label: "Assigned",
    icon: PlusCircledIcon,
  },
  {
    value: "Open",
    label: "Open",
    icon: CircleIcon,
  },
  {
    value: "open",
    label: "Open",
    icon: CircleIcon,
  },
  {
    value: "Closed",
    label: "Closed",
    icon: CheckCircledIcon,
  },
];

export const priorities = [
  {
    label: "Critical",
    value: "Critical",
    icon: ExclamationTriangleIcon,
  },
  {
    label: "High",
    value: "High",
    icon: ArrowUpIcon,
  },
  {
    label: "Medium",
    value: "Medium",
    icon: ArrowRightIcon,
  },
  {
    label: "Low",
    value: "Low",
    icon: ArrowDownIcon,
  },
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
];

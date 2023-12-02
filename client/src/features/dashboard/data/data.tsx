import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: "open",
    label: "Open",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "",
    label: "",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Open",
    label: "Open",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "Low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "Medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "High",
    icon: ArrowUpIcon,
  },
]

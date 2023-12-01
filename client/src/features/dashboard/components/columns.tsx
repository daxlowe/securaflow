"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "../data/data"
import { Ticket } from "@/types"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Ticket>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[-2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "_id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Ticket" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("_id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            const label = labels.find((label) => label.value === row.original.current_status)

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("title")}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "current_status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const label = labels.find((label) => label.value === row.original.current_status)

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("current_status")}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "vulnerability.priority",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Priority" />
        ),
        cell: ({ row }) => {
            const priority = priorities.find(
                (priority) => priority.value === row.getValue("vulnerability.priority")
            )

            if (!priority) {
                return null
            }

            return (
                <div className="flex items-center">
                    {priority.icon && (
                        <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{priority.label}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "assignee",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Assignee" />
        ),
        cell: ({ row }) => {
            const label = labels.find((label) => label.value === row.original.current_status)

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("assignee")}
                    </span>
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]

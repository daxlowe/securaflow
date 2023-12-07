"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

import { priorities, statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Task>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="px-4 h-[50px] items-center flex">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="translate-y-[3px] "
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="px-4">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-[-3px] "
                />
            </ div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <div className="px-2">
                <DataTableColumnHeader column={column} title="Ticket" />
            </div>
        ),
        cell: ({ row }) => <div className="flex w-[80px] space-x-2 h-[50px] items-center overflow-x-auto px-2">{row.getValue("id")}</div>,
        enableSorting: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <div className="px-2">
                <DataTableColumnHeader column={column} title="Title" />
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex min-w-[200px] space-x-2 h-[50px] items-center overflow-x-auto px-2">
                    {row.getValue("title")}
                </div>
            )
        },
    },
    {
        accessorKey: "team",
        header: ({ column }) => (
            <div className="px-2">
                <DataTableColumnHeader column={column} title="Team" />
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2 h-[50px] w-[80px] items-center overflow-x-auto px-2">
                    {row.getValue("team")}
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <div className="px-2">
                <DataTableColumnHeader column={column} title="Status" />
            </div>
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            )

            if (!status) {
                return null
            }

            return (
                <div className="flex w-[109px] h-[50px] items-center overflow-x-auto px-2">
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{status.label}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "priority",
        header: ({ column }) => (
            <div className="px-2">
                <DataTableColumnHeader column={column} title="Priority" />
            </div>
        ),
        cell: ({ row }) => {
            const priority = priorities.find(
                (priority) => priority.value === row.getValue("priority")
            )

            if (!priority) {
                return null
            }

            return (
                <div className="flex w-[96px] h-[50px] items-center overflow-x-auto px-2">
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
            <div className="px-2">
                <DataTableColumnHeader column={column} title="Assignee" />
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[80px] space-x-2 h-[50px] items-center overflow-x-auto px-2">
                    {row.getValue("assignee")}
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        cell: ({ row }) =>
            <div className="px-2 h-[50px] items-center flex">
                <DataTableRowActions row={row} />
            </div>
        ,
    },
]
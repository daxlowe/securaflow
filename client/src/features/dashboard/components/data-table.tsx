"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "../components/data-table-pagination"
import { DataTableToolbar } from "../components/data-table-toolbar"
import { Skeleton } from "@/components/ui/skeleton"
import { Task } from "../types"
import { ViewTicket } from "@/components/ViewTicketPopup"
import { useState } from "react"
import { CreateTicket } from "@/components/CreateTicketPopup"
import { ModifyTicket } from "@/components/ModifyTicketPopup"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    enum ComponentTypes {
        ViewTicket = 'viewTicket',
        ModifyTicket = 'modifyTicket',
        CreateTicket = 'createTicket'
      }
    
    type ActiveComponentType = ComponentTypes | null;
    type VisibilityState = {
        [key: string]: boolean;
    };
      
        //State to track which component to display
        const [activeComponent, setActiveComponent] = useState<ActiveComponentType>(null);
        const [selectedTask, setSelectedTask] = useState<Task | null>(null);
        const [visibleRowId, setVisibleRowId] = useState<string | null>(null);

        const handleMenuClick = (componentName: ComponentTypes, task:Task) => {
          setActiveComponent(componentName);
          setSelectedTask(task);
        };
    
        const components: Record<ComponentTypes, JSX.Element> = {
          [ComponentTypes.ViewTicket]: <ViewTicket task={selectedTask} />,
          [ComponentTypes.CreateTicket]: <CreateTicket />,
          [ComponentTypes.ModifyTicket]: <ModifyTicket task={selectedTask} />,
        };

        const toggleVisibility = (rowId:string) => {
            setVisibleRowId(prevRowId => prevRowId === rowId ? null : rowId);
        };

    return (
        <div className="space-y-4">
            <DataTableToolbar table={table} />
            <div className="rounded-md border min-w-[575px]">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}
                                            className="p-0">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => {const originalData = row.original as Task;
                                        const ticket = originalData.ticket;
                                        // Manual validation
                                        if (
                                          !originalData.id ||
                                          !originalData.title ||
                                          !originalData.status ||
                                          !ticket?.vulnerability ||
                                          !ticket?.vulnerability.priority
                                        ) {
                                          // Handle validation error
                                          console.error("Invalid Ticket data:", originalData);
                                          return null; // or return an error component
                                        }
                                      
                                        // Now you can safely use the data
                                        const task = originalData;
                                    handleMenuClick(ComponentTypes.ViewTicket, task);
                                    toggleVisibility(row.id)}}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="p-0">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell>
                                    <div></div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[80px]" />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[200px]" />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[80px]" />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[80px]" />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[80px]" />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-[80px]" />
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
            {visibleRowId && activeComponent && components[activeComponent]}
        </div>
    )
}

import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination"


export interface Column<T> {
    header: string
    accessor: (row: T, index?: number) => React.ReactNode
    align?: "left" | "center" | "right",
}

export interface LaravelPagination<T> {
    data: T[]
    links: { url: string | null; label: string; active: boolean }[]
    meta?: Record<string, any>
}

interface DataTableProps<T> {
    columns: Column<T>[]
    data: T[] | LaravelPagination<T>
    emptyMessage?: string,
}
const DataTable = <T,>({
    columns,
    data,
    emptyMessage = "No data found."
}: DataTableProps<T>) => {
    const rows = Array.isArray(data) ? data : data.data
    const links = !Array.isArray(data) ? data.links : undefined

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            {/* Table */}
            <Table className="min-w-full text-sm">
                <TableHeader>
                    <TableRow>
                        {columns.map((col, i) => (
                            <TableHead className="bg-gray-800 text-white text-xs font-semibold " key={i}>{col.header}</TableHead>
                        ))}

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.length > 0 ? (
                        rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex} className="group">
                                {columns.map((col, colIndex) => (
                                    <TableCell key={colIndex} className={`transition-colors group-hover:bg-gray-100 bg-background`}>
                                        {col.accessor(row, rowIndex)}
                                    </TableCell>
                                ))}

                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center text-gray-500">
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Pagination */}
            {links && links.length > 0 && (
                <Pagination>
                    <PaginationContent>
                        {links.map((link, index) => {
                            const isDisabled = !link.url;

                            if (link.label.includes("Previous")) {
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationPrevious
                                            size="default"
                                            className={isDisabled ? "pointer-events-none opacity-50" : ""}
                                            href={link.url || undefined}
                                        >
                                            Previous
                                        </PaginationPrevious>
                                    </PaginationItem>
                                )
                            }

                            if (link.label.includes("Next")) {
                                return (
                                    <PaginationItem key={index}>
                                        <PaginationNext
                                            size="default"
                                            className={isDisabled ? "pointer-events-none opacity-50" : ""}
                                            href={link.url || undefined}
                                        >
                                            Next
                                        </PaginationNext>
                                    </PaginationItem>
                                )
                            }

                            return (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        isActive={link.active}
                                        size="default"
                                        className={isDisabled ? "pointer-events-none opacity-50" : ""}
                                        href={link.url || undefined}
                                    >
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}

export default DataTable

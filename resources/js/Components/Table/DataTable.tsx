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
import { getVisiblePages } from "@/helper/pagination"
import { on } from "events"


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
    onPageChange?: (url: string | null) => void
}
const DataTable = <T,>({
    columns,
    data,
    emptyMessage = "No data found.",
    onPageChange
}: DataTableProps<T>) => {
    const rows = Array.isArray(data) ? data : data.data
    const links = !Array.isArray(data) ? data.links : undefined
    const pageNumbers = getVisiblePages(links || [])
    return (
        <div className="overflow-x-auto flex flex-col gap-10 rounded-xl border border-gray-200 shadow-sm">
            {/* Table */}
            <Table className="min-w-full text-sm">
                <TableHeader>
                    <TableRow>
                        {columns.map((col, i) => (
                            <TableHead className="bg-gradient-to-br from-fuchsia-100 to-violet-100 font-bold text-xs  " key={i}>{col.header}</TableHead>
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
                    <PaginationContent className="flex items-center justify-center gap-2">
                        {/* Previous */}
                        {links.map(link =>
                            link.label.includes("Previous") ? (
                                <PaginationItem key={link.label}>
                                    <PaginationPrevious
                                        href={!onPageChange ? link.url || undefined : undefined}
                                        className={!link.url ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        onClick={onPageChange ? () => onPageChange(link.url) : undefined}
                                    >
                                        Previous
                                    </PaginationPrevious>
                                </PaginationItem>
                            ) : null
                        )}

                        {/* Page numbers */}
                        {pageNumbers.map((page, idx) => {
                            const link = links?.find(l => Number(l.label) === page)
                            return (
                                <PaginationItem key={idx}>
                                    {page === "..." ? (
                                        <span className="px-3 py-1">...</span>
                                    ) : (
                                        <PaginationLink
                                            className="cursor-pointer"
                                            isActive={link?.active}
                                            href={!onPageChange ? link?.url || undefined : undefined}
                                            onClick={onPageChange ? () => onPageChange(link?.url || null) : undefined}
                                        >
                                            {page}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            )
                        })}

                        {/* Next */}
                        {links.map(link =>
                            link.label.includes("Next") ? (
                                <PaginationItem key={link.label}>
                                    <PaginationNext
                                        href={!onPageChange ? link.url || undefined : undefined}
                                        className={!link.url ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        onClick={onPageChange ? () => onPageChange(link.url) : undefined}
                                    >
                                        Next
                                    </PaginationNext>
                                </PaginationItem>
                            ) : null
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}

export default DataTable

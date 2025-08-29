import React, { useMemo } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationEllipsis,
} from "@/Components/ui/pagination";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { getVisiblePages } from "@/helper/pagination";

type RawLink = {
    url: string | null
    label: string
    active: boolean
}

type NormalizedLink = RawLink & {
    text: string
    page: number | null
    isPrev: boolean
    isNext: boolean
    isEllipsis: boolean
}

type Props = {
    links: RawLink[];
    onNavigate: (url: string | null) => void;
    className?: string
}

export default function LaravelPagination({ links, onNavigate, className }: Props) {

    const normalized: NormalizedLink[] = useMemo(() => {
        return links.map((link) => {
            const text = link.label.replace(/&laquo;|&raquo;|&hellip;/g, "").trim()
            return {
                ...link,
                text,
                page: !isNaN(Number(text)) ? Number(text) : null,
                isPrev: /laquo|lsaquo|‹|«/i.test(link.label),
                isNext: /raquo|rsaquo|›|»/i.test(link.label),
                isEllipsis: /…|ellip|\.{3}/.test(link.label),
            }
        })
    }, [links])


    const visiblePages = getVisiblePages(links)
    const prevLink = normalized.find((l) => l.isPrev)
    const nextLink = normalized.find((l) => l.isNext)


    return (
         <Pagination className={className}>
            <PaginationContent>
                {/* Prev button */}
                {prevLink && (
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => prevLink.url && onNavigate(prevLink.url)}
                            className="px-4 py-2"
                        >
                            <IoChevronBack className="w-4 h-4" />
                        </PaginationLink>
                    </PaginationItem>
                )}

                {/* Page numbers */}
                {visiblePages.map((p, i) => {
                    if (p === "...") {
                        return <PaginationEllipsis key={`ellipsis-${i}`} />;
                    }

                    const link = normalized.find((l) => l.page === p);
                    if (!link) return null

                    return (
                        <PaginationItem key={p}>
                            <PaginationLink
                                onClick={() => link.url && onNavigate(link.url)}
                                isActive={link.active}
                                className={`px-4 py-2 ${
                                    link.active
                                        ? "bg-violet-400 text-white shadow-md"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                } rounded-lg ${
                                    !link.url
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer"
                                } ${className || ""}`}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}

                {/* Next button */}
                {nextLink && (
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => nextLink.url && onNavigate(nextLink.url)}
                            className="px-4 py-2"
                        >
                            <IoChevronForward className="w-4 h-4" />
                        </PaginationLink>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}

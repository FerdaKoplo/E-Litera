import React, { useMemo } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationEllipsis,
} from "@/Components/ui/pagination";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

type RawLink = { url: string | null; label: string; active: boolean };

type Props = {
    links: RawLink[];
    onNavigate: (url: string | null) => void;
    className?: string;
};

export default function LaravelPagination({ links, onNavigate, className }: Props) {

    const normalized = useMemo(() => {
        return links.map((link) => {
            const text = link.label.replace(/&laquo;|&raquo;|&hellip;/g, "").trim();
            return {
                ...link,
                text,
                isPrev: /laquo|lsaquo|‹|«/i.test(link.label),
                isNext: /raquo|rsaquo|›|»/i.test(link.label),
                isEllipsis: /…|ellip|\.{3}/.test(link.label),
            };
        });
    }, [links]);

    return (
        <Pagination className={className}>
            <PaginationContent>
                {normalized.map((link, i) => {
                    if (link.isEllipsis) return <PaginationEllipsis key={i} />;

                    let content: React.ReactNode = link.text
                    if (link.isPrev) content = <IoChevronBack className="w-4 h-4" />;
                    if (link.isNext) content = <IoChevronForward className="w-4 h-4" />;

                    return (
                        <PaginationItem key={i}>
                            <PaginationLink
                                onClick={() => link.url && onNavigate(link.url)}
                                isActive={link.active}
                                className={`$ px-4 py-2 ${link.active
                                        ? "bg-violet-400 text-white shadow-md"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                    } rounded-lg ${!link.url ? "pointer-events-none opacity-50 " : "cursor-pointer"} ${className}`}>
                                {content}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}

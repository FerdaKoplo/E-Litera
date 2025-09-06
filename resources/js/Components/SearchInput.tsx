import { IoIosSearch } from "react-icons/io";
import Input from "./Input";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

interface SearchBarProps<T = any> {
    value: string;
    onChange: (val: string) => void;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    placeholder?: string;
    buttonLabel?: string;
    className?: string;
    liveResults?: T[];
    showLiveResults?: boolean;
    onSelectLiveResult?: (item: T) => void;
    renderResult?: (item: T) => React.ReactNode
}

export default function SearchBar<T>({
    value,
    onChange,
    onSubmit,
    placeholder = "Search...",
    buttonLabel = "Search",
    className = "",
    liveResults,
    onSelectLiveResult,
    showLiveResults,
    renderResult
}: SearchBarProps<T>) {

    const searchRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(showLiveResults)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])


       useEffect(() => {
        const handleEscapeKey = (event : KeyboardEvent) => {
            if (event.key === 'Escape' && open) {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener('keydown', handleEscapeKey)
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey)
        }

    }, [open])


    useEffect(() => {
        if (liveResults && liveResults.length > 0) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [liveResults])


    return (
        <div ref={searchRef} className={`relative w-full max-w-lg ${className}`}>
            <form onSubmit={onSubmit} className="flex gap-2 w-full">
                <div className="relative flex-1">
                    <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onFocus={() => {
                            if (liveResults && liveResults.length > 0) setOpen(true);
                        }}
                        onChange={(e) => onChange(e.target.value)}
                        className="pl-10 pr-3 py-3 !rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-violet-200"
                    />
                </div>
                <Button
                    type="submit"
                    className="bg-white text-violet-400 border-violet-400 px-4 border-2 hover:bg-violet-100 transition h-full sm:h-auto"
                >
                    {buttonLabel}
                </Button>
            </form>

            {open && showLiveResults && liveResults && liveResults.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border rounded shadow-md z-10 max-h-60 overflow-auto mt-1">
                    {liveResults.map((item, index) => (
                        <li
                            key={index}
                            className="px-3 py-2 hover:bg-violet-50 cursor-pointer"
                            onClick={() => onSelectLiveResult?.(item)}
                        >
                            {renderResult ? renderResult(item) : JSON.stringify(item)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

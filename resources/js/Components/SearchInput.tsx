import { IoIosSearch } from "react-icons/io";
import Input from "./Input";
import Button from "./Button";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  buttonLabel = "Search",
  className = "",
}: SearchBarProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col sm:flex-row gap-2 w-full max-w-lg ${className}`}
    >
      <div className="relative flex-1">
        <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-3 py-2 !rounded-full w-full focus:outline-none focus:ring-2 focus:ring-violet-200"
        />
      </div>
      <Button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-violet-400 transition h-full sm:h-auto"
      >
        {buttonLabel}
      </Button>
    </form>
  )
}

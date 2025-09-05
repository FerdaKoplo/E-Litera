import { useCallback, useEffect, useRef, useState } from "react"
import Input from "./Input"
import { FaPen } from "react-icons/fa6"

type EditableFieldProps = {
    value: string | null
    onSave: (newValue: string) => void
    placeholder?: string
}

const EditableField = ({ value, onSave, placeholder }: EditableFieldProps) => {
    const inputRef = useRef<HTMLDivElement>(null)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>(value ?? "")

    useEffect(() => {
        setInputValue(value ?? "")
    }, [value])

    const handleSave = useCallback(() => {
        let newValue = inputValue.trim() === "" ? null : inputValue

        if (newValue !== (value ?? "")) {
            onSave(newValue as any)
        }
        setIsEditing(false)
    }, [inputValue, value, onSave])

    const handleCancel = useCallback(() => {
        setInputValue(value || "")
        setIsEditing(false)
    }, [value])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSave()
        } else if (e.key === 'Escape') {
            e.preventDefault()
            handleCancel()
        }
    }, [handleSave, handleCancel])

    useEffect(() => {
        if (!isEditing) return

        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                handleSave()
            }
        }

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCancel()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener('keydown', handleEscapeKey)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [isEditing, handleSave, handleCancel])

    return (
        <div ref={inputRef}>
            {isEditing ? (
                <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="rounded-lg"
                    autoFocus
                />
            ) : (
                <span onClick={() => setIsEditing(true)} className="cursor-pointer px-1 gap-2 py-0.5 rounded flex">
                    {value || placeholder || "Not provided"}
                    <FaPen size={8} className="text-violet-500"/>
                </span>
            )}
        </div>
    )
}

export default EditableField

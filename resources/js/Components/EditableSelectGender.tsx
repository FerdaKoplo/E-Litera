import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { FaPen } from 'react-icons/fa6'

interface EditableSelectGenderProps {
    value: string | null
    onSave: (newValue: string) => void
    placeholder?: string
}

const EditableSelectGender = ({ onSave, value, placeholder }: EditableSelectGenderProps) => {

    const selectRef = useRef<HTMLDivElement>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedValue, setSelectedValue] = useState<string>("")


    useEffect(() => {
        setSelectedValue(value ?? "")
    }, [value])
    const handleChange = (newValue: string) => {
        setSelectedValue(newValue)
        onSave(newValue)
        setIsEditing(false)
    }

    const handleCancel = useCallback(() => {
        setSelectedValue(value ?? "")
        setIsEditing(false)
    }, [value])
    useEffect(() => {
        if (!isEditing) return

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCancel()
            }
        }

        document.addEventListener('keydown', handleEscapeKey)

        return () => {
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [isEditing, handleCancel])

    return (
        <div ref={selectRef} className="relative">
            {isEditing ? (
                <Select value={selectedValue} onValueChange={handleChange}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder={placeholder || "Select gender"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                </Select>
            ) : (
                <span
                    onClick={() => setIsEditing(true)}
                    className="cursor-pointer px-1 gap-2 py-0.5 rounded flex items-center"
                >
                    {value || placeholder || "Not provided"}
                    <FaPen size={8} className="text-violet-500" />
                </span>
            )}
        </div>
    )
}
export default EditableSelectGender

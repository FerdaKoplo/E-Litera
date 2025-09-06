import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Calendar as ShadCalendar } from '@/Components/ui/calendar'
import { Popover, PopoverTrigger, PopoverContent } from '@/Components/ui/popover'
import { FaPen } from 'react-icons/fa6'
import { parseDateAsLocal } from '@/helper/convert-date'

type EditableDateFieldProps = {
    value: string | null
    onSave: (newValue: string) => void
    placeholder?: string
}

const EditableDateField = ({ value, onSave, placeholder }: EditableDateFieldProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const popoverRef = useRef<HTMLDivElement>(null)

    const [isEditing, setIsEditing] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        value ? parseDateAsLocal(value) : undefined
    )

    useEffect(() => {
        setSelectedDate(value ? parseDateAsLocal(value) : undefined)
    }, [value])

    const handleSave = useCallback(
        (date: Date | undefined) => {
            if (date) {
                const isoString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                if (isoString !== (value ?? '')) {
                    onSave(isoString)
                }
            }
            setIsEditing(false)
        },
        [value, onSave]
    )

    const handleCancel = useCallback(() => {
        setSelectedDate(value ? parseDateAsLocal(value) : undefined)
        setIsEditing(false)
    }, [value])

    useEffect(() => {
        if (!isEditing) return

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(target) &&
                popoverRef.current &&
                !popoverRef.current.contains(target)
            ) {
                handleSave(selectedDate)
            }
        }

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCancel()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscapeKey)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [isEditing, handleSave, handleCancel, selectedDate])

    return (
        <div ref={wrapperRef} className="flex flex-col ">
            {isEditing ? (
                <Popover open>
                    <PopoverTrigger asChild>
                        <span className="absolute w-0 h-0 " />
                    </PopoverTrigger>
                    <PopoverContent ref={popoverRef} side="bottom"
                        align="start" className="w-auto p-0">
                        <ShadCalendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                                setSelectedDate(date ?? undefined)
                                handleSave(date ?? undefined)
                            }}
                            className="rounded-md border"
                            captionLayout="dropdown"
                        />
                    </PopoverContent>
                </Popover>
            ) : (
                <span
                    onClick={() => setIsEditing(true)}
                    className="cursor-pointer px-1 gap-2 py-0.5 rounded flex items-center"
                >
                    {selectedDate ? selectedDate.toLocaleDateString() : placeholder || 'Not provided'}
                    <FaPen size={8} className="text-violet-500" />
                </span>
            )}
        </div>
    )
}

export default EditableDateField

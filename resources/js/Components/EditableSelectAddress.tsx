import React, { useCallback, useEffect, useRef, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { useAddress } from "@/hook/useAddress"
import { FaPen } from "react-icons/fa6"

type AddressLevel = "province" | "city" | "district" | "subDistrict" | "postalCode"

interface EditableSelectAddressProps {
    level: AddressLevel
    value: string | null
    parentId?: string
     grandParentId?: string
    onSave: (newValue: { id: number; name: string }) => void
    placeholder?: string
}

const EditableSelectAddress = ({grandParentId, level, value, parentId, onSave, placeholder }: EditableSelectAddressProps) => {
    const { provinces, cities, districts, subDistricts, postalCodes,
        fetchCities, fetchDistricts, fetchSubDistricts, fetchPostalCodes } = useAddress()
    const wrapperRef = useRef<HTMLDivElement>(null)

    const [isEditing, setIsEditing] = useState(false)
    const [selectedValue, setSelectedValue] = useState<string>("")

    useEffect(() => {
        if (!parentId) return

        switch (level) {
            case "city":
                console.log('Fetching cities for province:', parentId)
                fetchCities(parentId)
                break
            case "district":
                fetchDistricts(parentId)
                break
            case "subDistrict":
                fetchSubDistricts(parentId)
                break
            case "postalCode":
                fetchPostalCodes(parentId, grandParentId ?? "")
                break
        }
    }, [parentId, level])

    const options = (() => {
        switch (level) {
            case "province":
                return provinces
            case "city":
                console.log('Available cities:', cities, 'ParentId:', parentId)
                return cities
            case "district":
                return districts
            case "subDistrict":
                return subDistricts
            case "postalCode":
                return postalCodes
            default:
                return []
        }
    })()

    useEffect(() => {
        if (value && options.length > 0) {
            const found = options.find(o => o.text === value)
            setSelectedValue(found ? found.id.toString() : "")
        } else {
            setSelectedValue("")
        }
    }, [value, options])

    const handleSave = useCallback(
        (newValue: string) => {
            const selected = options.find(o => o.id.toString() === newValue)
            if (selected) {
                console.log('Saving:', selected)
                onSave({ id: Number(selected.id), name: selected.text })
            }
            setIsEditing(false)
        },
        [options, onSave]
    )

    const handleCancel = useCallback(() => {
        setIsEditing(false)
        if (value && options.length > 0) {
            const found = options.find(o => o.text === value)
            setSelectedValue(found ? found.id.toString() : "")
        }
    }, [value, options])

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

    if (level === "city" && !parentId) {
        return (
            <div className="flex flex-col flex-1">
                <span className="cursor-not-allowed px-1 gap-2 py-0.5 rounded flex items-center text-gray-400">
                    Select province first
                    <FaPen size={8} className="text-gray-300" />
                </span>
            </div>
        )
    }

    return (
        <div ref={wrapperRef} className="flex flex-col flex-1">
            {isEditing ? (
                <Select
                    value={selectedValue}
                    onValueChange={handleSave}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder={placeholder || `Select ${level}`} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.length === 0 ? (
                            <div className="p-2 text-sm text-gray-500">
                                Loading {level}s...
                            </div>
                        ) : (
                            options.map((opt) => (
                                <SelectItem key={opt.id} value={opt.id.toString()}>
                                    {opt.text}
                                </SelectItem>
                            ))
                        )}
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

export default EditableSelectAddress

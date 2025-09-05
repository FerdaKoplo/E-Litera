import React from 'react'

interface StatusCellProps {
  status: string
  styleMap?: Record<string, string>
  baseClasses?: string
}

const StatusCell: React.FC<StatusCellProps> = ({
  status,
  styleMap,
  baseClasses = "px-3 w-fit py-1 rounded-full flex items-center gap-2 border-2 bg-white ",
}) => {
  const defaultStyleMap: Record<string, string> = {
    overdue: "border-red-500 text-red-500",
    pending: "border-yellow-500 text-yellow-500",
    returned: "border-blue-400 text-blue-400",
    borrowed: "border-green-400 text-green-400",
    completed: "border-green-400 text-green-400",
  }

  const appliedStyles = styleMap ? styleMap[status] : defaultStyleMap[status] || "border-gray-300 text-gray-300"

  return <span className={`${baseClasses} ${appliedStyles}`}>{status}</span>
}

export default StatusCell

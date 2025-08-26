import { useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import Button from './Button'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'

interface NotificationItem {
    id: string
    data: Record<string, any>
    read_at: string | null
    created_at: string
}

interface Props {
    icon: React.ReactNode
    open: boolean
    onOpenChange?(open: boolean): void
    notifications: NotificationItem[]
}

const Notifications: React.FC<Props> = ({ icon, open, onOpenChange, notifications }) => {
    const { post } = useForm()

    const [localNotifications, setLocalNotifications] = useState(notifications)

    const handleMarkRead = (notif: NotificationItem) => {
        if (!notif.read_at) {
            post(route('notifications.read', notif.id))
            setLocalNotifications(prev =>
                prev.filter(n => n.id !== notif.id)
            )
        }
    }

    return (
        <div className="relative">
            <button onClick={() => onOpenChange?.(!open)}>
                {icon}
                {localNotifications.some(n => !n.read_at) && (
                    <span className="absolute -top-1 left-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"/>
                )}
            </button>

            <div className={`absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white shadow-lg rounded-md p-4 z-50
                  transition-all duration-300 transform origin-top-right ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {localNotifications.length === 0 ? (
                    <p className="text-sm text-gray-500">No new notifications</p>
                ) : (
                    localNotifications.map(notif => (
                        <div
                            key={notif.id}
                            className={`flex gap-3 items-center p-2 rounded-md cursor-pointer transition-all hover:bg-gray-100 ${!notif.read_at ? ' font-semibold' : ''
                                }`}
                            onClick={() => handleMarkRead(notif)}
                        >
                            <div className='flex flex-col'>
                                <p className="text-sm">{notif.data.message}</p>
                                <span className="text-xs text-gray-400">
                                    {new Date(notif.created_at).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Notifications

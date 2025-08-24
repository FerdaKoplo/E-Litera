import React from 'react'


interface Props {
    icon: React.ReactNode
    open: boolean
    onOpenChange?(open: boolean): void
    notifications: {
        id: string
        type: string
        notifiable_id: number | string
        notifiable_type: string
        data: Record<string, any>
        read_at: string | null
        created_at: string
        updated_at: string
    }[]
}

const Notification: React.FC<Props> = ({ icon, open, onOpenChange, notifications }) => {
    return (
        <div className="relative">
            <button onClick={() => onOpenChange?.(!open)}>
                {icon}
                {notifications.length > 0 && (
                    <span className="absolute -top-1 left-2 w-3 h-3 bg-red-500 rounded-full" />
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md p-4 z-50">
                    {notifications.length === 0 ? (
                        <p className="text-sm text-gray-500">No new notifications</p>
                    ) : (
                        notifications.map((notif) => (
                            <div key={notif.id} className="p-2 border-b last:border-none">
                                <p className="text-sm">{notif.data.message}</p>
                                <span className="text-xs text-gray-400">
                                    {new Date(notif.created_at).toLocaleString()}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default Notification

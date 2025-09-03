import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { RiSettings3Fill } from 'react-icons/ri'

interface Props {
    profile?: string
    fallback?: string
    username?: string
    email?: string
}

const getInitials = (name?: string) => {
    if (!name) return ''
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0][0]
    return `${parts[0][0]}${parts[parts.length - 1][0]}`
}


const ProfileCard: React.FC<Props> = ({ profile, fallback, username, email }) => {
    return (
        <div className='p-2 gap-2 flex w-full justify-between items-center'>
            <div className='flex gap-3 items-center'>
                <Avatar>
                    <AvatarImage src={profile} />
                    <AvatarFallback className='bg-gradient-to-t from-violet-500 to-indigo-400 text-white font-semibold'>{getInitials(fallback)}</AvatarFallback>
                </Avatar>
                <div className='text-white '>
                    <p className='text-sm font-semibold truncate max-w-[110px] block'>{username}</p>
                    <p className='text-xs text-gray-300 truncate max-w-[110px] block'>{email}</p>
                </div>
            </div>
            <div className='text-white text-lg'>
                <RiSettings3Fill />
            </div>
        </div>
    )
}

export default ProfileCard

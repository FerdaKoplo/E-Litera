import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'


interface Props {
    profile?: string
    fallback?: string
}

const getInitials = (name?: string) => {
    if (!name) return ''
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0][0]
    return `${parts[0][0]}${parts[parts.length - 1][0]}`
}

const Profile : React.FC<Props> = ( {profile, fallback} ) => {
    return (
        <Avatar>
            <AvatarImage src={profile} />
            <AvatarFallback className='bg-gradient-to-t from-violet-500 to-indigo-400 text-white font-semibold'>{getInitials(fallback)}</AvatarFallback>
        </Avatar>
    )
}

export default Profile

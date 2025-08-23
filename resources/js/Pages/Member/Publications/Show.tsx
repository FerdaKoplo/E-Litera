import HomeLayout from '@/Layouts/HomeLayout'
import { usePage } from '@inertiajs/react'
import React from 'react'

const Show = () => {

    const { props } = usePage<{ publications: Publications }>()

    return (
        <HomeLayout>
            <div>
                teasadas
            </div>
        </HomeLayout>
    )
}

export default Show

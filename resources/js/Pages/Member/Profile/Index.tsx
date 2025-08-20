import Button from '@/Components/Button'
import MemberLayout from '@/Layouts/MemberLayout'
import { Link } from '@inertiajs/react'
import React from 'react'


const Index = () => {
  return (
    <MemberLayout header={
         <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Profile</h1>
                <Link href="/profile/edit">
                    <Button type="button" className="text-white rounded-lg">
                        Edit Profile
                    </Button>
                </Link>
            </div>
    } >
        <div>

        </div>
    </MemberLayout>
  )
}

export default Index

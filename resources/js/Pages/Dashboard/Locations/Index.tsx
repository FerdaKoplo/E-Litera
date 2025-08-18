import Button from '@/Components/Button'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { Link } from '@inertiajs/react'
import React from 'react'

const Index = () => {
    return (
        <DashboardLayout header={
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Location</h1>
                <Link href="/locations/create">
                    <Button type="button" className="text-white rounded-lg">
                        + Add Location
                    </Button>
                </Link>
            </div>
        }  >
            <div>

            </div>
        </DashboardLayout>
    )
}

export default Index

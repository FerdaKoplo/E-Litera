import DashboardLayout from '@/Layouts/DasboardLayout'
import MemberLayout from '@/Layouts/MemberLayout'
import React from 'react'

const Dashboard = () => {
    return (
        <MemberLayout header={
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>
        } >
            <div>

            </div>
        </MemberLayout>
    )
}

export default Dashboard

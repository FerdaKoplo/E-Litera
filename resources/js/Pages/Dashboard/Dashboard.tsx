import DashboardLayout from '@/Layouts/DasboardLayout'
import React from 'react'

const Dashboard = () => {
    const breadcrumbs = [
        { name: 'Dashboard', href: '/dashboard' },
    ]

    return (
        <DashboardLayout header={<h1 className="text-2xl font-semibold">Dashboard</h1>} breadcrumbs={breadcrumbs}>
            Ini dashboard
        </DashboardLayout>
    )
}

export default Dashboard

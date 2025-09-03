import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import { deliveryColumns } from '@/Constant/columns'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { PageProps } from '@/types'
import { usePage } from '@inertiajs/react'
import React from 'react'

const breadcrumbs = [
    { name: 'Delivery', href: '/delivery' },
]

const Index = () => {

   const { deliveries } = usePage<
          PageProps<{ deliveries: LaravelPagination<Delivery> }>
      >().props

    return (

    <DashboardLayout header={
        <h1 className="text-2xl font-semibold">Delivery</h1>
    } breadcrumbs={breadcrumbs}>
        <div>
            <DataTable columns={deliveryColumns} data={deliveries}  />
        </div>
    </DashboardLayout>
  )
}

export default Index

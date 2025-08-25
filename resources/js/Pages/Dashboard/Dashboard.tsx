import Notifications from '@/Components/Notifications'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/Components/ui/chart'
import { SelectContent, SelectItem, SelectValue } from '@/Components/ui/select'
import DashboardLayout from '@/Layouts/DasboardLayout'
import { PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import { SelectTrigger } from '@radix-ui/react-select'
import React, { useEffect, useState } from 'react'
import { Select } from 'react-day-picker'
import { BiSolidBookReader } from 'react-icons/bi'
import { BsBellFill } from 'react-icons/bs'
import { IoIosPaper, IoMdWarning } from 'react-icons/io'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { TbBooks, TbClock } from "react-icons/tb";
import { FaArrowRightLong } from 'react-icons/fa6'

const breadcrumbs = [
    { name: 'Dashboard', href: '/dashboard' },
]
const chartConfig = {
    count: { label: "Loans" }
} satisfies ChartConfig

const Dashboard = () => {

    const [openNotif, setOpenNotif] = useState<boolean>(false)
    const { notifications, articles, publications, loansTotal, loansOverdue, loansActive, loanChartData } = usePage<PageProps>().props

    return (
        <DashboardLayout header={
            <div className='flex justify-between'>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <Notifications
                    icon={<BsBellFill />}
                    open={openNotif}
                    onOpenChange={setOpenNotif}
                    notifications={notifications}
                />
            </div>
        } breadcrumbs={breadcrumbs}>

            <div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
                    <Card className='bg-gradient-to-t flex flex-col justify-center from-zinc-100 to-white hover:scale-105 transition duration-300'>
                        <div className='flex items-center justify-center'>
                            <CardTitle className='text-2xl bg-gradient-to-t p-3 text-white rounded-xl from-violet-500 to-indigo-300'>
                                <TbBooks />
                            </CardTitle>
                            <CardHeader className='flex-col'>
                                <CardTitle>{loansTotal}</CardTitle>
                                <CardDescription>Total Loans</CardDescription>
                            </CardHeader>
                        </div>

                        <Link href={'/loans'}>
                            <CardHeader className='text-sm flex justify-between '>
                                <span>
                                    View Loans
                                </span>
                                <FaArrowRightLong />
                            </CardHeader>
                        </Link>
                    </Card>

                    <Card className='bg-gradient-to-t flex flex-col  justify-center from-zinc-100 to-white hover:scale-105 transition duration-300'>
                        <div className='flex justify-center items-center'>
                            <CardTitle className='text-2xl bg-gradient-to-t p-3 text-white rounded-xl from-green-500 to-mint-300'>
                                <TbClock />
                            </CardTitle>
                            <CardHeader className='flex-col'>
                                <CardTitle>{loansActive}</CardTitle>
                                <CardDescription>Active Loans</CardDescription>
                            </CardHeader>
                        </div>

                        <Link href={'/loans'}>
                            <CardHeader className='text-sm flex justify-between '>
                                <span>
                                    View Loans
                                </span>
                                <FaArrowRightLong />
                            </CardHeader>
                        </Link>
                    </Card>

                    <Card className='bg-gradient-to-t flex flex-col  justify-center from-zinc-100 to-white hover:scale-105 transition duration-300'>
                        <div className='flex items-center justify-center'>
                            <CardTitle className='text-2xl bg-gradient-to-t p-3 text-white rounded-xl from-red-500 to-amber-300'>
                                <IoMdWarning />
                            </CardTitle>
                            <CardHeader className='flex-col'>
                                <CardTitle>{loansOverdue}</CardTitle>
                                <CardDescription>Overdue Loans</CardDescription>
                            </CardHeader>
                        </div>
                        <Link href={'/loans'}>
                            <CardHeader className='text-sm flex justify-between '>
                                <span>
                                    View Loans
                                </span>
                                <FaArrowRightLong />
                            </CardHeader>
                        </Link>
                    </Card>


                    <Card className='bg-gradient-to-t flex flex-col justify-center  from-zinc-100 to-white hover:scale-105 transition duration-300'>
                        <div className='flex items-center justify-center'>
                            <CardTitle className='text-2xl bg-gradient-to-t p-3 text-white rounded-xl from-blue-500 to-sky-300'>
                                <BiSolidBookReader />
                            </CardTitle>
                            <CardHeader className='flex-col'>
                                <CardTitle>{publications}</CardTitle>
                                <CardDescription>Publications</CardDescription>
                            </CardHeader>
                        </div>
                        <Link href={'/publications'}>
                            <CardHeader className='text-sm flex justify-between '>
                                <span>
                                    View Publication
                                </span>
                                <FaArrowRightLong />
                            </CardHeader>
                        </Link>
                    </Card>

                    <Card className='bg-gradient-to-t flex flex-col  justify-center from-zinc-100 to-white hover:scale-105 transition duration-300'>

                        <div className='flex items-center justify-center'>
                            <CardTitle className='text-2xl bg-gradient-to-t p-3 text-white rounded-xl from-amber-500 to-yellow-300'>
                                <IoIosPaper />
                            </CardTitle>
                            <CardHeader className='flex-col'>
                                <CardTitle className='text-2xl'>{articles}</CardTitle>
                                <CardDescription>Articles</CardDescription>
                            </CardHeader>
                        </div>

                        <Link href={'/articles'}>
                            <CardHeader className='text-sm flex justify-between '>
                                <span>
                                    View Articles
                                </span>
                                <FaArrowRightLong />
                            </CardHeader>
                        </Link>
                    </Card>
                </div>


                <Card className='p-5'>
                    <CardTitle className='text-2xl'>
                        Total Loans
                    </CardTitle>
                    <CardDescription>
                        Total Loans For Past Month
                    </CardDescription>
                    <ChartContainer config={chartConfig}>
                        <AreaChart data={loanChartData} width={700} height={300} >
                            <defs>
                                <linearGradient id="fillLoan" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#a78bfa   " stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                                }}
                            />
                            <ChartTooltip
                                content={<ChartTooltipContent labelFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })} indicator="dot" />}
                            />
                            <Area
                                dataKey="count"
                                type="natural"
                                fill="url(#fillLoan)"
                                stroke="#8b5cf6"
                            />
                        </AreaChart>
                    </ChartContainer>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard

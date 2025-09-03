import MemberLayout from '@/Layouts/MemberLayout'
import Button from '@/Components/Button'
import Label from '@/Components/Label'
import SearchBar from '@/Components/SearchInput'
import DataTable, { LaravelPagination } from '@/Components/Table/DataTable'
import { Card, CardTitle } from '@/Components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/Components/ui/toggle-group'
import { deliveryColumns, deliveryMemberColumns } from '@/Constant/columns'
import { PageProps } from '@/types'
import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { MdCancel, MdCheckCircle, MdError, MdLocalShipping, MdPendingActions } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'

const breadcrumbs = [
    { name: 'Delivery', href: '/member/delivery' },
]

const Index = () => {
    const { deliveries } = usePage<
        PageProps<{ deliveries: LaravelPagination<Delivery> }>
    >().props

     const { data, setData, get } = useForm<{
            search: string;
            page: number;
            status: string | null;
        }>({
            search: '',
            page: 1,
            status: null,
        })

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        get(route('member.delivery.index'), {
            preserveState: true,
            preserveScroll: true,
            data: { search: data.search, page: 1 }
        })
    }

    const goToPage = (url: string | null) => {
        if (!url) return
        const query = url.includes("?") ? url.split("?")[1] : ""
        const params = new URLSearchParams(query)
        const nextPage = Number(params.get("page") || 1)
        setData("page", nextPage)
        get(route('member.delivery.index'), {
            preserveState: true,
            preserveScroll: true,
            data: {
                ...data,
                page: nextPage,
            },
        })
    }

    const applyFilter = (overrideData?: typeof data) => {
        const payload = overrideData || data;
        get(route('member.delivery.index'), {
            preserveState: true,
            preserveScroll: true,
            data: payload,
        })
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            get(route('member.delivery.index'), {
                preserveState: true,
                preserveScroll: true,
                data
            })
        }, 100)

        return () => clearTimeout(timeoutId);
    }, [data.status, data.page])


    return (
        <MemberLayout header={
            <h1 className="text-2xl font-semibold">Delivery</h1>
        } breadcrumbs={breadcrumbs}>
            <div className='flex flex-col gap-10'>
                <div className="flex flex-col gap-6">
                    {/* Search Bar */}
                    <div className="flex justify-between items-center">
                        <SearchBar
                            onChange={(val) => setData("search", val)}
                            value={data.search}
                            onSubmit={handleSearch}
                            placeholder="Search by Courier Name..."
                            buttonLabel="Search"
                        />
                    </div>

                    {/* Active Filter Chips */}
                    {data.status && (
                        <div className="flex flex-wrap gap-2">
                            <Button
                                className={`px-3 py-1 rounded-full flex items-center gap-2 border-2 bg-white
                                                          ${data.status === "cancelled" ? "border-red-500 text-red-500" :
                                        data.status === "pending" ? "border-yellow-500 text-yellow-500" :
                                            data.status === "shipped" ? "border-orange-400 text-orange-400" :
                                                "border-green-400 text-green-400"}`}
                            >
                                {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                                <RxCross2
                                    className="cursor-pointer"
                                    onClick={() => { setData("status", null); applyFilter() }}
                                />
                            </Button>
                        </div>
                    )}

                    {/* Filters */}
                    <Card className="p-4 bg-white border shadow-sm rounded-xl">
                        <div className="flex justify-between items-center mb-4">
                            <CardTitle className="text-xl">Filters</CardTitle>
                            {data.status && (
                                <Button
                                    onClick={() => setData({ ...data, status: null })}
                                    className="text-sm text-red-500 bg-white border border-red-300 hover:bg-red-50"
                                >
                                    Clear all
                                </Button>
                            )}
                        </div>

                        {/* Status Filter */}
                        <div className="flex flex-col gap-1">
                            <Label className="text-xs text-gray-500 font-medium flex gap-2 items-center">
                                {/* <MdLibraryBooks className="text-gray-400" /> Borrow Status */} Delivery Status
                            </Label>
                            <ToggleGroup
                                type="single"
                                value={data.status ?? ""}
                                onValueChange={(val) => {
                                    setData("status", val || null)
                                    applyFilter()
                                }}
                                className="inline-flex bg-white border rounded-lg overflow-hidden"
                            >
                                {[

                                    { key: "pending", label: "Pending", icon: <MdPendingActions className="text-yellow-500" /> },
                                    { key: "shipped", label: "Shipped", icon: <MdLocalShipping className="text-orange-500" /> },
                                    { key: "delivered", label: "Delivered", icon: <MdCheckCircle className="text-green-500" /> },
                                    { key: "cancelled", label: "Cancelled", icon: <MdCancel className="text-red-500" /> },

                                ].map((item) => (
                                    <ToggleGroupItem
                                        key={item.key}
                                        value={item.key}
                                        className={`px-4 py-2 text-sm font-medium flex items-center gap-2 bg-white
                                                                  ${data.status === item.key ? "bg-violet-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </div>
                    </Card>
                </div>
                <DataTable columns={deliveryMemberColumns} data={deliveries} onPageChange={goToPage} />
            </div>

        </MemberLayout>
    )
}

export default Index

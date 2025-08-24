import Button from '@/Components/Button'
import Drawer from '@/Components/Drawer'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import { Calendar } from '@/Components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import HomeLayout from '@/Layouts/HomeLayout'
import { useForm, usePage } from '@inertiajs/react'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { BiBookAdd } from 'react-icons/bi'
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
import { IoIosPaper } from 'react-icons/io'
import { toast } from 'sonner'

const breadcrumb = [
    { name: 'Publications', href: '/member/publications' },
    { name: 'Detail Publications' },
]

const Show = () => {
    const [submitting, setSubmitting] = useState(false)
    const { props } = usePage<{ publication: Publications, flash: { success?: string, error?: string } }>()
    const publication = props.publication

    const { post, data, errors, progress, setData } = useForm({
        publication_id: publication.id,
        start_date: '',
        due_date: '',
    })

    const submitLoan = () => {
        setSubmitting(true)
        post(route("member.loans.store"))
    }

    useEffect(() => {
        if (props.flash) {
            if (props.flash.success) toast.success(props.flash.success)
            if (props.flash.error) toast.error(props.flash.error)
        }
    }, [props.flash])

    return (
        <HomeLayout
            header={
                <h2 className="font-semibold text-4xl text-gray-800">
                    Publications
                </h2>
            } breadcrumbs={breadcrumb}>
            <div className="max-w-5xl mx-auto py-10">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0 w-full md:w-1/3">
                        <img
                            src={`${publication.image_url}`}
                            alt={publication.title}
                            className="rounded-xl shadow-md w-full object-cover"
                        />
                    </div>

                    <div className="flex-1 flex flex-col gap-4">
                        <h1 className="text-3xl font-bold text-slate-800">
                            {publication.title}
                        </h1>
                        <p className="text-slate-600">by {publication.author}</p>

                        <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                            {publication.category && (
                                <span className="px-3 py-1 bg-slate-100 rounded-lg">
                                    Category: {publication.category.name}
                                </span>
                            )}
                            {publication.location && (
                                <span className="px-3 py-1 bg-slate-100 rounded-lg">
                                    Location: {publication.location.name}
                                </span>
                            )}
                            <span className="px-3 py-1 bg-slate-100 rounded-lg capitalize">
                                Type: {publication.type}
                            </span>

                            {['ebook', 'journal'].includes(publication.type) && (
                                <span className="px-3 py-1 bg-slate-100 rounded-lg">
                                    Downloads: {publication.download_count}
                                </span>
                            )}
                        </div>
                        <div className="mt-6 flex gap-7">
                            {publication.type === 'ebook' && (
                                <a
                                    href={publication.pdf_url as string}
                                    target="_blank"
                                    className="px-6 py-3 bg-violet-600 text-white rounded-lg shadow hover:bg-violet-700 transition"
                                >
                                    📖 Read / Download
                                </a>
                            )}

                            {publication.type === 'physical' && (

                                <>
                                    <Button className="px-6 flex items-center py-3 bg-slate-800 text-white gap-3 hover:scale-110  shadow hover:bg-slate-900 transition"
                                        onClick={() => toast.info(
                                            publication.is_available ? "Available" : "Currently unavailable"
                                        )}>
                                         <FaSearch />
                                        Check Availability
                                    </Button>

                                    <Button onClick={submitLoan} className='bg-slate-80 px-6 flex items-center gap-3 hover:scale-110 transition'>
                                        <BiBookAdd size={18} />
                                        Request Loan
                                    </Button>
                                </>
                            )}

                            {publication.type === 'journal' && (
                                <a
                                    href={publication.pdf_url as string}
                                    target="_blank"
                                    className="px-6 py-3 items-center gap-3 flex bg-emerald-600 text-white rounded-lg hover:scale-110  shadow  transition"
                                >
                                    <IoIosPaper />
                                    View Journal
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                        Description
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                        {publication.publication_description}
                    </p>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Show

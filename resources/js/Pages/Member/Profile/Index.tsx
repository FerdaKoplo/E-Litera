import Button from '@/Components/Button'
import Profile from '@/Components/Profile'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import MemberLayout from '@/Layouts/MemberLayout'
import { PageProps } from '@/types'
import { Link, router, usePage } from '@inertiajs/react'
import React from 'react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { CiFacebook } from "react-icons/ci"
import EditableField from '@/Components/EditableField'
import { AccountModal } from '@/Components/AccountModal'
import Input from '@/Components/Input'
import AccountForms from '@/Components/AccountForm'
import { FaBirthdayCake, FaMapMarkedAlt } from 'react-icons/fa'
import EditableTextArea from '@/Components/EditableTextArea'
import EditableDateField from '@/Components/EditableDateField'
import EditableSelectAddress from '@/Components/EditableSelectAddress'
import axios from 'axios'

const breadcrumbs = [
    { name: 'Profile', href: '/member/profile' },
]

const Index = () => {

    const { auth, address } = usePage<PageProps>().props

    const joinDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(auth.user.created_at))

    const saveAddressField = async (field: string, value: string | { id: number; name: string }) => {
        let payload: Record<string, any> = {}

        if (field === "postal_code") {
            payload[field] = typeof value === "string" ? value : value.name
        } else {
            if (typeof value === "string") {
                payload[field] = value === "" ? null : value
            } else {
                payload[`${field}_id`] = value.id
                payload[`${field}_name`] = value.name
            }
        }

        router.patch(route("profile.update.address"), payload, {
            preserveScroll: true,
            onSuccess: (page) => console.log("Updated:", page),
        })
    }


    const saveProfileField = (field: string, value: string) => {
        router.patch(route("profile.update"), {
            [field]: value === "" ? null : value
        }, {
            preserveScroll: true,
            onSuccess: (page) => console.log("Updated:", page),
        })
    }

    return (
        <MemberLayout header={
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Profile</h1>
                <AccountModal triggerLabel="Edit Account" title="Manage Account">
                    <AccountForms />
                </AccountModal>
            </div>
        } breadcrumbs={breadcrumbs}>
            <div className='flex flex-col gap-5'>
                <Card>
                    <CardHeader className='flex flex-col'>
                        <CardTitle className="text-xl font-bold">Account Information</CardTitle>
                        <CardDescription>
                            Your name, email, social media
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-6 items-center">
                            <div className="flex items-center gap-5">
                                <Profile profile={auth.user.avatar_url} fallback={auth.user.name} />
                                <div>
                                    <EditableField
                                        value={auth.user.name}
                                        onSave={(newValue) => saveProfileField('name', newValue)}
                                    />
                                    <p className="text-sm text-muted-foreground">Member since {joinDate}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 ">
                                <p className="flex items-center gap-2 text-sm">
                                    <MdEmail className="text-lg" aria-hidden="true" />
                                    <a href={`mailto:${auth.user.email}`} className="hover:underline">
                                        {auth.user.email}
                                    </a>
                                </p>
                                <div className="flex items-center gap-2 text-sm">
                                    <FaWhatsapp className="text-lg " aria-hidden="true" />
                                    <EditableField
                                        value={auth.user.phone_number ?? null}
                                        onSave={(newValue) => saveProfileField('phone_number', newValue)}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <FaInstagram className="text-lg" aria-hidden="true" />
                                    <EditableField
                                        value={auth.user.instagram ?? null}
                                        onSave={(newValue) => saveProfileField('instagram', newValue)}
                                    />
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <CiFacebook className="text-lg" aria-hidden="true" />
                                    <EditableField
                                        value={auth.user.facebook ?? null}
                                        onSave={(newValue) => saveProfileField('facebook', newValue)}
                                    />
                                </div>
                            </div>

                        </div>
                    </CardContent>


                </Card>

                <Card>
                    <CardHeader className='flex flex-col'>
                        <CardTitle className="text-xl font-bold">Additional Information</CardTitle>
                        <CardDescription>
                            Your address, state, date of birth, gender, city, state, and postal code
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='grid grid-cols-4'>
                        <div className='flex flex-col gap-10'>

                            <div className="flex items-center gap-2 text-sm">
                                <FaBirthdayCake className="text-lg " aria-hidden="true" />
                                <EditableDateField
                                    value={auth.user.date_of_birth ?? null}
                                    onSave={(newValue) => saveProfileField('date_of_birth', newValue)}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col items-center gap-10'>
                            <div className="flex items-center gap-2 text-sm">
                                <FaMapMarkedAlt className="text-lg " aria-hidden="true" />
                                <EditableTextArea
                                    placeholder='Your address...'
                                    value={address.full_address ?? null}
                                    onSave={(newValue) => saveAddressField('full_address', newValue)}
                                />
                            </div>

                        </div>

                        <div className='flex flex-col gap-10'>
                            <div className="flex items-center gap-2 text-sm">
                                <FaMapMarkedAlt className="text-lg " aria-hidden="true" />
                                <EditableSelectAddress
                                    placeholder='Your province...'
                                    value={address?.province_name ?? null}
                                    onSave={(newValue) => saveAddressField('province', newValue)}
                                    level={'province'} />
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <FaMapMarkedAlt className="text-lg " aria-hidden="true" />
                                <EditableSelectAddress
                                    placeholder='Your city...'
                                    value={address?.city_name ?? null}
                                    parentId={address?.province_id?.toString() ?? undefined}
                                    onSave={(newValue) => saveAddressField('city', newValue)}
                                    level={'city'} />
                            </div>
                        </div>

                        <div className='flex flex-col gap-10'>
                            <div className="flex items-center gap-2 text-sm">
                                <FaMapMarkedAlt className="text-lg " aria-hidden="true" />
                                <EditableSelectAddress
                                    placeholder='Your district...'
                                    value={address?.district_name ?? null}
                                    parentId={address?.city_id?.toString() ?? undefined}
                                    onSave={(newValue) => saveAddressField('district', newValue)}
                                    level={'district'}
                                />
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <FaMapMarkedAlt className="text-lg " aria-hidden="true" />
                                <EditableSelectAddress
                                    placeholder='Your sub district...'
                                    value={address?.sub_district_name ?? null}
                                    parentId={address?.district_id?.toString() ?? undefined}
                                    onSave={(newValue) => saveAddressField('sub_district', newValue)}
                                    level={'subDistrict'}
                                />
                            </div>


                            <div className="flex items-center gap-2 text-sm">
                                <FaMapMarkedAlt className="text-lg " aria-hidden="true" />
                                <EditableSelectAddress
                                    placeholder='Your postal code...'
                                    value={address?.postal_code ?? null}
                                    parentId={address?.sub_district_id?.toString() ?? undefined}
                                    onSave={(newValue) => saveAddressField('postal_code', newValue)}
                                    level={'postalCode'}
                                    grandParentId={address?.city_id?.toString() ?? undefined}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MemberLayout>
    )
}

export default Index

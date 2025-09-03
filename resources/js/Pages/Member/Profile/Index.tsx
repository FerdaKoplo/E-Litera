import Button from '@/Components/Button'
import Profile from '@/Components/Profile'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import MemberLayout from '@/Layouts/MemberLayout'
import { PageProps } from '@/types'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { CiFacebook } from "react-icons/ci"

const breadcrumbs = [
    { name: 'Profile', href: '/member/profile' },
]

const Index = () => {

    const { auth } = usePage<PageProps>().props

    const joinDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(auth.user.created_at))

    return (
        <MemberLayout header={
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Profile</h1>
                <Link href="/profile/edit">
                    <Button type="button" className="bg-white border-violet-400 border-2 font-semibold hover:bg-violet-50 text-violet-400 rounded-lg">
                        Edit Profile
                    </Button>
                </Link>
            </div>
        } breadcrumbs={breadcrumbs}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                        <div className="flex items-center gap-5">
                            <Profile profile="" fallback={auth.user.name} />
                            <div>
                                <p className="text-2xl font-semibold">{auth.user.name}</p>
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
                            <p className="flex items-center gap-2 text-sm">
                                <FaWhatsapp className="text-lg " aria-hidden="true" />
                                {auth.user.phone_number ? (
                                    <a
                                        href={`https://wa.me/${auth.user.phone_number}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        {auth.user.phone_number}
                                    </a>
                                ) : (
                                    <span className="text-muted-foreground">Not provided</span>
                                )}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="flex items-center gap-2 text-sm">
                                <FaInstagram  className="text-lg" aria-hidden="true" />
                                {auth.user.instagram ? (
                                    <span>{auth.user.instagram}</span>
                                ) : (
                                    <span className="text-muted-foreground">Not provided</span>
                                )}
                            </p>

                            <p className="flex items-center gap-2 text-sm">
                                <CiFacebook  className="text-lg" aria-hidden="true" />
                                {auth.user.instagram ? (
                                    <span>{auth.user.instagram}</span>
                                ) : (
                                    <span className="text-muted-foreground">Not provided</span>
                                )}
                            </p>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </MemberLayout>
    )
}

export default Index

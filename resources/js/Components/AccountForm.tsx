import { router, usePage } from "@inertiajs/react"
import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Progress } from "@/Components/ui/progress"
import Button from "@/Components/Button"
import Input from "@/Components/Input"

const AccountForms = () => {
    const { errors } = usePage().props as { errors: Record<string, string> }
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const [emailData, setEmailData] = useState({
        email: "",
        password: "",
    })

    const [passwordData, setPasswordData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    })
    const [avatarData, setAvatarData] = useState<File | null>(null)

    const onDrop = useCallback((acceptedFIles: File[]) => {
        if (acceptedFIles.length > 0) {
            setAvatarData(acceptedFIles[0])
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": []
        },
        multiple: false
    })


    const submitEmail = (e: React.FormEvent) => {
        e.preventDefault()

        router.post(route("profile.update.email"), {
            _method: "patch",
            ...emailData,
        })
    }

    const submitPassword = (e: React.FormEvent) => {
        e.preventDefault()

        router.post(route("profile.update.password"), {
            _method: "patch",
            ...passwordData,
        })
    }

    const submitAvatar = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Submitting avatar:", avatarData)
        const formData = new FormData()
        formData.append("_method", "patch")
        if (avatarData) {
            formData.append("avatar", avatarData)
        }

        router.post(route("profile.update.avatar"), formData, {
            forceFormData: true,
            onProgress: (progress) => {
                if (progress?.percentage) {
                    setUploadProgress(progress.percentage)
                }
            },
            onFinish: () => {
                setUploadProgress(0)
                setAvatarData(null)
            },
        })
    }

    return (
        <div className="space-y-6">
            <form onSubmit={submitEmail} className="space-y-3">
                <h3 className="text-sm font-semibold">Change Email</h3>
                <Input
                    type="email"
                    name="email"
                    placeholder="New email"
                    value={emailData.email}
                    onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Current password"
                    value={emailData.password}
                    onChange={(e) =>
                        setEmailData({ ...emailData, password: e.target.value })
                    }
                />
                <Button type="submit" className="w-full">
                    Update Email
                </Button>
            </form>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <form onSubmit={submitPassword} className="space-y-3">
                <h3 className="text-sm font-semibold">Change Password</h3>
                <Input
                    type="password"
                    name="current_password"
                    placeholder="Current password"
                    value={passwordData.current_password}
                    onChange={(e) =>
                        setPasswordData({
                            ...passwordData,
                            current_password: e.target.value,
                        })
                    }
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="New password"
                    value={passwordData.password}
                    onChange={(e) =>
                        setPasswordData({ ...passwordData, password: e.target.value })
                    }
                />
                <Input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm new password"
                    value={passwordData.password_confirmation}
                    onChange={(e) =>
                        setPasswordData({
                            ...passwordData,
                            password_confirmation: e.target.value,
                        })
                    }
                />
                <Button type="submit" className="w-full">
                    Update Password
                </Button>
            </form>

            <form onSubmit={submitAvatar} className="space-y-3">
                <h3 className="text-sm font-semibold">Change Avatar</h3>
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                        }`}
                >
                    <input {...getInputProps()} />
                    {avatarData ? (
                        <div className="space-y-2">
                            <p className="text-sm font-medium">{avatarData.name}</p>
                            <p className="text-xs text-gray-500">
                                {(avatarData.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">
                            {isDragActive
                                ? "Drop the file here..."
                                : "Drag & drop or click to select an avatar"}
                        </p>
                    )}
                </div>

                {uploadProgress > 0 && (
                    <Progress value={uploadProgress} className="h-2 w-full [&>div]:bg-violet-400" />
                )}

                {errors.avatar && (
                    <p className="text-red-500 text-sm">{errors.avatar}</p>
                )}

                <Button type="submit" className="w-full">
                    Update Avatar
                </Button>
            </form>
        </div>
    )
}

export default AccountForms

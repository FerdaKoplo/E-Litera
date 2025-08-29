import Button from '@/Components/Button'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import TogglePassword from '@/Components/TogglePassword'
import VisitorLayout from '@/Layouts/VisitorLayout'
import { Link, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const Login = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: ''
    })

    useEffect(() => {
        return () => {
            reset('password')
        }
    }, [])


    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        post(route('login'), {
            onSuccess: (success) => {
                Object.values(success).forEach(s => toast.success(s))

            },
            onError: (err) => {
                Object.values(err).forEach(e => toast.error(e));
            }
        })

    }


    return (
        <VisitorLayout>
            <form onSubmit={submit} className='flex flex-col gap-10 '>
                <div>
                    <Label forInput={'email'} value={'Email'} />
                    <Input
                        isFocused={false}
                        className='w-full'
                        name='email'
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                </div>
                <div>
                    <Label forInput={'password'} value={'Password'} />
                    <div className='relative'>
                        <Input isFocused={false}
                            type={showPassword ? 'text' : 'password'}
                            className='w-full'
                            name='password'
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                        <div className="absolute right-1 top-1/2  -translate-y-1/2">
                            <TogglePassword showPassword={showPassword} setShowPassword={setShowPassword} />
                        </div>
                    </div>
                </div>

                <div className='flex font-medium justify-between'>
                    <Link href={'/register'}>
                        Don't have account?
                    </Link>
                    <Link href={'/forgot-password'}>
                        Forgot Password?
                    </Link>
                </div>

                <Button type='submit' process={processing} className='text-white bg-gradient-to-r from-violet-400 to-fuchsia-400 '>
                    Submit
                </Button>
            </form>
        </VisitorLayout>
    )
}

export default Login

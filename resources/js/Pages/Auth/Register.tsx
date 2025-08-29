import Button from '@/Components/Button'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import TogglePassword from '@/Components/TogglePassword'
import VisitorLayout from '@/Layouts/VisitorLayout'
import { Link, useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const Register = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation')
        }
    }, [])

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        post(route('register'),{
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
                    <Label forInput={'name'} value={'Username'} />
                    <Input
                        isFocused={false}
                        className='w-full'
                        name='name'
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                </div>

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
                        <Input
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

                <div>
                    <Label forInput={'password_confirmation'} value={'Confirm Password'} />
                    <div className='relative'>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            className='w-full'
                            name='password_confirmation'
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                        />
                        <div className="absolute right-1 top-1/2  -translate-y-1/2">
                                <TogglePassword showPassword={showPassword} setShowPassword={setShowPassword} />
                        </div>
                    </div>
                </div>

                <div className='flex font-medium justify-between'>
                    <Link href={'/login'}>
                        Have account?
                    </Link>
                    <Link href={''}>
                        Forgot Password?
                    </Link>
                </div>

                <Button type='submit' process={processing} className='text-white bg-gradient-to-r from-violet-400 to-fuchsia-400'>
                    Submit
                </Button>
            </form>
        </VisitorLayout>
    )
}

export default Register

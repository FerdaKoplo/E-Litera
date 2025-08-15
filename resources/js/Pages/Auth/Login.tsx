import Button from '@/Components/Button'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import VisitorLayout from '@/Layouts/VisitorLayout'
import { Link, useForm } from '@inertiajs/react'
import React, { useEffect } from 'react'

const Login = () => {

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

    // const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => [
    //     setData(event.target.name as "email" | "password" | "remember",
    //         event.target.type === 'checkbox' ? event.target.checked + '' : event.target.value)
    // ]

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        post(route('login'))
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
                    <Input isFocused={false}
                        className='w-full'
                        name='password'
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />
                </div>

                <div className='flex justify-between'>
                    <Link href={''}>
                        Didn't have account?
                    </Link>
                    <Link href={''}>
                        Forgot Password?
                    </Link>
                </div>

                <Button type='submit' process={processing} className='text-white bg-gradient-to-r from-secondary to-accent'>
                    Submit
                </Button>
            </form>
        </VisitorLayout>
    )
}

export default Login

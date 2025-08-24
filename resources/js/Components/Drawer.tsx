import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import Button from './Button'
import { X } from 'lucide-react'

interface Props {
    open: boolean
    label? : string
    openOnChange: (open: boolean) => void
    children: React.ReactNode
}

const Drawer: React.FC<Props> = ({ label, children, open, openOnChange }) => {
    return (
        <Dialog open={open} onOpenChange={openOnChange}>
            <DialogTrigger asChild>
                <Button>{label}</Button>
            </DialogTrigger>
            <DialogContent
                className="fixed flex flex-col justify-center  h-1/2 w-1/2 bg-white shadow-lg  overflow-auto"
            >
                {/* <div className="flex justify-end">
                    <Button onClick={() => openOnChange(false)}>
                        <X />
                    </Button>
                </div> */}
                <div className="mt-4">{children}</div>
            </DialogContent>
        </Dialog>
    )
}

export default Drawer

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"
import { Button } from "@/Components/ui/button"
import React from "react"

type AccountModalProps = {
  triggerLabel: string
  title: string
  children: React.ReactNode
}

export function AccountModal({ triggerLabel, title, children }: AccountModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white border-violet-400 border-2 font-semibold hover:bg-violet-50 text-violet-400 rounded-lg">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

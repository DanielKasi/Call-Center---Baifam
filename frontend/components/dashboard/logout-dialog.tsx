"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation"

interface LogoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}


export function LogoutDialog({ open, onOpenChange }: LogoutDialogProps) {

    const router = useRouter();
  const handleLogout = () => {
    // Handle logout logic here
    router.push("/login")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon icon="hugeicons:logout-01" className="w-5 h-5 text-red-500" />
            <span>Confirm Logout</span>
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to logout? You will need to sign in again to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

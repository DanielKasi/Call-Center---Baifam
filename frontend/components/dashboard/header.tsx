"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Icon } from "@iconify/react"
import { LogoutDialog } from "@/components/dashboard/logout-dialog"
import { useState } from "react"

export function DashboardHeader() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4 max-h-16 min-h-16">
        <div className="flex items-center justify-between">
          <div className="flex-1" />

          {/* Center - Branch Selector */}
          <div className="flex-1 flex justify-center">
            <Select defaultValue="main" >
              <SelectTrigger className="rounded-full w-48">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent className="text-center" >
                <SelectItem value="main" className="text-center">Main Branch</SelectItem>
                <SelectItem value="north" className="text-center">North Branch</SelectItem>
                <SelectItem value="south" className="text-center">South Branch</SelectItem>
                <SelectItem value="east" className="text-center">East Branch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Right - Actions */}
          <div className="flex-1 flex items-center justify-end space-x-4">
            <Button variant="ghost" size="sm" className="p-2">
              <Icon icon="hugeicons:shield-01" width={24} height={24} className="!w-6 !h-6" />
            </Button>

            <Button variant="ghost" size="sm" className="p-2 relative">
              <Icon icon="hugeicons:notification-02"  width={24} height={24} className="!w-6 !h-6 relative" />
              <span className="absolute top-1 right-2 w-3 h-3 bg-primary-700 rounded-full text-xs"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild className="rounded-xl bg-gray-100">
                <Button variant="ghost" className="flex items-center space-x-2 p-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary-100 text-primary-700">RD</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="text-sm font-medium">Roy Didanie</div>
                    <div className="text-xs text-gray-500">Super Admin</div>
                  </div>
                  <Icon icon="hugeicons:arrow-down-01" className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Icon icon="hugeicons:user" className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon icon="hugeicons:settings-01" className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowLogoutDialog(true)} className="text-red-600">
                  <Icon icon="hugeicons:logout-03" className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <LogoutDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog} />
    </>
  )
}

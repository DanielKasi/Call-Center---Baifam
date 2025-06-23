"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"

export function CommunicationsHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">Communications</h1>

      <div className="flex items-center space-x-3">
        <Button variant="outline" className="rounded-xl">
          <Icon icon="hugeicons:announcement-01" className="w-4 h-4 mr-2" />
          New Announcement
        </Button>

        <Button className="bg-primary-600 hover:bg-primary-700 rounded-xl">
          <Icon icon="hugeicons:message-add-01" className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>
    </div>
  )
}

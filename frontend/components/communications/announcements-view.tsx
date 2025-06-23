"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@iconify/react"
import type { Announcement } from "@/app/types/types.utils"

interface AnnouncementsViewProps {
  announcements: Announcement[]
}

export function AnnouncementsView({ announcements }: AnnouncementsViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [timeFilter, setTimeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const getPriorityColor = (priority: Announcement["priority"]) => {
    switch (priority) {
      case "Normal":
        return "bg-blue-100 text-blue-800"
      case "Important":
        return "bg-yellow-100 text-yellow-800"
      case "Urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority: Announcement["priority"]) => {
    switch (priority) {
      case "Normal":
        return "hugeicons:announcement-01"
      case "Important":
        return "hugeicons:announcement-01"
      case "Urgent":
        return "hugeicons:announcement-01"
      default:
        return "hugeicons:announcement-01"
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="relative">
            <Icon
              icon="hugeicons:search-01"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 rounded-xl"
            />
          </div>

          <div className="flex items-center space-x-3">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-32 rounded-xl">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 rounded-xl">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="important">Important</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-100"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Icon icon={getPriorityIcon(announcement.priority)} className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{announcement.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{announcement.description}</p>
                <div className="flex items-center space-x-3">
                  <Badge className={`rounded-full ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Icon icon="hugeicons:clock-01" className="w-3 h-3" />
                    <span>{announcement.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="p-2 rounded-lg">
                <Icon icon="hugeicons:edit-02" className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 rounded-lg text-red-600 hover:text-red-700">
                <Icon icon="hugeicons:delete-02" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

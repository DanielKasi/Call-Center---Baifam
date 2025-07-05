"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@iconify/react"
import { CallHistoryRecord, RecentAssignee } from "@/app/types/types.utils"


interface ContactDetailsTabsProps {
  activeTab: "call-history" | "recent-assignees" | "documents"
  onTabChange: (tab: "call-history" | "recent-assignees" | "documents") => void
  callHistory: CallHistoryRecord[]
  recentAssignees: RecentAssignee[]
}

export function ContactDetailsTabs({ activeTab, onTabChange, callHistory, recentAssignees }: ContactDetailsTabsProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-800"
      case "Missed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 px-6">
          <button
            onClick={() => onTabChange("call-history")}
            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "call-history"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Call History
          </button>
          <button
            onClick={() => onTabChange("recent-assignees")}
            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "recent-assignees"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Recent Assignees
          </button>
          <button
            onClick={() => onTabChange("documents")}
            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "documents"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Documents
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "call-history" && (
          <div className="space-y-4">
            {/* Search and Filters */}
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
                <Select defaultValue="all-status">
                  <SelectTrigger className="w-32 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all-status">All Status</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                    <SelectItem value="missed">Missed</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all-directions">
                  <SelectTrigger className="w-40 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all-directions">All Directions</SelectItem>
                    <SelectItem value="outgoing">Outgoing</SelectItem>
                    <SelectItem value="incoming">Incoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Call History Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Direction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {callHistory.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.direction}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.agent}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`rounded-full ${getStatusColor(record.status)}`}>{record.status}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="p-2 rounded-lg">
                            <Icon icon="hugeicons:view" className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-2 rounded-lg">
                            <Icon icon="hugeicons:call" className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-2 rounded-lg text-red-600 hover:text-red-700">
                            <Icon icon="hugeicons:delete-02" className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "recent-assignees" && (
          <div className="space-y-4">
            {/* Recent Assignees Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Calls Handled
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentAssignees.map((assignee) => (
                    <tr key={assignee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{assignee.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignee.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignee.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignee.callsHandled}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignee.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="p-2 rounded-lg">
                            <Icon icon="hugeicons:view" className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="text-center py-12">
            <Icon icon="hugeicons:file-01" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No documents available</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">Showing 1-7 of 70</p>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Icon icon="hugeicons:arrow-left-01" className="w-4 h-4" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              <Button variant="default" size="sm" className="w-8 h-8 rounded-lg bg-primary-600 text-white">
                1
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 rounded-lg">
                2
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 rounded-lg">
                3
              </Button>
              <span className="px-2 text-gray-500">...</span>
              <Button variant="ghost" size="sm" className="w-8 h-8 rounded-lg">
                5
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="p-2">
              Next
              <Icon icon="hugeicons:arrow-right-01" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

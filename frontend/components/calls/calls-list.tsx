"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@iconify/react"
import type { Call } from "@/app/types/types.utils"

interface CallsListProps {
  calls: Call[]
}

export function CallsList({ calls }: CallsListProps) {
  const getStatusColor = (status: Call["status"]) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-800"
      case "Missed":
        return "bg-red-100 text-red-800"
      case "Unanswered":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Direction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <span>Custom Field</span>
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {calls.map((call) => (
              <tr key={call.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{call.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{call.client}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{call.direction}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{call.customField}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{call.agent}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={`rounded-full ${getStatusColor(call.status)}`}>{call.status}</Badge>
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

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
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
  )
}

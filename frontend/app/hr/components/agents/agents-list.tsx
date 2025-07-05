"use client"

import { Agent } from "@/app/types/types.utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import Link from "next/link"

interface AgentsListProps {
  agents: Agent[]
}

export function AgentsList({ agents }: AgentsListProps) {
  return (
    <div className="bg-white rounded-xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacts
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calls</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{agent.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{agent.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{agent.contacts}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{agent.calls}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="p-2 rounded-lg" asChild>
                      <Link href={`/agents/${agent.id}`}>
                        <Icon icon="hugeicons:view" className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 rounded-lg">
                      <Icon icon="hugeicons:call" className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 rounded-lg">
                      <Icon icon="hugeicons:message-01" className="w-4 h-4" />
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

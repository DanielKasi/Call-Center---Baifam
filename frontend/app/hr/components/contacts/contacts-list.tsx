"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@iconify/react"
import type { IContact } from "@/app/types/types.utils"
import Link from "next/link"

interface ContactsListProps {
  contacts: IContact[]
  selectedContactIds: string[]
  onSelectionChange: (selectedIds: string[]) => void
}

export function ContactsList({ contacts, selectedContactIds, onSelectionChange }: ContactsListProps) {
  const getStatusColor = (status: IContact["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(contacts.map((contact) => contact.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectContact = (contactId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedContactIds, contactId])
    } else {
      onSelectionChange(selectedContactIds.filter((id) => id !== contactId))
    }
  }

  const isAllSelected = contacts.length > 0 && selectedContactIds.length === contacts.length
  const isIndeterminate = selectedContactIds.length > 0 && selectedContactIds.length < contacts.length

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden w-full !max-w-full">
      <div className="px-2 !max-w-full">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className={`hover:bg-gray-50 ${selectedContactIds.includes(contact.id) ? "bg-blue-50" : ""}`}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="rounded"
                    checked={selectedContactIds.includes(contact.id)}
                    onChange={(e) => handleSelectContact(contact.id, e.target.checked)}
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{contact.phone}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{contact.agent || "-"}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{contact.product}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Badge className={`rounded-full ${getStatusColor(contact.status)}`}>{contact.status}</Badge>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Link href={`/contacts/${contact.id}`}>
                      <Button variant="ghost" size="sm" className="p-2 rounded-lg">
                        <Icon icon="hugeicons:view" className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="p-2 rounded-lg">
                      <Icon icon="hugeicons:call" className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 rounded-lg">
                      <Icon icon="hugeicons:edit-02" className="w-4 h-4" />
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
  )
}

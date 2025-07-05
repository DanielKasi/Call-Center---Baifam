"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@iconify/react"
import type { IContact } from "@/app/types/types.utils"
import Link from "next/link"

interface ContactsGridProps {
  contacts: IContact[]
  selectedContactIds: string[]
  onSelectionChange: (selectedIds: string[]) => void
}

export function ContactsGrid({ contacts, selectedContactIds, onSelectionChange }: ContactsGridProps) {
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

  const handleSelectContact = (contactId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedContactIds, contactId])
    } else {
      onSelectionChange(selectedContactIds.filter((id) => id !== contactId))
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow relative ${
            selectedContactIds.includes(contact.id) ? "ring-2 ring-blue-500 bg-blue-50" : ""
          }`}
        >
          {/* Selection checkbox */}
          <div className="absolute top-4 left-4">
            <input
              type="checkbox"
              className="rounded"
              checked={selectedContactIds.includes(contact.id)}
              onChange={(e) => handleSelectContact(contact.id, e.target.checked)}
            />
          </div>

          <div className="flex items-start justify-between mb-4 ml-8">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{contact.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{contact.phone}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{contact.product}</span>
                <span>•</span>
                <span>{contact.agent || "Unassigned"}</span>
              </div>
            </div>
            <Badge className={`rounded-full ${getStatusColor(contact.status)}`}>{contact.status}</Badge>
          </div>

          <div className="flex items-center justify-between ml-8">
            <Button className="bg-primary-100 text-primary-700 hover:bg-primary-200 rounded-xl flex-1 mr-2">
              <Icon icon="hugeicons:call" className="w-4 h-4 mr-2" />
              Call
            </Button>

            <div className="flex items-center space-x-1">
              <Link href={`/contacts/${contact.id}`}>
                <Button variant="ghost" size="sm" className="p-2 rounded-lg">
                  <Icon icon="hugeicons:view" className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="p-2 rounded-lg">
                <Icon icon="hugeicons:edit-02" className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 rounded-lg text-red-600 hover:text-red-700">
                <Icon icon="hugeicons:delete-02" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

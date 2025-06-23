"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import type { IContact } from "@/app/types/types.utils"
import { AddContactDialog } from "@/components/dialogs/add-contact-dialog"
import { ImportContactsDialog } from "@/components/dialogs/import-contacts-dialog"
import { ReassignContactsDialog } from "@/components/dialogs/reassign-contacts-dialog"
import { AssignContactsDialog } from "@/components/dialogs/assign-contacts-dialog"

interface ContactsHeaderProps {
  contacts: IContact[]
  onFilteredContactsChange: (contacts: IContact[]) => void
  selectedContactIds?: string[]
  onContactsUpdate?: (contacts: IContact[]) => void
}

export function ContactsHeader({
  contacts,
  onFilteredContactsChange,
  selectedContactIds = [],
  onContactsUpdate,
}: ContactsHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [productFilter, setProductFilter] = useState("all")

  // Dialog states
  const [isAddContactOpen, setIsAddContactOpen] = useState(false)
  const [isImportContactsOpen, setIsImportContactsOpen] = useState(false)
  const [isReassignContactsOpen, setIsReassignContactsOpen] = useState(false)
  const [isAssignContactsOpen, setIsAssignContactsOpen] = useState(false)

  useEffect(() => {
    let filtered = contacts

    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.phone.includes(searchTerm),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((contact) => contact.status === statusFilter)
    }

    if (productFilter !== "all") {
      filtered = filtered.filter((contact) => contact.product === productFilter)
    }

    onFilteredContactsChange(filtered)
  }, [searchTerm, statusFilter, productFilter, contacts, onFilteredContactsChange])

  const handleAddContact = (contactData: { name: string; phone: string; product: string }) => {
    const newContact: IContact = {
      id: Date.now().toString(),
      name: contactData.name,
      phone: contactData.phone,
      agent: null,
      product: contactData.product,
      status: "Active",
    }

    const updatedContacts = [...contacts, newContact]
    onContactsUpdate?.(updatedContacts)
    console.log("Added contact:", newContact)
  }

  const handleImportContacts = (file: File) => {
    // TODO: Implement CSV parsing and contact import
    console.log("Importing contacts from file:", file.name)
    // For now, just log the file
  }

  const handleReassignContacts = (agentId: string, contactIds: string[]) => {
    const agentName = getAgentNameById(agentId)
    const updatedContacts = contacts.map((contact) =>
      contactIds.includes(contact.id) ? { ...contact, agent: agentName } : contact,
    )
    onContactsUpdate?.(updatedContacts)
    console.log(`Re-assigned ${contactIds.length} contacts to agent ${agentName}`)
  }

  const handleAssignContacts = (agentId: string, contactIds: string[]) => {
    const agentName = getAgentNameById(agentId)
    const updatedContacts = contacts.map((contact) =>
      contactIds.includes(contact.id) ? { ...contact, agent: agentName } : contact,
    )
    onContactsUpdate?.(updatedContacts)
    console.log(`Assigned ${contactIds.length} contacts to agent ${agentName}`)
  }

  const getAgentNameById = (agentId: string) => {
    const agents = [
      { id: "1", name: "Matovu Mark" },
      { id: "2", name: "Serwanga Paul" },
      { id: "3", name: "Mugisha Sarah" },
      { id: "4", name: "Kagoda John" },
      { id: "5", name: "Kisitu Anna" },
    ]
    return agents.find((agent) => agent.id === agentId)?.name || "Unknown Agent"
  }

  const handleExport = () => {
    // Create CSV content
    const csvContent = [
      "Name,Phone,Agent,Product,Status",
      ...contacts.map(
        (contact) =>
          `"${contact.name}","${contact.phone}","${contact.agent || "Unassigned"}","${contact.product}","${contact.status}"`,
      ),
    ].join("\n")

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `contacts-export-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Icon
                icon="hugeicons:search-01"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64 rounded-xl"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 rounded-xl">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
              </SelectContent>
            </Select>

            <Select value={productFilter} onValueChange={setProductFilter}>
              <SelectTrigger className="w-32 rounded-xl">
                <SelectValue placeholder="All Products" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="Loan">Loan</SelectItem>
                <SelectItem value="Valuation">Valuation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center px-4 gap-2">
            <Button
              variant="outline"
              size={"sm"}
              className="rounded-xl"
              onClick={() => setIsReassignContactsOpen(true)}
              disabled={selectedContactIds.length === 0}
            >
              Re-Assign
            </Button>
            <Button
              variant="outline"
              size={"sm"}
              className="rounded-xl"
              onClick={() => setIsAssignContactsOpen(true)}
              disabled={selectedContactIds.length === 0}
            >
              Assign
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size={"sm"} className="rounded-xl" onClick={handleExport}>
            <Icon icon="hugeicons:download-01" className="w-4 h-4" />
          </Button>

          <Button
            size={"sm"}
            className="bg-primary-600 hover:bg-primary-700 rounded-xl"
            onClick={() => setIsAddContactOpen(true)}
          >
            <Icon icon="hugeicons:add-01" className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Dialogs */}
      <AddContactDialog
        isOpen={isAddContactOpen}
        onClose={() => setIsAddContactOpen(false)}
        onAddContact={handleAddContact}
      />

      <ImportContactsDialog
        isOpen={isImportContactsOpen}
        onClose={() => setIsImportContactsOpen(false)}
        onImportContacts={handleImportContacts}
      />

      <ReassignContactsDialog
        isOpen={isReassignContactsOpen}
        onClose={() => setIsReassignContactsOpen(false)}
        onReassignContacts={handleReassignContacts}
        selectedContactIds={selectedContactIds}
      />

      <AssignContactsDialog
        isOpen={isAssignContactsOpen}
        onClose={() => setIsAssignContactsOpen(false)}
        onAssignContacts={handleAssignContacts}
        selectedContactIds={selectedContactIds}
      />
    </>
  )
}

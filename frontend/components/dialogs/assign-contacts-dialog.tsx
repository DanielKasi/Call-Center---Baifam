"use client"

import { useState } from "react"
import { DialogSkeleton } from "@/components/dialogs/dialog-skeleton"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AssignContactsDialogProps {
  isOpen: boolean
  onClose: () => void
  onAssignContacts: (agentId: string, contactIds: string[]) => void
  selectedContactIds: string[]
}

const mockAgents = [
  { id: "1", name: "Matovu Mark" },
  { id: "2", name: "Serwanga Paul" },
  { id: "3", name: "Mugisha Sarah" },
  { id: "4", name: "Kagoda John" },
  { id: "5", name: "Kisitu Anna" },
]

export function AssignContactsDialog({
  isOpen,
  onClose,
  onAssignContacts,
  selectedContactIds,
}: AssignContactsDialogProps) {
  const [selectedAgent, setSelectedAgent] = useState("")

  const handleConfirm = () => {
    if (selectedAgent && selectedContactIds.length > 0) {
      onAssignContacts(selectedAgent, selectedContactIds)
      setSelectedAgent("")
    }
  }

  const handleCancel = () => {
    setSelectedAgent("")
  }

  const isFormValid = selectedAgent !== "" && selectedContactIds.length > 0

  return (
    <DialogSkeleton
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Contacts"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      confirmText="Assign"
      confirmDisabled={!isFormValid}
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          You are Assigning {selectedContactIds.length} Contact{selectedContactIds.length !== 1 ? "s" : ""}.
        </p>

        <div>
          <Label htmlFor="agent-select" className="text-sm font-medium">
            Agent
          </Label>
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="mt-1 rounded-xl">
              <SelectValue placeholder="Select an Agent" />
            </SelectTrigger>
            <SelectContent>
              {mockAgents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  {agent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </DialogSkeleton>
  )
}

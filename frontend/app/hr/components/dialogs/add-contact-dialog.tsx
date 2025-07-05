"use client"

import { useState } from "react"
import { DialogSkeleton } from "@/components/dialogs/dialog-skeleton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddContactDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddContact: (contact: { name: string; phone: string; product: string }) => void
}

export function AddContactDialog({ isOpen, onClose, onAddContact }: AddContactDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: "",
  })

  const handleConfirm = () => {
    if (formData.name.trim() && formData.phone.trim() && formData.product) {
      onAddContact(formData)
      setFormData({ name: "", phone: "", product: "" })
    }
  }

  const handleCancel = () => {
    setFormData({ name: "", phone: "", product: "" })
  }

  const isFormValid = formData.name.trim() !== "" && formData.phone.trim() !== "" && formData.product !== ""

  return (
    <DialogSkeleton
      isOpen={isOpen}
      onClose={onClose}
      title="Add Contact"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      confirmText="Add Contact"
      confirmDisabled={!isFormValid}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="contact-name" className="text-sm font-medium">
            Name
          </Label>
          <Input
            id="contact-name"
            placeholder="Contact Name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="mt-1 rounded-xl"
          />
        </div>

        <div>
          <Label htmlFor="contact-phone" className="text-sm font-medium">
            Contact
          </Label>
          <Input
            id="contact-phone"
            placeholder="+256700000000"
            value={formData.phone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            className="mt-1 rounded-xl"
          />
        </div>

        <div>
          <Label htmlFor="contact-product" className="text-sm font-medium">
            Product
          </Label>
          <Select
            value={formData.product}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, product: value }))}
          >
            <SelectTrigger className="mt-1 rounded-xl">
              <SelectValue placeholder="Select Product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Loan">Loan</SelectItem>
              <SelectItem value="Valuation">Valuation</SelectItem>
              <SelectItem value="Investment">Investment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </DialogSkeleton>
  )
}

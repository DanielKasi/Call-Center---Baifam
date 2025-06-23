"use client"

import type React from "react"

import { useState, useRef } from "react"
import { DialogSkeleton } from "@/components/dialogs/dialog-skeleton"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"

interface ImportContactsDialogProps {
  isOpen: boolean
  onClose: () => void
  onImportContacts: (file: File) => void
}

export function ImportContactsDialog({ isOpen, onClose, onImportContacts }: ImportContactsDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      setSelectedFile(file)
    } else {
      alert("Please select a CSV file")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleConfirm = () => {
    if (selectedFile) {
      onImportContacts(selectedFile)
      setSelectedFile(null)
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
  }

  const downloadTemplate = () => {
    // Create a sample CSV template
    const csvContent = "Name,Phone,Product\nJohn Doe,+256700000000,Loan\nJane Smith,+256700000001,Valuation"
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "contacts-template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <DialogSkeleton
      isOpen={isOpen}
      onClose={onClose}
      title="Import Contacts"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      confirmText="Import Contacts"
      confirmDisabled={!selectedFile}
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">You can import contacts via CSV, Excel, or other supported sources.</p>

        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            isDragOver ? "border-purple-400 bg-purple-50" : "border-gray-300"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <Icon icon="hugeicons:upload-01" className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop or{" "}
            <span className="text-purple-600 cursor-pointer hover:underline">click here to browse</span>
          </p>
          {selectedFile && (
            <div className="mt-4 p-2 bg-gray-100 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon icon="hugeicons:file-01" className="w-4 h-4" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedFile(null)
                }}
                className="h-6 w-6 p-0"
              >
                <Icon icon="hugeicons:cancel-01" className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>

        <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileInputChange} className="hidden" />

        <Button variant="ghost" onClick={downloadTemplate} className="w-full text-purple-600 hover:text-purple-700">
          <Icon icon="hugeicons:download-01" className="w-4 h-4 mr-2" />
          Download sample template
        </Button>
      </div>
    </DialogSkeleton>
  )
}

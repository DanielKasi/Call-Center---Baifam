"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { IContact } from "@/app/types/types.utils"

interface ContactsHeaderProps {
  contacts: IContact[]
  onFilteredContactsChange: (contacts: IContact[]) => void
}

export function ContactsHeader({contacts, onFilteredContactsChange }: ContactsHeaderProps) {


const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [productFilter, setProductFilter] = useState("all")

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
  return (
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
          <Button variant="outline" size={"sm"} className="rounded-xl">
            Re-Assign
          </Button>
          <Button variant="outline" size={"sm"} className="rounded-xl">
            Assign
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="outline" size={"sm"} className="rounded-xl">
          <Icon icon="hugeicons:download-01" className="w-4 h-4" />
        </Button>

        <Button size={"sm"} className="bg-primary-600 hover:bg-primary-700 rounded-xl">
          <Icon icon="hugeicons:add-01" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import type { Call } from "@/app/types/types.utils"
import Link from "next/link"

interface CallsFiltersProps {
  calls: Call[]
  onFilteredCallsChange: (calls: Call[]) => void
  totalCalls: number
}

export function CallsFilters({ calls, onFilteredCallsChange, totalCalls }: CallsFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [directionFilter, setDirectionFilter] = useState("all")
  const [productFilter, setProductFilter] = useState("all")

  useEffect(() => {
    let filtered = calls

    if (searchTerm) {
      filtered = filtered.filter(
        (call) =>
          call.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          call.agent.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((call) => call.status === statusFilter)
    }

    if (directionFilter !== "all") {
      filtered = filtered.filter((call) => call.direction === directionFilter)
    }

    if (productFilter !== "all") {
      filtered = filtered.filter((call) => call.product === productFilter)
    }

    onFilteredCallsChange(filtered)
  }, [searchTerm, statusFilter, directionFilter, productFilter, calls, onFilteredCallsChange])

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header with Title, Filters, Search, and Actions */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Calls ({totalCalls})</h1>

        <div className="flex items-center space-x-4">
          {/* Filters */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 rounded-xl">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Complete">Complete</SelectItem>
              <SelectItem value="Missed">Missed</SelectItem>
              <SelectItem value="Unanswered">Unanswered</SelectItem>
            </SelectContent>
          </Select>

          <Select value={directionFilter} onValueChange={setDirectionFilter}>
            <SelectTrigger className="w-40 rounded-xl">
              <SelectValue placeholder="All Directions" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Directions</SelectItem>
              <SelectItem value="Outgoing">Outgoing</SelectItem>
              <SelectItem value="Incoming">Incoming</SelectItem>
            </SelectContent>
          </Select>

          {/* Search */}
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

          {/* Action Buttons */}
          <Button variant="outline" className="rounded-xl">
            <Icon icon="hugeicons:download-01" className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Button className="bg-primary-600 hover:bg-primary-700 rounded-xl" asChild>
            <Link href="/calls/add">
              <Icon icon="hugeicons:add-01" className="w-4 h-4 mr-2" />
              Add Call
            </Link>
          </Button>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 px-4">
          <button
            onClick={() => setProductFilter("all")}
            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
              productFilter === "all"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setProductFilter("Valuation")}
            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
              productFilter === "Valuation"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Valuation
          </button>
          <button
            onClick={() => setProductFilter("Loan")}
            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
              productFilter === "Loan"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Loan
          </button>
          <button
            onClick={() => setProductFilter("Investment")}
            className={`py-4 text-sm font-medium border-b-2 transition-colors ${
              productFilter === "Investment"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Investment
          </button>
        </div>
      </div>
    </div>
  )
}

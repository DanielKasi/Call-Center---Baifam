"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Icon } from "@iconify/react"
import type { CallFormData } from "@/app/types/types.utils"
import { useRouter } from "next/navigation"

export function AddCallForm() {

  const [formData, setFormData] = useState<CallFormData>({
    client: "",
    product: "",
    status: "",
    date: "",
    duration: "00:00:00",
    direction: "",
    isProspect: true,
    location: "",
    comment: "",
  })

  const router = useRouter();

  const handleBack = () =>[
    router.back()
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const handleInputChange = (field: keyof CallFormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="outline" size="sm" className="p-2 !rounded-full !aspect-square" onClick={handleBack}>
          <Icon icon="hugeicons:arrow-left-02" className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Add Call</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client */}
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Select value={formData.client} onValueChange={(value) => handleInputChange("client", value)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Search Client" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="alice-johnson">Alice Johnson</SelectItem>
                <SelectItem value="michael-smith">Michael Smith</SelectItem>
                <SelectItem value="sophia-brown">Sophia Brown</SelectItem>
                <SelectItem value="olivia-wilson">Olivia Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Product */}
          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Select value={formData.product} onValueChange={(value) => handleInputChange("product", value)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="valuation">Valuation</SelectItem>
                <SelectItem value="loan">Loan</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
                <SelectItem value="unanswered">Unanswered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="rounded-xl pr-10"
                placeholder="mm/dd/yyyy --:--:--"
              />
              <Icon
                icon="hugeicons:calendar-01"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              type="text"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              className="rounded-xl"
              placeholder="00:00:00"
            />
          </div>

          {/* Direction */}
          <div className="space-y-2">
            <Label htmlFor="direction">Direction</Label>
            <Select value={formData.direction} onValueChange={(value) => handleInputChange("direction", value)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select Direction" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="outgoing">Outgoing</SelectItem>
                <SelectItem value="incoming">Incoming</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Feedback</h3>

          {/* Is Prospect */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isProspect"
              checked={formData.isProspect}
              onCheckedChange={(checked) => handleInputChange("isProspect", checked as boolean)}
              className="rounded"
            />
            <Label htmlFor="isProspect" className="text-sm font-medium">
              Is Prospect
            </Label>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">location</Label>
            <Input
              id="location"
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="rounded-xl"
              placeholder="Client Location"
            />
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => handleInputChange("comment", e.target.value)}
              className="rounded-xl min-h-[120px]"
              placeholder="Add your comments here..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-primary-700 max-w-sm rounded-full h-12">
          Add Call
        </Button>
      </form>
    </div>
  )
}

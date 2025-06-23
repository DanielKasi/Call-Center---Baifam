"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation"

export function ContactDetailsHeader() {
    const router = useRouter();
    const handleBack =() =>{
        router.back()
    }
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="default" className="p-2 !aspect-square !rounded-full" onClick={handleBack}>
          <Icon icon="hugeicons:arrow-left-02" className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Contact details</h1>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="outline" className="rounded-xl">
          <Icon icon="hugeicons:edit-02" className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" className="rounded-xl">
          <Icon icon="hugeicons:archive" className="w-4 h-4 mr-2" />
          Archive
        </Button>
        <Button variant="outline" className="rounded-xl text-red-600 border-red-200 hover:bg-red-50">
          <Icon icon="hugeicons:delete-02" className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  )
}

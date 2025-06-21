"use client"

import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  icon: string
  color: string
  bgColor: string
}

export function StatsCard({ title, value, icon, color, bgColor }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={cn("p-3 rounded-lg", bgColor)}>
          <Icon icon={icon} className={cn("w-6 h-6", color)} />
        </div>
      </div>
    </div>
  )
}

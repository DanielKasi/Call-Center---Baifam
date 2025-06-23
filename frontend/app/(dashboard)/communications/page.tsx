"use client"

import { useState } from "react"
import { CommunicationsHeader } from "@/components/communications/communications-header"
import { CommunicationsTabs } from "@/components/communications/communications-tabs"
import { ChatsView } from "@/components/communications/chats-view"
import { AnnouncementsView } from "@/components/communications/announcements-view"
import type { Chat, Announcement } from "@/app/types/types.utils"

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Staff Group",
    lastMessage: "You: QA Tip of the Day 📝: Use the custo...",
    isGroup: true,
    userCount: 32,
    messages: [
      {
        id: "1",
        sender: "Faith Kisakye",
        message:
          "Good morning, team! Just a reminder that the daily briefing starts at 8:45 AM sharp. Let's aim to join 5 minutes early.",
        timestamp: "9:12 AM",
      },
      {
        id: "2",
        sender: "Grace Namulindwa",
        message: "Morning everyone! Ready for a productive day. Can someone share the updated script for Product X?",
        timestamp: "9:14 AM",
      },
      {
        id: "3",
        sender: "Jacob Musisi",
        message: "@Grace Here you go! [ProductX_Script_V2.docx] - Let me know if you have any questions.",
        timestamp: "2:43 pm",
      },
      {
        id: "4",
        sender: "You",
        message:
          "QA Tip of the Day 📝: Use the customer's name at least twice during the call—it helps build rapport and trust.",
        timestamp: "3:12 PM",
        isOwn: true,
      },
    ],
  },
  {
    id: "2",
    name: "Sempala Martin",
    lastMessage: "Don't forget, tomorrow's session starts...",
    messages: [],
  },
  {
    id: "3",
    name: "Aisha Khatun",
    lastMessage: "We'll be monitoring live calls this afterno...",
    messages: [],
  },
  {
    id: "4",
    name: "Dan Kaliisa",
    lastMessage: "Customer confirmed issue is resolved. N...",
    messages: [],
  },
]

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "System Maintenance Scheduled - June 16th",
    description: "There will be a scheduled system downtime from 11:00 PM t...",
    priority: "Normal",
    timestamp: "Jun, 12 2025 • 2:21 pm",
    date: "Jun, 12 2025",
  },
  {
    id: "2",
    title: "Internal Chat Policy Update",
    description: "All non-work-related messages should now be kept out of th...",
    priority: "Important",
    timestamp: "May, 28 2025 • 9:45 am",
    date: "May, 28 2025",
  },
  {
    id: "3",
    title: "Call Monitoring Begins Next Week",
    description: "Supervisors will begin live call monitoring from Monday to su...",
    priority: "Urgent",
    timestamp: "Apr, 05 2025 • 4:30 pm",
    date: "Apr, 05 2025",
  },
  {
    id: "4",
    title: "Reminder: Daily Wrap-Up Notes Required",
    description: "Agents are required to submit daily summaries before signin...",
    priority: "Normal",
    timestamp: "Mar, 19 2025 • 11:10 am",
    date: "Mar, 19 2025",
  },
  {
    id: "5",
    title: "Reminder: Daily Wrap-Up Notes Required",
    description: "Agents are required to submit daily summaries before signin...",
    priority: "Normal",
    timestamp: "Feb, 07 2025 • 6:55 pm",
    date: "Feb, 07 2025",
  },
]

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState<"chats" | "announcements">("chats")
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0])

  return (
    <div className="space-y-6 border border-gray-200 bg-white rounded-xl p-4">
      <CommunicationsHeader />
      <div className="h-[calc(100svh-10rem)] relative">
        <CommunicationsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "chats" ? (
          <ChatsView chats={mockChats} selectedChat={selectedChat} onChatSelect={setSelectedChat} />
        ) : (
          <AnnouncementsView announcements={mockAnnouncements} />
        )}
      </div>
    </div>
  )
}

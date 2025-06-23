"use client"

interface CommunicationsTabsProps {
  activeTab: "chats" | "announcements"
  onTabChange: (tab: "chats" | "announcements") => void
}

export function CommunicationsTabs({ activeTab, onTabChange }: CommunicationsTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-8 px-6">
        <button
          onClick={() => onTabChange("chats")}
          className={`py-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "chats"
              ? "border-gray-900 text-gray-900"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Chats
        </button>
        <button
          onClick={() => onTabChange("announcements")}
          className={`py-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "announcements"
              ? "border-gray-900 text-gray-900"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Announcements
        </button>
      </div>
    </div>
  )
}

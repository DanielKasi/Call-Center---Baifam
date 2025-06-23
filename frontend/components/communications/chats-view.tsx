"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Icon } from "@iconify/react"
import type { Chat } from "@/app/types/types.utils"

interface ChatsViewProps {
  chats: Chat[]
  selectedChat: Chat | null
  onChatSelect: (chat: Chat) => void
}

export function ChatsView({ chats, selectedChat, onChatSelect }: ChatsViewProps) {
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("")
    }
  }

  return (
    <div className="flex h-full max-h-full">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r min-h-fit max-h-[74svh] border-gray-200 flex flex-col">
        <div className="p-4 border-b h-20 border-gray-200">
          <div className="relative">
            <Icon
              icon="hugeicons:search-01"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            />
            <Input placeholder="Search" className="pl-10 rounded-xl" />
          </div>
        </div>

        <div className="flex-1 h-full max-h-[65svh] overflow-y-auto ">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedChat?.id === chat.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gray-200">
                    {chat.isGroup ? <Icon icon="hugeicons:user-group" className="w-5 h-5" /> : chat.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{chat.name}</h3>
                    {chat.isGroup && <span className="text-xs text-gray-500">{chat.userCount} Users</span>}
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">{chat.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 flex flex-col relative">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 h-20 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{selectedChat.name}</h2>
                  {selectedChat.isGroup && <p className="text-sm text-gray-500">{selectedChat.userCount} Users</p>}
                </div>
                <Button variant="ghost" size="sm" className="p-2">
                  <Icon icon="hugeicons:more-horizontal" className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 max-h-[60svh] overflow-y-auto p-4 space-y-4">
              {selectedChat.messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{message.sender}</span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <div
                    className={`p-3 rounded-lg max-w-md ${
                      message.isOwn ? "bg-primary-600 text-white ml-auto" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 sticky bottom-0 right-0 w-full">
              <div className="flex items-center space-x-3">
                <Input
                  placeholder="Type Message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 rounded-xl"
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} className="bg-primary-600 hover:bg-primary-700 rounded-xl p-3">
                  <Icon icon="hugeicons:sent" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  )
}

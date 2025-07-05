"use client"

import { useState } from "react"
import { AgentsHeader } from "@/components/agents/agents-header"
import { AgentsList } from "@/components/agents/agents-list"
import { Agent } from "@/app/types/types.utils"



const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Ssempala Martin",
    email: "sempalmartin@gmail.com",
    phone: "+256781234567",
    contacts: 23,
    calls: 74,
    status: "Active",
    companies: ["Blue Diamond", "Subik Finance", "Baifam"],
  },
  {
    id: "2",
    name: "Aisha Khatun",
    email: "aisha.khatun@example.com",
    phone: "+256791234578",
    contacts: 45,
    calls: 65,
    status: "Active",
    companies: ["Blue Diamond"],
  },
  {
    id: "3",
    name: "Jamal Thompson",
    email: "jamal.thompson@email.com",
    phone: "+256801234589",
    contacts: 37,
    calls: 50,
    status: "Active",
    companies: ["Subik Finance"],
  },
  {
    id: "4",
    name: "Loukman Ali",
    email: "loukman.ali@domain.com",
    phone: "+256811234590",
    contacts: 28,
    calls: 82,
    status: "Active",
    companies: ["Baifam"],
  },
  {
    id: "5",
    name: "Omar Faruk",
    email: "omar.faruk@email.com",
    phone: "+256821234601",
    contacts: 32,
    calls: 90,
    status: "Active",
    companies: ["Blue Diamond", "Baifam"],
  },
  {
    id: "6",
    name: "Lisa Wong",
    email: "lisa.wong@gmail.com",
    phone: "+256831234612",
    contacts: 41,
    calls: 77,
    status: "Active",
    companies: ["Subik Finance"],
  },
  {
    id: "7",
    name: "Rajesh Sinha",
    email: "rajesh.sinha@company.com",
    phone: "+256841234623",
    contacts: 29,
    calls: 88,
    status: "Active",
    companies: ["Blue Diamond"],
  },
  {
    id: "8",
    name: "Chloe Kimuli",
    email: "chloe.kim@mail.com",
    phone: "+256851234634",
    contacts: 50,
    calls: 70,
    status: "Active",
    companies: ["Baifam"],
  },
  {
    id: "9",
    name: "David Johnson",
    email: "david.johnson@example.com",
    phone: "+256861234645",
    contacts: 34,
    calls: 55,
    status: "Active",
    companies: ["Subik Finance"],
  },
]

export default function AgentsPage() {
  const [filteredAgents, setFilteredAgents] = useState(mockAgents);


  return (
    <div className="space-y-6 bg-white border rounded-xl p-4 border-gray-200">
      <AgentsHeader agents={mockAgents} onFilteredAgentsChange={setFilteredAgents} totalAgents={mockAgents.length} />
      <AgentsList agents={filteredAgents} />
    </div>
  )
}

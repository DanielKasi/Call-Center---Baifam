"use client";

import {Agent} from "@/app/types/types.utils";
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/react";
import {useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {Input} from "../ui/input";

interface AgentsHeaderProps {
  totalAgents: number;
  agents: Agent[];
  onFilteredAgentsChange: (agents: Agent[]) => void;
}

export function AgentsHeader({totalAgents, agents, onFilteredAgentsChange}: AgentsHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let filtered = agents;

    if (searchTerm) {
      filtered = filtered.filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.phone.includes(searchTerm),
      );
    }

    if (companyFilter !== "all") {
      filtered = filtered.filter((agent) => agent.companies.includes(companyFilter));
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((agent) => agent.status === statusFilter);
    }

    onFilteredAgentsChange(filtered);
  }, [searchTerm, companyFilter, statusFilter, agents, onFilteredAgentsChange]);
  return (
    <div className="flex items-center justify-between bg-transparent rounded-xl p-4">
      <h1 className="text-2xl font-bold text-gray-900 pr-4">Agents ({totalAgents})</h1>

      <div className="flex items-center justify-center gap-4 px-6">
        <div className="flex items-center space-x-4">
          <Select value={companyFilter} onValueChange={setCompanyFilter}>
            <SelectTrigger className="w-40 rounded-xl">
              <SelectValue placeholder="All Companies" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Companies</SelectItem>
              <SelectItem value="Blue Diamond">Blue Diamond</SelectItem>
              <SelectItem value="Subik Finance">Subik Finance</SelectItem>
              <SelectItem value="Baifam">Baifam</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 rounded-xl">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
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

        <Button className="bg-primary-700 rounded-xl text-white pl-4">
          <Icon icon="hugeicons:add-01" className="w-4 h-4 text-white" />
        </Button>
      </div>
    </div>
  );
}

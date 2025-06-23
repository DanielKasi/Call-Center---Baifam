"use client";

import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Icon} from "@iconify/react";

export function ContactDetailsInfo() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 ">
      <div className="flex items-end justify-between h-full w-full gap-6 ">
        <div className="h-full ">
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Kasasa Roy Didanie</h2>
            <Badge className="bg-green-100 text-green-800 rounded-full">Active</Badge>
          </div>
          <p className="text-primary-600 text-sm mb-4">Is Prospect</p>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Icon icon="hugeicons:package" className="w-5 h-5 text-gray-500" />
              <span className="text-gray-900">Product: Loan</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon icon="hugeicons:call" className="w-5 h-5 text-gray-500" />
              <span className="text-gray-900">+256752342992</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full items-center justify-end">
          <div className="flex items-end justify-center gap-3  ">
            <Button className="bg-primary-700  rounded-xl">
              <Icon icon="hugeicons:call" className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button className="bg-primary-700  rounded-xl ">
              <Icon icon="hugeicons:user-check-01" className="w-4 h-4 mr-2" />
              Mark as Active
            </Button>
          </div>
        </div>

        <div className="text-left h-full border-l-2 pl-3 border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Assignee</p>
          <p className="text-lg font-semibold text-gray-900 mb-2">Matovu Mark</p>
          <p className="text-sm text-gray-500 mb-1">May 12, 2025 - Now • 23 Calls Handled</p>
        </div>
      </div>
    </div>
  );
}

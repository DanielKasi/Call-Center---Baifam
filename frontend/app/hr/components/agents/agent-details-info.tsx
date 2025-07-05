"use client";

import {Badge} from "@/components/ui/badge";
import {Icon} from "@iconify/react";

export function AgentDetailsInfo() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Ssempala Martin</h2>
            <Badge className="bg-green-100 text-green-800 rounded-full">Active</Badge>
          </div>
          <p className="text-gray-600 text-sm mb-4">ssempalamartin@gmail.com • +256752139437</p>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon icon="hugeicons:building-01" className="w-5 h-5 text-gray-500" />
              <div className="flex items-center space-x-2">
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  Blue Diamond
                </span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  Subik Finance
                </span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  Baifam
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="flex items-center justify-start py-2 gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-2">
              <Icon icon="hugeicons:contact-book" className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex flex-col items-start justify-center py-2">
              <p className="text-2xl font-bold text-gray-900">23</p>
              <p className="text-sm text-gray-500">Total Contacts</p>
            </div>
          </div>
          <div className="flex items-center justify-start py-2 gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-2">
              <Icon icon="hugeicons:call" className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex flex-col items-start justify-center">
              <p className="text-2xl font-bold text-gray-900">74</p>
              <p className="text-xs text-gray-500">Total Calls</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

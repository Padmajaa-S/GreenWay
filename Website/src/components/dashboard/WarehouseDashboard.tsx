import React from 'react';
import {
  Package,
  PackageCheck,
  PackageX,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function WarehouseDashboard() {
  const pendingReturns = [
    {
      id: 'RET-001',
      customer: 'John Doe',
      items: 2,
      status: 'Awaiting Receipt',
      priority: 'High',
    },
    {
      id: 'RET-002',
      customer: 'Jane Smith',
      items: 1,
      status: 'In Transit',
      priority: 'Medium',
    },
    {
      id: 'RET-003',
      customer: 'Bob Johnson',
      items: 3,
      status: 'Processing',
      priority: 'Low',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Warehouse Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and process return requests efficiently
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Pending Returns</div>
                <div className="text-2xl font-semibold text-gray-900">24</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Processing Time</div>
                <div className="text-2xl font-semibold text-gray-900">1.2 days</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PackageCheck className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Processed Today</div>
                <div className="text-2xl font-semibold text-gray-900">18</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PackageX className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5">
                <div className="text-sm font-medium text-gray-500">Flagged Items</div>
                <div className="text-2xl font-semibold text-gray-900">3</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Returns Queue */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Returns Queue</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingReturns.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                        {
                          'bg-red-100 text-red-800': item.priority === 'High',
                          'bg-yellow-100 text-yellow-800': item.priority === 'Medium',
                          'bg-green-100 text-green-800': item.priority === 'Low',
                        }
                      )}
                    >
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <ArrowRight className="h-5 w-5" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <CheckCircle2 className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

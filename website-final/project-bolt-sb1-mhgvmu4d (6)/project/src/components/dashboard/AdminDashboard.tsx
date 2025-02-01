import React from 'react';
import {
  TrendingUp,
  PackageOpen,
  RefreshCcw,
  AlertTriangle,
  Truck,
  Users,
  IndianRupee,
  Leaf,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminDashboard() {
  const stats = [
    { label: 'Total Returns', value: '1,234', change: '+12.5%', icon: PackageOpen, trend: 'up' },
    { label: 'Processing', value: '123', change: '-5.2%', icon: RefreshCcw, trend: 'down' },
    { label: 'Flagged', value: '23', change: '+2.3%', icon: AlertTriangle, trend: 'up' },
    { label: 'Completed', value: '891', change: '+18.2%', icon: Truck, trend: 'up' },
  ];

  const kpis = [
    { label: 'Customer Satisfaction', value: '94%', icon: Users },
    { label: 'Cost Savings', value: '₹12.5L', icon: IndianRupee },
    { label: 'Sustainability Score', value: '87%', icon: Leaf },
    { label: 'Processing Efficiency', value: '95%', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of return operations and key metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div
                        className={cn(
                          "ml-2 flex items-baseline text-sm font-semibold",
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        )}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="bg-indigo-50 rounded-md p-3">
                    <kpi.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{kpi.label}</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{kpi.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
        </div>
        <div className="px-6 py-5">
          <div className="flow-root">
            <ul className="-mb-8">
              {[1, 2, 3].map((item, itemIdx) => (
                <li key={item}>
                  <div className="relative pb-8">
                    {itemIdx !== 2 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center ring-8 ring-white">
                          <PackageOpen className="h-5 w-5 text-indigo-600" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            New return request <span className="font-medium text-gray-900">#12345</span>{' '}
                            from Customer A
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime="2024-02-25">3 minutes ago</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
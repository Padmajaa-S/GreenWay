import React from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Package,
  RefreshCw,
  Users,
  Clock,
  Leaf,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function Analytics() {
  const metrics = [
    {
      label: 'Total Returns Value',
      value: '$124,592',
      change: '+12.5%',
      icon: DollarSign,
    },
    {
      label: 'Return Rate',
      value: '3.2%',
      change: '-0.5%',
      icon: TrendingUp,
    },
    {
      label: 'Processing Time',
      value: '1.8 days',
      change: '-12%',
      icon: Clock,
    },
    {
      label: 'Customer Satisfaction',
      value: '94%',
      change: '+2.3%',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">
          Detailed insights and performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="bg-indigo-50 rounded-md p-3">
                    <metric.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {metric.label}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metric.value}
                      </div>
                      <div
                        className={cn(
                          "ml-2 flex items-baseline text-sm font-semibold",
                          metric.change.startsWith('+')
                            ? 'text-green-600'
                            : 'text-red-600'
                        )}
                      >
                        {metric.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Placeholder for actual charts */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Returns by Category</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <BarChart3 className="h-8 w-8 text-gray-400" />
            <span className="ml-2 text-gray-500">Chart will be implemented here</span>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Processing Time Trend</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <TrendingUp className="h-8 w-8 text-gray-400" />
            <span className="ml-2 text-gray-500">Chart will be implemented here</span>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sustainability Impact</h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="ml-2 text-green-800 font-medium">Carbon Footprint Saved</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-green-900">2.4 tons</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <RefreshCw className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-blue-800 font-medium">Items Recycled</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-blue-900">1,234</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center">
              <Package className="h-6 w-6 text-purple-600" />
              <span className="ml-2 text-purple-800 font-medium">Packaging Saved</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-purple-900">3.6 tons</p>
          </div>
        </div>
      </div>
    </div>
  );
}

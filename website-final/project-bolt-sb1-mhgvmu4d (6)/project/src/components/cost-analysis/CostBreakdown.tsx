import React from 'react';
import { Fuel, PenTool as Tool, Users, Package, TrendingUp, Map, Calendar, IndianRupee, Download, Filter } from 'lucide-react';
import { Line } from 'react-chartjs-2';

export function CostBreakdown() {
  const [dateRange, setDateRange] = React.useState('monthly');
  const [selectedVehicle, setSelectedVehicle] = React.useState('all');

  // Mock data for charts
  const costData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Fuel Costs',
        data: [45000, 48000, 52000, 49000, 53000, 51000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Maintenance Costs',
        data: [15000, 18000, 16000, 19000, 17000, 20000],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cost (₹)',
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cost Breakdown Analysis</h1>
          <p className="mt-1 text-sm text-gray-500">
            Detailed analysis of operational costs and expenses
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Cost Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <Fuel className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Fuel Costs</h3>
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">₹51,000</p>
              <p className="text-sm text-gray-500">Last month</p>
            </div>
            <div className="bg-blue-50 rounded-full p-2">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Efficiency</span>
              <span className="text-green-600">92%</span>
            </div>
            <div className="mt-1 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <Tool className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Maintenance</h3>
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">₹20,000</p>
              <p className="text-sm text-gray-500">Last month</p>
            </div>
            <div className="bg-green-50 rounded-full p-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Scheduled</span>
              <span className="text-green-600">85%</span>
            </div>
            <div className="mt-1 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-purple-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Labor</h3>
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">₹1,25,000</p>
              <p className="text-sm text-gray-500">Last month</p>
            </div>
            <div className="bg-purple-50 rounded-full p-2">
              <TrendingUp className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Productivity</span>
              <span className="text-green-600">95%</span>
            </div>
            <div className="mt-1 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-purple-500 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <Package className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Packaging</h3>
              </div>
              <p className="mt-2 text-3xl font-bold text-gray-900">₹35,000</p>
              <p className="text-sm text-gray-500">Last month</p>
            </div>
            <div className="bg-yellow-50 rounded-full p-2">
              <TrendingUp className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Utilization</span>
              <span className="text-green-600">88%</span>
            </div>
            <div className="mt-1 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Trends Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Cost Trends</h2>
        <div className="h-96">
          <Line data={costData} options={chartOptions} />
        </div>
      </div>

      {/* Detailed Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Vehicle Maintenance Log</h3>
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="all">All Vehicles</option>
                <option value="v1">Vehicle 1</option>
                <option value="v2">Vehicle 2</option>
              </select>
              <button className="text-indigo-600 hover:text-indigo-900">
                <Filter className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2024-02-25
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Oil Change
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹2,500
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2024-02-23
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Tire Rotation
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹1,800
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Labor Cost Analysis</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Regular Hours</span>
                <span className="text-sm font-medium text-gray-900">₹85,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Overtime</span>
                <span className="text-sm font-medium text-gray-900">₹25,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Benefits</span>
                <span className="text-sm font-medium text-gray-900">₹15,000</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-900">Total</span>
                  <span className="text-sm font-bold text-gray-900">₹1,25,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
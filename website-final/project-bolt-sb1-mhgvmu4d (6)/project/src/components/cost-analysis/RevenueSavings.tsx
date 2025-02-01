import React from 'react';
import {
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  PieChart,
  Download,
  Calendar,
  RefreshCw,
  ShoppingBag,
  Package,
  Truck,
} from 'lucide-react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { cn } from '../../lib/utils';

export function RevenueSavings() {
  const [dateRange, setDateRange] = React.useState('monthly');
  const [isLoading, setIsLoading] = React.useState(false);

  // Mock data for revenue metrics
  const revenueMetrics = {
    totalRevenue: '₹24.5L',
    revenueGrowth: '+15.2%',
    averageOrderValue: '₹2,850',
    profitMargin: '32%',
  };

  // Mock data for charts
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Refund Costs',
        data: [150000, 180000, 160000, 190000, 175000, 200000],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
      },
      {
        label: 'Resale Revenue',
        data: [280000, 310000, 290000, 340000, 320000, 380000],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
    ],
  };

  const categoryData = {
    labels: ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports'],
    datasets: [{
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(139, 92, 246, 0.8)',
      ],
    }],
  };

  const savingsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Cost Savings',
      data: [45000, 52000, 49000, 58000, 55000, 62000],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
    }],
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
          text: 'Amount (₹)',
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  const handleExport = () => {
    setIsLoading(true);
    // Simulate export delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Revenue & Savings Analysis</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track revenue streams and cost-saving initiatives
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
          <button
            onClick={handleExport}
            disabled={isLoading}
            className={cn(
              "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white",
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            )}
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{revenueMetrics.totalRevenue}</p>
              <div className="mt-1 flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">{revenueMetrics.revenueGrowth}</span>
              </div>
            </div>
            <div className="bg-blue-50 rounded-full p-3">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Order Value</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{revenueMetrics.averageOrderValue}</p>
              <div className="mt-1 flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">+8.3%</span>
              </div>
            </div>
            <div className="bg-green-50 rounded-full p-3">
              <ShoppingBag className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Profit Margin</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{revenueMetrics.profitMargin}</p>
              <div className="mt-1 flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">+5.2%</span>
              </div>
            </div>
            <div className="bg-purple-50 rounded-full p-3">
              <TrendingUp className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Returns Processed</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">1,234</p>
              <div className="mt-1 flex items-center">
                <ArrowDownRight className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-500">-12.5%</span>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-full p-3">
              <Package className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Comparison Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue Comparison</h2>
        <div className="h-96">
          <Line data={revenueData} options={chartOptions} />
        </div>
      </div>

      {/* Category Distribution and Monthly Savings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Category Distribution</h2>
          <div className="h-80">
            <Pie data={categoryData} options={pieOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Cost Savings</h2>
          <div className="h-80">
            <Bar data={savingsData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Detailed Metrics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost Savings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Electronics
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹8.5L
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹1.2L
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    +12.5%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Fashion
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹6.2L
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹85K
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    +8.3%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
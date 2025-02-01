import React from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
  Target,
  Activity,
  DollarSign,
  Calendar,
  Filter,
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import { cn } from '../../lib/utils';

export function ROIAnalysis() {
  const [dateRange, setDateRange] = React.useState('monthly');
  const [isLoading, setIsLoading] = React.useState(false);

  // Mock data for ROI metrics
  const roiMetrics = {
    overallROI: '285%',
    paybackPeriod: '4.2 months',
    npv: '₹45.2L',
    irr: '32%',
  };

  // Mock data for charts
  const investmentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Investment',
        data: [500000, 520000, 480000, 550000, 600000, 580000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Returns',
        data: [650000, 700000, 680000, 750000, 820000, 800000],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
    ],
  };

  const projectROIData = {
    labels: [
      'Route Optimization',
      'Warehouse Automation',
      'Quality Control',
      'Staff Training',
      'Software Systems',
    ],
    datasets: [{
      label: 'ROI Percentage',
      data: [312, 245, 198, 156, 134],
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

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'ROI (%)',
        },
      },
    },
  };

  const handleExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ROI Analysis</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track return on investment across initiatives
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
              <p className="text-sm text-gray-500">Overall ROI</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{roiMetrics.overallROI}</p>
              <div className="mt-1 flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">+15.2%</span>
              </div>
            </div>
            <div className="bg-blue-50 rounded-full p-3">
              <Target className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Payback Period</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{roiMetrics.paybackPeriod}</p>
              <div className="mt-1 flex items-center">
                <ArrowDownRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">-0.8 months</span>
              </div>
            </div>
            <div className="bg-green-50 rounded-full p-3">
              <Calendar className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Net Present Value</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{roiMetrics.npv}</p>
              <div className="mt-1 flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">+12.5%</span>
              </div>
            </div>
            <div className="bg-purple-50 rounded-full p-3">
              <DollarSign className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Internal Rate of Return</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{roiMetrics.irr}</p>
              <div className="mt-1 flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">+5.8%</span>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-full p-3">
              <Activity className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Investment vs Returns Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Investment vs Returns</h2>
        <div className="h-96">
          <Line data={investmentData} options={chartOptions} />
        </div>
      </div>

      {/* Project ROI Comparison */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Project ROI Comparison</h2>
        <div className="h-80">
          <Bar data={projectROIData} options={barOptions} />
        </div>
      </div>

      {/* ROI Details Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Project ROI Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Investment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Returns
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Route Optimization
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹12.5L
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹51.5L
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  312%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Warehouse Automation
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹25.0L
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹86.25L
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  245%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    In Progress
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
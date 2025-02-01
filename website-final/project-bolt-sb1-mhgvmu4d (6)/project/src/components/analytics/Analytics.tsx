import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Package,
  RefreshCw,
  Users,
  Clock,
  Leaf,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Bell,
  Filter,
  Recycle,
  Truck,
  Factory,
  Battery,
  Lightbulb,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { cn } from '../../lib/utils';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Mock data generator functions
const generateDailyData = (days: number) => {
  const data = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.unshift({
      date: date.toISOString().split('T')[0],
      returns: Math.floor(Math.random() * 50) + 10,
      totalOrders: Math.floor(Math.random() * 200) + 100,
      emissions: Math.random() * 2 + 1,
      itemsSaved: Math.floor(Math.random() * 30) + 5,
    });
  }
  return data;
};

const generateReturnReasons = () => {
  const reasons = [
    'Damaged on arrival',
    'Wrong size/fit',
    'Not as described',
    'Changed mind',
    'Defective product',
    'Late delivery',
    'Missing parts',
    'Quality issues',
  ];

  return reasons.map(reason => ({
    reason,
    count: Math.floor(Math.random() * 100) + 20,
    trend: Math.random() > 0.5 ? 'up' : 'down',
    percentage: Math.floor(Math.random() * 20) + 5,
  })).sort((a, b) => b.count - a.count).slice(0, 5);
};

const generateCityData = () => {
  const cities = {
    developed: ['Mumbai', 'Bangalore', 'Delhi'],
    developing: ['Patna', 'Ranchi', 'Guwahati']
  };
  
  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  const baseRates = {
    Mumbai: 8,
    Bangalore: 7,
    Delhi: 9,
    Patna: 12,
    Ranchi: 11,
    Guwahati: 13
  };

  const data = {};
  Object.values(cities).flat().forEach(city => {
    data[city] = months.map(month => ({
      month,
      rate: baseRates[city] + (Math.random() * 4 - 2) // Add variation of ±2%
    }));
  });

  return { data, cities };
};

const ALERT_THRESHOLDS = {
  returnRate: 15,
  dailyIncrease: 25,
  rejectionRate: 30,
};

export function Analytics() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [returnData, setReturnData] = useState<any[]>([]);
  const [returnReasons, setReturnReasons] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Initialize data
  useEffect(() => {
    const loadData = () => {
      const dailyData = generateDailyData(30);
      setReturnData(dailyData);
      setReturnReasons(generateReturnReasons());
      checkAlerts(dailyData);
      setLastUpdate(new Date());
    };

    loadData();
    const interval = setInterval(loadData, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Alert system
  const checkAlerts = (data: any[]) => {
    const newAlerts = [];
    
    // Check return rate
    const latestDay = data[data.length - 1];
    const returnRate = (latestDay.returns / latestDay.totalOrders) * 100;
    if (returnRate > ALERT_THRESHOLDS.returnRate) {
      newAlerts.push({
        type: 'high-return-rate',
        message: `Return rate (${returnRate.toFixed(1)}%) exceeds threshold of ${ALERT_THRESHOLDS.returnRate}%`,
        severity: 'warning',
      });
    }

    // Check daily increase
    if (data.length >= 2) {
      const yesterday = data[data.length - 2].returns;
      const today = latestDay.returns;
      const increase = ((today - yesterday) / yesterday) * 100;
      if (increase > ALERT_THRESHOLDS.dailyIncrease) {
        newAlerts.push({
          type: 'sudden-increase',
          message: `Daily returns increased by ${increase.toFixed(1)}%`,
          severity: 'critical',
        });
      }
    }

    setAlerts(newAlerts);
    
    // Store alerts in localStorage
    localStorage.setItem('returnAlerts', JSON.stringify(newAlerts));
  };

  // Calculate metrics
  const calculateMetrics = () => {
    const latest = returnData[returnData.length - 1];
    const returnRate = latest ? (latest.returns / latest.totalOrders) * 100 : 0;
    const totalReturns = returnData.reduce((sum, day) => sum + day.returns, 0);
    const averageProcessingTime = 2.3; // Mock value

    return {
      returnRate: returnRate.toFixed(1),
      totalReturns,
      averageProcessingTime,
    };
  };

  const metrics = calculateMetrics();

  // New sustainability metrics calculation
  const calculateSustainabilityMetrics = () => {
    const totalEmissionsSaved = returnData.reduce((sum, day) => sum + day.emissions, 0);
    const totalItemsSaved = returnData.reduce((sum, day) => sum + day.itemsSaved, 0);
    
    return {
      emissionsSaved: totalEmissionsSaved.toFixed(2),
      itemsSaved: totalItemsSaved,
      routeOptimizationSavings: (totalEmissionsSaved * 0.3).toFixed(2),
      recyclingRate: 87,
      repairSuccessRate: 92,
      resaleRate: 78,
    };
  };

  const sustainabilityMetrics = calculateSustainabilityMetrics();

  // Chart configurations
  const returnTrendConfig = {
    data: {
      labels: returnData.map(d => d.date),
      datasets: [
        {
          label: 'Returns',
          data: returnData.map(d => d.returns),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Total Orders',
          data: returnData.map(d => d.totalOrders),
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const reasonsChartConfig = {
    data: {
      labels: returnReasons.map(r => r.reason),
      datasets: [
        {
          data: returnReasons.map(r => r.percentage),
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(251, 191, 36, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)',
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right' as const,
        },
      },
    },
  };

  // Sustainability charts configuration
  const emissionsChartConfig = {
    data: {
      labels: returnData.slice(-12).map(d => d.date),
      datasets: [{
        label: 'CO₂ Emissions Saved (metric tons)',
        data: returnData.slice(-12).map(d => d.emissions),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const wasteManagementConfig = {
    data: {
      labels: ['Refurbished', 'Recycled', 'Repurposed'],
      datasets: [{
        data: [45, 30, 25],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
        ],
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right' as const,
        },
      },
    },
  };

  const cityData = generateCityData();

  const cityComparisonConfig = {
    data: {
      labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
      datasets: [
        // Developed Cities
        {
          label: 'Mumbai',
          data: cityData.data.Mumbai.map(d => d.rate),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Bangalore',
          data: cityData.data.Bangalore.map(d => d.rate),
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Delhi',
          data: cityData.data.Delhi.map(d => d.rate),
          borderColor: 'rgb(251, 191, 36)',
          backgroundColor: 'rgba(251, 191, 36, 0.1)',
          tension: 0.4,
        },
        // Developing Cities
        {
          label: 'Patna',
          data: cityData.data.Patna.map(d => d.rate),
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          borderDash: [5, 5],
        },
        {
          label: 'Ranchi',
          data: cityData.data.Ranchi.map(d => d.rate),
          borderColor: 'rgb(139, 92, 246)',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          tension: 0.4,
          borderDash: [5, 5],
        },
        {
          label: 'Guwahati',
          data: cityData.data.Guwahati.map(d => d.rate),
          borderColor: 'rgb(236, 72, 153)',
          backgroundColor: 'rgba(236, 72, 153, 0.1)',
          tension: 0.4,
          borderDash: [5, 5],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Return Rate (%)'
          }
        },
      },
    },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Returns Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button
            onClick={() => window.location.reload()}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Active Alerts ({alerts.length})
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc list-inside">
                  {alerts.map((alert, index) => (
                    <li key={index}>{alert.message}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sustainability Impact Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Leaf className="h-6 w-6 text-green-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Sustainability Impact</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">CO₂ Emissions Saved</p>
                <p className="text-2xl font-bold text-green-600">{sustainabilityMetrics.emissionsSaved}</p>
                <p className="text-xs text-gray-500">metric tons</p>
              </div>
              <Factory className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Items Saved from Landfill</p>
                <p className="text-2xl font-bold text-blue-600">{sustainabilityMetrics.itemsSaved}</p>
                <p className="text-xs text-gray-500">items</p>
              </div>
              <Recycle className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Repair Success Rate</p>
                <p className="text-2xl font-bold text-purple-600">{sustainabilityMetrics.repairSuccessRate}%</p>
                <p className="text-xs text-gray-500">of attempted repairs</p>
              </div>
              <Battery className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Route Optimization Savings</p>
                <p className="text-2xl font-bold text-yellow-600">{sustainabilityMetrics.routeOptimizationSavings}</p>
                <p className="text-xs text-gray-500">metric tons CO₂</p>
              </div>
              <Truck className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-4">Monthly CO₂ Emissions Impact</h3>
            <div className="h-64">
              <Line data={emissionsChartConfig.data} options={emissionsChartConfig.options} />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-4">E-Waste Management Distribution</h3>
            <div className="h-64">
              <Doughnut data={wasteManagementConfig.data} options={wasteManagementConfig.options} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg p-4 shadow">
            <h4 className="font-semibold text-gray-900 mb-2">Recycling Performance</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Success Rate</span>
                <span className="font-semibold text-green-600">{sustainabilityMetrics.recyclingRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Resale Rate</span>
                <span className="font-semibold text-green-600">{sustainabilityMetrics.resaleRate}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <h4 className="font-semibold text-gray-900 mb-2">Green Logistics</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Route Efficiency</span>
                <span className="font-semibold text-green-600">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Fuel Savings</span>
                <span className="font-semibold text-green-600">12.3K L</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <h4 className="font-semibold text-gray-900 mb-2">Warehouse Sustainability</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Energy Efficiency</span>
                <span className="font-semibold text-green-600">96%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Water Conservation</span>
                <span className="font-semibold text-green-600">89%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* City Comparison Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Return Rates by City</h2>
          <div className="h-96">
            <Line data={cityComparisonConfig.data} options={cityComparisonConfig.options} />
          </div>
          <div className="mt-4 flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center">
              <div className="w-12 h-0.5 bg-blue-500 mr-2" />
              <span>Developed Cities</span>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-0.5 bg-red-500 mr-2 border-dashed border-t-2" />
              <span>Developing Cities</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">City Insights & Recommendations</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-red-600 mb-2">High-Risk Areas</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Guwahati showing consistently high return rates (&gt12%) - requires immediate attention</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Patna and Ranchi trending upward in recent months</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-blue-600 mb-2">Developed vs Developing Cities</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Average return rate gap: 4.2% higher in developing cities</li>
                <li>• Main factors: logistics infrastructure, product education</li>
                <li>• Bangalore shows best practices with consistent 7-8% rate</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-green-600 mb-2">Recommended Actions</h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-green-800">Short-term Interventions</p>
                  <ul className="mt-1 text-sm text-green-700">
                    <li>• Enhance product documentation in local languages</li>
                    <li>• Implement video-based product tutorials</li>
                    <li>• Strengthen quality checks in high-risk areas</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-sm font-medium text-blue-800">Long-term Strategy</p>
                  <ul className="mt-1 text-sm text-blue-700">
                    <li>• Establish local return processing centers</li>
                    <li>• Develop city-specific delivery guidelines</li>
                    <li>• Partner with local logistics providers</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-purple-600 mb-2">Potential Cost Savings</h3>
              <div className="bg-purple-50 p-3 rounded-md">
                <ul className="text-sm text-purple-700">
                  <li>• Estimated annual savings: ₹2.4 Cr</li>
                  <li>• ROI on local centers: 185% over 3 years</li>
                  <li>• Projected return rate reduction: 3.5%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Return Rate
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {metrics.returnRate}%
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <ArrowDown className="h-4 w-4" />
                      <span className="sr-only">Decreased by</span>
                      2.5%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Returns
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {metrics.totalReturns}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                      <ArrowUp className="h-4 w-4" />
                      <span className="sr-only">Increased by</span>
                      12.5%
                    </div>
                  </dd>
                </dl>
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
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Avg. Processing Time
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {metrics.averageProcessingTime} days
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <ArrowDown className="h-4 w-4" />
                      <span className="sr-only">Improved by</span>
                      8.2%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Return Trends Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Return Trends</h2>
        <div className="h-96">
          <Line data={returnTrendConfig.data} options={returnTrendConfig.options} />
        </div>
      </div>

      {/* Return Reasons Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Top Return Reasons</h2>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {returnReasons.map((reason, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reason.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reason.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reason.trend === 'up' ? (
                        <ArrowUp className="h-4 w-4 text-red-500" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-green-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Return Reasons Distribution</h2>
          <div className="h-96">
            <Doughnut data={reasonsChartConfig.data} options={reasonsChartConfig.options} />
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import { cn } from '../../lib/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const categories = [
  { name: 'Electronics', color: 'rgb(59, 130, 246)', data: [65, 72, 86, 81, 56, 55, 60, 70, 75, 80, 85, 90] },
  { name: 'Fashion', color: 'rgb(236, 72, 153)', data: [45, 50, 55, 48, 42, 40, 38, 45, 50, 52, 48, 45] },
  { name: 'Furniture', color: 'rgb(139, 92, 246)', data: [25, 28, 32, 30, 28, 25, 27, 30, 35, 38, 40, 42] },
  { name: 'Cosmetics', color: 'rgb(245, 158, 11)', data: [35, 38, 40, 42, 38, 35, 32, 30, 35, 40, 42, 45] },
  { name: 'Automotive', color: 'rgb(34, 197, 94)', data: [20, 22, 25, 24, 20, 18, 15, 18, 20, 22, 25, 28] },
  { name: 'Home Appliances', color: 'rgb(239, 68, 68)', data: [30, 35, 38, 40, 35, 32, 30, 35, 38, 40, 42, 45] },
];

export function TrendAnalysis() {
  const [visibleCategories, setVisibleCategories] = useState(
    categories.reduce((acc, cat) => ({ ...acc, [cat.name]: true }), {})
  );

  const toggleCategory = (category: string) => {
    setVisibleCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const chartData = {
    labels: months,
    datasets: categories
      .filter(cat => visibleCategories[cat.name])
      .map(category => ({
        label: category.name,
        data: category.data,
        borderColor: category.color,
        backgroundColor: `${category.color}33`,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      })),
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y} returns`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          color: '#6b7280',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Return Products Trend Analysis</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => toggleCategory(category.name)}
            className={cn(
              "flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
              visibleCategories[category.name]
                ? "bg-gray-100 text-gray-900"
                : "bg-white text-gray-500 border border-gray-200"
            )}
          >
            <span>{category.name}</span>
            {visibleCategories[category.name] ? (
              <ToggleRight className="h-4 w-4 ml-2" style={{ color: category.color }} />
            ) : (
              <ToggleLeft className="h-4 w-4 ml-2" />
            )}
          </button>
        ))}
      </div>

      <div className="h-[400px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
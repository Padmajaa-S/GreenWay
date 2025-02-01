import React, { useState, useEffect } from 'react';
import {
  Package,
  PackageCheck,
  PackageX,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Leaf,
  Filter,
  Image as ImageIcon,
  ShoppingBag,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ReturnCategoriesModal } from './ReturnCategoriesModal';
import { TrendAnalysis } from './TrendAnalysis';
import { IncomingShipments } from './IncomingShipments';

interface ReturnCategory {
  id: string;
  label: string;
  color: string;
  count: number;
  icon: React.ElementType;
  description: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  timestamp: string;
  images?: string[];
  status?: string;
  defect?: string;
  marketplacePrice?: number;
  originalPrice?: number;
  notes?: string;
  issue?: string;
  recommendation?: string;
}

const returnCategories: ReturnCategory[] = [
  {
    id: 'perfect',
    label: 'Perfect Condition',
    color: 'green',
    count: 45,
    icon: PackageCheck,
    description: 'Products suitable for immediate resale',
  },
  {
    id: 'minor',
    label: 'Minor Surface Damage',
    color: 'yellow',
    count: 35,
    icon: Package,
    description: 'Products with cosmetic issues only',
  },
  {
    id: 'review',
    label: 'Needs Review',
    color: 'blue',
    count: 28,
    icon: Package,
    description: 'Products requiring quality assessment',
  },
  {
    id: 'unusable',
    label: 'Unusable/Safety Hazard',
    color: 'red',
    count: 12,
    icon: PackageX,
    description: 'Products with severe damage or safety concerns',
  },
];

const categoryProducts: Record<string, Product[]> = {
  perfect: [
    {
      id: 'P001',
      name: 'Nike Air Max 270',
      category: 'perfect',
      timestamp: '2024-02-25T10:30:00Z',
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519',
      ],
      status: 'Ready for Resale',
    },
    {
      id: 'P002',
      name: 'Apple MacBook Pro',
      category: 'perfect',
      timestamp: '2024-02-25T11:30:00Z',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9',
      ],
      status: 'Ready for Resale',
    },
  ],
  minor: [
    {
      id: 'M001',
      name: 'Samsung 4K TV',
      category: 'minor',
      timestamp: '2024-02-24T15:45:00Z',
      defect: 'Minor scratch on frame',
      marketplacePrice: 45999,
      originalPrice: 89999,
    },
    {
      id: 'M002',
      name: 'iPhone 13 Pro',
      category: 'minor',
      timestamp: '2024-02-24T16:30:00Z',
      defect: 'Light scratches on back panel',
      marketplacePrice: 59999,
      originalPrice: 89999,
    },
  ],
  review: [
    {
      id: 'R001',
      name: 'iPad Pro 12.9"',
      category: 'review',
      timestamp: '2024-02-24T13:15:00Z',
      notes: 'Screen functionality needs testing',
      status: 'Pending Inspection',
    },
    {
      id: 'R002',
      name: 'Sony WH-1000XM4',
      category: 'review',
      timestamp: '2024-02-24T14:30:00Z',
      notes: 'Audio quality check required',
      status: 'Under Testing',
    },
  ],
  unusable: [
    {
      id: 'U001',
      name: 'Google Pixel 6',
      category: 'unusable',
      timestamp: '2024-02-24T11:00:00Z',
      issue: 'Severe water damage',
      recommendation: 'Recycle',
    },
    {
      id: 'U002',
      name: 'Lenovo ThinkPad',
      category: 'unusable',
      timestamp: '2024-02-24T12:15:00Z',
      issue: 'Motherboard failure',
      recommendation: 'Parts Recovery',
    },
  ],
};

export function WarehouseDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const getCategoryColor = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'green':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'blue':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderProductCard = (product: Product) => {
    const commonClasses = "border rounded-lg p-4 hover:shadow-md transition-shadow";

    switch (product.category) {
      case 'perfect':
        return (
          <div key={product.id} className={commonClasses}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{product.name}</h4>
              <button
                onClick={() => handleProductClick(product)}
                className="text-blue-600 hover:text-blue-800"
              >
                <ImageIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(product.timestamp).toLocaleDateString()}
            </p>
            <div className="mt-3 flex justify-end">
              <button className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Approve Transit
              </button>
            </div>
          </div>
        );

      case 'minor':
        return (
          <div key={product.id} className={commonClasses}>
            <h4 className="font-medium">{product.name}</h4>
            <p className="text-sm text-gray-500 mb-2">{product.defect}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">
                ₹{product.marketplacePrice?.toLocaleString()}
              </span>
              <span className="line-through text-gray-400">
                ₹{product.originalPrice?.toLocaleString()}
              </span>
            </div>
            <div className="mt-3 flex justify-end">
              <button className="inline-flex items-center px-3 py-1.5 bg-yellow-600 text-white rounded-md text-sm hover:bg-yellow-700">
                <ShoppingBag className="h-4 w-4 mr-1" />
                List Item
              </button>
            </div>
          </div>
        );

      case 'review':
        return (
          <div key={product.id} className={commonClasses}>
            <h4 className="font-medium">{product.name}</h4>
            <p className="text-sm text-gray-500 mb-2">{product.notes}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-yellow-600">{product.status}</span>
            </div>
            <div className="mt-3 flex justify-end">
              <button className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                Start Review
              </button>
            </div>
          </div>
        );

      case 'unusable':
        return (
          <div key={product.id} className={commonClasses}>
            <h4 className="font-medium">{product.name}</h4>
            <p className="text-sm text-red-600 mb-2">{product.issue}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Recommendation: {product.recommendation}
              </span>
            </div>
            <div className="mt-3 flex justify-end">
              <button className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded-md text-sm hover:bg-red-700">
                Process Disposal
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <TrendAnalysis />
      <IncomingShipments />

      {/* Return Categories Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Leaf className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Return Categories</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={filterStatus || ''}
                onChange={(e) => setFilterStatus(e.target.value || null)}
              >
                <option value="">All Status</option>
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <Filter className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {returnCategories.map((category) => (
            <div
              key={category.id}
              className={cn(
                'rounded-lg border p-4 cursor-pointer transition-all duration-300 hover:scale-105',
                getCategoryColor(category.color),
                selectedCategory === category.id && 'ring-2 ring-offset-2 ring-green-500'
              )}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <category.icon className="h-6 w-6" />
                <span className="text-2xl font-bold">{category.count}</span>
              </div>
              <h3 className="font-semibold mb-1">{category.label}</h3>
              <p className="text-sm opacity-75">{category.description}</p>
            </div>
          ))}
        </div>

        {/* Category Details */}
        {selectedCategory && categoryProducts[selectedCategory] && (
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {returnCategories.find((c) => c.id === selectedCategory)?.label}
              </h3>
              <div className="flex space-x-2">
                {selectedCategory === 'perfect' && (
                  <button className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Approve All
                  </button>
                )}
                {selectedCategory === 'minor' && (
                  <button className="inline-flex items-center px-3 py-1.5 bg-yellow-600 text-white rounded-md text-sm hover:bg-yellow-700">
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    List All
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryProducts[selectedCategory].map((product) => renderProductCard(product))}
            </div>
          </div>
        )}
      </div>

      {/* Product Images Modal */}
      <ReturnCategoriesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
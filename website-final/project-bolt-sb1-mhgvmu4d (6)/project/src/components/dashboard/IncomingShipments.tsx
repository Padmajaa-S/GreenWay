import React, { useState, useEffect } from 'react';
import { Search, Truck, Clock, Package } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Shipment {
  truckId: string;
  totalProducts: number;
  eta: string;
  isOverdue: boolean;
}

// Mock data generator
const generateMockShipments = (): Shipment[] => {
  const shipments: Shipment[] = [];
  const now = new Date();
  
  for (let i = 1; i <= 15; i++) {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const eta = new Date(now);
    eta.setHours(hours, minutes);
    
    const isOverdue = eta < now;
    
    shipments.push({
      truckId: `TR-${String(i).padStart(5, '0')}`,
      totalProducts: Math.floor(Math.random() * 200) + 50,
      eta: eta.toLocaleTimeString('en-US', { hour12: false }),
      isOverdue,
    });
  }
  
  return shipments.sort((a, b) => a.eta.localeCompare(b.eta));
};

export function IncomingShipments() {
  const [shipments, setShipments] = useState<Shipment[]>(generateMockShipments());
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setShipments(generateMockShipments());
    }, 5 * 60 * 1000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const filteredShipments = shipments.filter(shipment =>
    shipment.truckId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedShipments = filteredShipments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Incoming Shipments</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Truck ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Truck ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ETA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedShipments.map((shipment) => (
              <tr
                key={shipment.truckId}
                className={cn(
                  "hover:bg-gray-50 transition-colors",
                  shipment.isOverdue && "bg-red-50"
                )}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      {shipment.truckId}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      {shipment.totalProducts}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      {shipment.eta}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      shipment.isOverdue
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    )}
                  >
                    {shipment.isOverdue ? 'Overdue' : 'On Time'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={cn(
                "px-3 py-1 rounded-md text-sm font-medium",
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={cn(
                "px-3 py-1 rounded-md text-sm font-medium",
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
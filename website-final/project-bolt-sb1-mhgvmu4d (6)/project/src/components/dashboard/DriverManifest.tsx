import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Phone, 
  MapPin, 
  Clock, 
  Printer,
  Navigation,
  User,
  MapPinned,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Order {
  orderID: string;
  customerName: string;
  address: string;
  landmark: string;
  pincode: string;
  contactNumber: string;
  estimatedDeliveryTime: Date;
  lat: number;
  lng: number;
  distance?: number;
}

// Sample orders data with Chennai locations and coordinates
const initialOrders: Order[] =[
  {
    "orderID": "ORD-2024-003",
    "customerName": "Ananya Srinivasan",
    "address": "28, Gandhi Street, Mylapore",
    "landmark": "Near Kapaleeshwarar Temple",
    "pincode": "600004",
    "contactNumber": "+91 98765 43212",
    "estimatedDeliveryTime": new Date(2024, 1, 25, 12, 0),
    "lat": 13.0359,
    "lng": 80.2707
  },
  {
    "orderID": "ORD-2024-004",
    "customerName": "Rahul Menon",
    "address": "9, South Boag Road, T. Nagar",
    "landmark": "Near Pondy Bazaar",
    "pincode": "600017",
    "contactNumber": "+91 98765 43213",
    "estimatedDeliveryTime": new Date(2024, 1, 25, 13, 45),
    "lat": 13.0399,
    "lng": 80.2401
  },
  {
    "orderID": "ORD-2024-005",
    "customerName": "Sneha Iyer",
    "address": "12, 2nd Cross Street, Besant Nagar",
    "landmark": "Near Elliot's Beach",
    "pincode": "600090",
    "contactNumber": "+91 98765 43214",
    "estimatedDeliveryTime": new Date(2024, 1, 25, 14, 30),
    "lat": 12.9991,
    "lng": 80.2673
  },
  {
    "orderID": "ORD-2024-006",
    "customerName": "Vikram Rajendran",
    "address": "34, Velachery Main Road, Velachery",
    "landmark": "Near Phoenix MarketCity",
    "pincode": "600042",
    "contactNumber": "+91 98765 43215",
    "estimatedDeliveryTime": new Date(2024, 1, 25, 15, 15),
    "lat": 12.9791,
    "lng": 80.2200
  },
  {
    "orderID": "ORD-2024-007",
    "customerName": "Meera Krishnan",
    "address": "5, Anna Salai, Teynampet",
    "landmark": "Near LIC Building",
    "pincode": "600018",
    "contactNumber": "+91 98765 43216",
    "estimatedDeliveryTime": new Date(2024, 1, 25, 16, 0),
    "lat": 13.0367,
    "lng": 80.2507
  },
  {
    "orderID": "ORD-2024-008",
    "customerName": "Arjun Balaji",
    "address": "21, Greams Road, Thousand Lights",
    "landmark": "Near Apollo Hospitals",
    "pincode": "600006",
    "contactNumber": "+91 98765 43217",
    "estimatedDeliveryTime": new Date(2024, 1, 25, 17, 0),
    "lat": 13.0604,
    "lng": 80.2494
  },
  {
    "orderID": "ORD-2024-009",
    "customerName": "Divya Narayanan",
    "address": "7, Sardar Patel Road, Guindy",
    "landmark": "Near Raj Bhavan",
    "pincode": "600032",
    "contactNumber": "+91 98765 43218",
    "estimatedDeliveryTime": new Date(2024, 1, 25, 18, 0),
    "lat": 13.0100,
    "lng": 80.2200
  },
  {
    "orderID": "ORD-2024-010",
    "customerName": "Suresh Venkatesan",
    "address": "18, Cathedral Road, Gopalapuram",
    "landmark": "Near Santhome Cathedral",
    "pincode": "600086",
    "contactNumber": "+91 98765 43219",
    "estimatedDeliveryTime": new Date(2024, 1, 25, 19, 0),
    "lat": 13.0333,
    "lng": 80.2667
  }
];

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function DriverManifest() {
  // Mock driver's current location (Chennai Central)
  const driverLocation = { lat: 13.0827, lng: 80.2707 };
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [completedOrders, setCompletedOrders] = useState<string[]>([]);

  // Initialize orders with distances and sort by proximity
  useEffect(() => {
    const ordersWithDistance = initialOrders.map(order => ({
      ...order,
      distance: calculateDistance(
        driverLocation.lat,
        driverLocation.lng,
        order.lat,
        order.lng
      )
    }));

    const sortedOrders = ordersWithDistance.sort((a, b) => 
      (a.distance || 0) - (b.distance || 0)
    );

    setOrders(sortedOrders);
  }, []);

  const toggleOrder = (orderID: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderID) 
        ? prev.filter(id => id !== orderID)
        : [...prev, orderID]
    );
  };

  const handleMarkAsPickedUp = (orderID: string) => {
    // Add order to completed list
    setCompletedOrders(prev => [...prev, orderID]);
    
    // Remove order from active list and update sequence numbers
    setOrders(prev => {
      const updatedOrders = prev
        .filter(order => order.orderID !== orderID)
        .map((order, index) => ({
          ...order,
          distance: calculateDistance(
            driverLocation.lat,
            driverLocation.lng,
            order.lat,
            order.lng
          )
        }))
        .sort((a, b) => (a.distance || 0) - (b.distance || 0));

      return updatedOrders;
    });
  };

  const handlePrintManifest = () => {
    window.print();
  };

  const totalDistance = orders.reduce((acc, order) => acc + (order.distance || 0), 0).toFixed(1);
  const totalTime = `${Math.ceil(Number(totalDistance) / 30 * 60)} minutes`; // Assuming 30 km/h average speed

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">No Active Orders</h2>
        <p className="text-gray-500 mt-2">All orders have been completed</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in print:m-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Driver Manifest</h1>
          <p className="mt-1 text-sm text-gray-500">
            Optimized delivery route for {new Date().toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={handlePrintManifest}
          className="print:hidden inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Printer className="h-5 w-5 mr-2" />
          Print Manifest
        </button>
      </div>

      {/* Route Summary */}
      <div className="bg-white shadow rounded-lg p-6 print:border print:border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Navigation className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Total Distance</p>
              <p className="text-lg font-semibold">{totalDistance} km</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Estimated Duration</p>
              <p className="text-lg font-semibold">{totalTime}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPinned className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Remaining Stops</p>
              <p className="text-lg font-semibold">{orders.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white shadow rounded-lg overflow-hidden print:border print:border-gray-300">
        <div className="divide-y divide-gray-200">
          {orders.map((order, index) => (
            <div
              key={order.orderID}
              className={cn(
                "hover:bg-gray-50 transition-colors",
                index === 0 && "bg-green-50"
              )}
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleOrder(order.orderID)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {order.orderID}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Distance: {order.distance?.toFixed(1)} km
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {index === 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsPickedUp(order.orderID);
                        }}
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Mark as Picked Up
                      </button>
                    )}
                    {expandedOrders.includes(order.orderID) ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {expandedOrders.includes(order.orderID) && (
                <div className="px-6 pb-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <User className="h-5 w-5" />
                        <span>{order.customerName}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Phone className="h-5 w-5" />
                        <span>{order.contactNumber}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2 text-gray-600">
                        <MapPin className="h-5 w-5 mt-1" />
                        <div>
                          <p>{order.address}</p>
                          <p className="text-sm text-gray-500">
                            Near: {order.landmark}
                          </p>
                          <p className="text-sm text-gray-500">
                            Pincode: {order.pincode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
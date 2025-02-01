import React, { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";
import { FaArrowLeft, FaArrowRight, FaArrowUp, FaDotCircle, FaFlagCheckered, FaMapMarkerAlt } from "react-icons/fa";
import { useGeolocated } from "react-geolocated";
import { Car, CheckCircle, Clock, Fuel, HelpCircle, IndianRupee, Leaf, MapPin, Plus, Search } from 'lucide-react';
import { cn } from "../../lib/utils";

const saveAddressesToLocalStorage = (addresses: WarehouseAddress[]) => {
  localStorage.setItem("warehouseAddresses", JSON.stringify(addresses));
};

const loadAddressesFromLocalStorage = (): WarehouseAddress[] => {
  const storedAddresses = localStorage.getItem("warehouseAddresses");
  return storedAddresses ? JSON.parse(storedAddresses) : [];
};

interface ReturnOrder {
  id: string;
  productName: string;
  category: string;
  status: string;
}

interface WarehouseAddress {
  id: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
}

interface SelectedResult {
  display_name: string;
  lat: string;
  lon: string;
}

// Mock return order for testing
const mockReturnOrder: ReturnOrder = {
  id: "RET-001",
  productName: "Nike Air Max 270",
  category: "Electronics",
  status: "In Process"
};

const ReturnsRoute = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [route, setRoute] = useState<any>(null);
  const [distance, setDistance] = useState<number>(0);
  const [fuelConsumed, setFuelConsumed] = useState<number>(0);
  const [emissions, setEmissions] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [directions, setDirections] = useState<any[]>([]);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState<L.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [returnOrders, setReturnOrders] = useState<ReturnOrder[]>([mockReturnOrder]);
  const [warehouseAddresses, setWarehouseAddresses] = useState<WarehouseAddress[]>(() => loadAddressesFromLocalStorage());
  const [selectedSearchResult, setSelectedSearchResult] = useState<SelectedResult | null>(null);
  const [routeTimes, setRouteTimes] = useState<{ address: string; time: number }[]>([]);

  const fuelEfficiency = 15;
  const fuelPricePerLiter = 101.77;
  const emissionFactor = 2.3;

  useEffect(() => {
    if (coords) {
      setUserLocation({ lat: coords.latitude, lng: coords.longitude });
    }
  }, [coords]);

  useEffect(() => {
    saveAddressesToLocalStorage(warehouseAddresses);
  }, [warehouseAddresses]);

  useEffect(() => {
    if (map) map.remove();

    if (route && userLocation) {
      const newMap = L.map("map").setView([userLocation.lat, userLocation.lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors'
      }).addTo(newMap);

      L.marker([userLocation.lat, userLocation.lng])
        .addTo(newMap)
        .bindPopup("Your Location");

      if (route.length > 0) {
        const destination = route[route.length - 1];
        L.marker([destination[0], destination[1]])
          .addTo(newMap)
          .bindPopup("Destination");

        L.polyline(route, { color: "blue" }).addTo(newMap);
      }

      setMap(newMap);
    }
  }, [route, userLocation]);

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      setSearchResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Error searching for location");
    }
  };

  const handleLocationSelect = (result: any) => {
    setSelectedSearchResult({
      display_name: result.display_name,
      lat: result.lat,
      lon: result.lon
    });
    setSearchQuery(result.display_name);
    setShowResults(false);
  };

  const handleAddAddress = () => {
    if (!selectedSearchResult || !returnOrders.length) return;

    const newAddress: WarehouseAddress = {
      id: Date.now().toString(),
      category: returnOrders[0].category,
      address: selectedSearchResult.display_name,
      lat: parseFloat(selectedSearchResult.lat),
      lng: parseFloat(selectedSearchResult.lon)
    };

    setWarehouseAddresses([...warehouseAddresses, newAddress]);
    setSelectedSearchResult(null);
    setSearchQuery("");
  };

  const handleDeleteAddress = (id: string) => {
    setWarehouseAddresses(warehouseAddresses.filter(addr => addr.id !== id));
  };

  const getRoute = async () => {
    if (!userLocation || !returnOrders.length) {
      alert("Please enable location and select a destination first!");
      return;
    }

    const currentCategory = returnOrders[0].category;
    const categoryAddresses = warehouseAddresses.filter(addr => addr.category === currentCategory);

    if (categoryAddresses.length === 0) {
      alert("No warehouses available for this category. Please add addresses first.");
      return;
    }

    setLoading(true);
    try {
      let fastestRoute = null;
      let fastestDirections = null;
      let fastestTime = Infinity;
      let maximumDistance = 0;
      let fastestAddress = null;
      const times = [];

      for (const warehouse of categoryAddresses) {
        const graphhopperUrl = `https://graphhopper.com/api/1/route?point=${userLocation.lat},${userLocation.lng}&point=${warehouse.lat},${warehouse.lng}&vehicle=car&key=d379a0ee-7f6a-4b1d-a08e-6290f01869ed`;
        const response = await axios.get(graphhopperUrl);

        if (response.data.paths?.[0]?.points) {
          const totalTimeInSeconds = response.data.paths[0].time / 1000;
          times.push({ address: warehouse.address, time: totalTimeInSeconds });

          if (totalTimeInSeconds < fastestTime) {
            fastestTime = totalTimeInSeconds;
            fastestAddress = warehouse;
            fastestRoute = polyline.decode(response.data.paths[0].points).map(([lat, lng]: [number, number]) => [lat, lng]);
            fastestDirections = response.data.paths[0].instructions;
            maximumDistance = response.data.paths[0].distance;
          }
        }
      }

      setRouteTimes(times);
      if (fastestRoute) {
        setRoute(fastestRoute);
        setDistance(maximumDistance);
        setDirections(fastestDirections);
        setTotalTime(fastestTime);
        
        const fuelUsed = (maximumDistance / 1000 / fuelEfficiency).toFixed(2);
        setFuelConsumed(Number(fuelUsed));
        setCost(parseFloat((Number(fuelUsed) * fuelPricePerLiter).toFixed(2)));
        setEmissions(Number((Number(fuelUsed) * emissionFactor).toFixed(2)));
      }
    } catch (error) {
      console.error("Routing error:", error);
      alert("Error fetching route");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: <Clock />, name: "Time", data: `${(totalTime / 60).toFixed(2)} mins` },
    { icon: <MapPin />, name: "Distance", data: `${(distance / 1000).toFixed(2)} km` },
    { icon: <Car />, name: "Traffic", data: "Moderate" },
    { icon: <Fuel />, name: "Fuel", data: `${fuelConsumed}L` },
    { icon: <Leaf />, name: "Emissions", data: `${emissions} Kg` },
    { icon: <IndianRupee />, name: "Cost", data: `Rs. ${cost}` }
  ];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours > 0 ? `${hours} hr ` : ""}${minutes} min`;
  };

  const getDirectionIcon = (sign: number) => {
    switch (sign) {
      case -2: // Left
        return <FaArrowLeft className="text-blue-500" />;
      case 2: // Right
        return <FaArrowRight className="text-blue-500" />;
      case 0: // Straight
        return <FaArrowUp className="text-blue-500" />;
      case 4: // Arrive
        return <FaFlagCheckered className="text-green-500" />;
      case 6: // Roundabout
        return <FaDotCircle className="text-blue-500" />;
      default:
        return <FaMapMarkerAlt className="text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-500 shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-white">Return Orders</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {returnOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                        {
                          "bg-yellow-100 text-yellow-800": order.status === "In Process",
                          "bg-red-100 text-red-800": order.status === "Rejected",
                          "bg-green-100 text-green-800": order.status === "Completed",
                        }
                      )}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={getRoute}
                      disabled={loading || !userLocation || !returnOrders.length}
                      className="px-2 py-2 bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-400 rounded-3xl"
                    >
                      {loading ? "Calculating Route..." : "Get Directions"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 pt-5">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Add a warehouse destination..."
            className="w-full pl-10 pr-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {showResults && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
              {searchResults.map((result) => (
                <button
                  key={result.place_id}
                  onClick={() => handleLocationSelect(result)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{result.display_name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={searchLocation}
          className="px-4 py-2 bg-gray-200 text-black rounded-3xl hover:bg-blue-300 border-2 border-blue-600 flex items-center gap-2"
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </button>

        <button
          onClick={handleAddAddress}
          className="px-4 py-2 bg-gray-200 text-black rounded-3xl hover:bg-green-300 border-2 border-green-600 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Address</span>
        </button>
      </div>

      <div className="bg-blue-500 shadow rounded-lg mt-6">
        <div className="px-6 py-5 border-b border-white">
          <h3 className="text-lg font-medium leading-6 text-white">
            Warehouse Addresses ({returnOrders[0]?.category || 'Selected Category'})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide divide-black table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coordinates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {warehouseAddresses
                .filter(addr => addr.category === returnOrders[0]?.category)
                .map((address) => {
                  const routeTime = routeTimes.find(rt => rt.address === address.address)?.time;
                  const isFastest = routeTime === Math.min(...routeTimes.map(rt => rt.time));

                  return (
                    <tr key={address.id} className={isFastest ? "bg-green-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-hidden overflow-ellipsis w-48">
                        {address.address.split(",")[0]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {address.lat.toFixed(4)}, {address.lng.toFixed(4)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {routeTime ? (
                          <div className="flex items-center gap-2">
                            {isFastest && <CheckCircle className="w-4 h-4 text-green-600" />}
                            <span>{formatTime(routeTime)}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">Not calculated</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Route Planner</h1>

        <div className="flex gap-4 overflow-auto p-4 justify-center">
          {stats.map((item, index) => (
            <div key={index} className="w-32 flex flex-col items-center rounded-lg overflow-hidden shadow-md border-green-800 relative group">
              <div className="bg-green-200 w-full flex flex-col items-center justify-center p-3 border-green-800 border-b-4">
                <div className="text-xl">{item.icon}</div>
                <span className="font-semibold">{item.name}</span>
                {item.name === "Cost" && (
                  <div className="absolute top-2 right-2">
                    <HelpCircle className="text-lg text-yellow-600 cursor-pointer" />
                    <div className="absolute top-0 right-10 hidden group-hover:block bg-white text-black p-2 rounded-md shadow-lg">
                      <span>This is the cost information</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white w-full text-center p-2 font-bold">{item.data}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-2">
          <div className="flex gap-2">
            {!isGeolocationAvailable ? (
              <div className="px-4 py-2 bg-red-500 text-white rounded-md">
                Geolocation is not supported by your browser.
              </div>
            ) : !isGeolocationEnabled ? (
              <div className="px-4 py-2 bg-yellow-500 text-white rounded-md">
                Location is not enabled. Please enable it in your browser settings.
              </div>
            ) : <div></div>}
          </div>
        </div>

        {totalTime > 0 && (
          <div className="mb-6 bg-white rounded-lg shadow-md">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-4 flex justify-between items-center hover:bg-gray-50 rounded-lg"
            >
              <h2 className="text-lg font-semibold">
                🕒 Most Optimised Route: {formatTime(totalTime)}
              </h2>
              <svg
                className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="p-4 border-t">
                <h2 className="text-xl font-semibold mb-3">Turn-by-Turn Directions</h2>
                <div className="space-y-3">
                  {directions.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 flex items-center justify-center bg-white border rounded-full">
                        {getDirectionIcon(step.sign)}
                      </div>
                      <div>
                        <p className="font-medium">{step.text}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Distance: {(step.distance / 1000).toFixed(2)} km
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div id="map" className="w-full h-96 rounded-lg border-2 border-gray-200"></div>

        <div className="mt-4 text-sm text-gray-500">
          Mapping data © OpenStreetMap contributors, Routing via GraphHopper API
        </div>
      </div>
    </div>
  );
};

export default ReturnsRoute;
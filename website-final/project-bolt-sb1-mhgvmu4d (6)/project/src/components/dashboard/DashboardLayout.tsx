import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PackageSearch,
  BarChart3,
  Settings as SettingsIcon,
  LogOut,
  Box,
  Users,
  RefreshCw,
  ShoppingBag,
  Navigation,
  FileText,
  Calculator,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { cn } from '../../lib/utils';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const role = useAuthStore((state) => state.role);
  const setUser = useAuthStore((state) => state.setUser);
  const setRole = useAuthStore((state) => state.setRole);
  const [expandedMenus, setExpandedMenus] = React.useState<string[]>([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setRole(null);
    navigate('/login');
  };

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    ...(role !== 'admin' ? [{ icon: PackageSearch, label: 'Returns', path: '/dashboard/returns' }] : []),
    ...(role === 'customer' ? [{ icon: ShoppingBag, label: 'Marketplace', path: '/dashboard/marketplace' }] : []),
    ...(role === 'warehouse' ? [
      { icon: Navigation, label: 'Returns Route', path: '/dashboard/returns-route' },
      { icon: FileText, label: 'Driver Manifest', path: '/dashboard/driver-manifest' }
    ] : []),
    ...(role === 'admin' ? [
      { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
      {
        icon: Calculator,
        label: 'Cost Analysis',
        id: 'cost-analysis',
        subItems: [
          { label: 'Cost Breakdown', path: '/dashboard/cost-analysis/breakdown' },
          { label: 'Revenue & Savings', path: '/dashboard/cost-analysis/revenue' },
          { label: 'ROI Analysis', path: '/dashboard/cost-analysis/roi' },
        ]
      }
    ] : []),
    { icon: SettingsIcon, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img 
                  src="/GreenWay.png" 
                  alt="GreenWay Logo" 
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-xl font-bold text-gray-900">GreenWay</span>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 pt-5 pb-4 flex flex-col">
          <div className="flex-grow px-4">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => toggleMenu(item.id)}
                        className={cn(
                          "w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                          expandedMenus.includes(item.id)
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        <span className="flex-1">{item.label}</span>
                        {expandedMenus.includes(item.id) ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </button>
                      {expandedMenus.includes(item.id) && (
                        <div className="ml-8 space-y-1 mt-1">
                          {item.subItems.map((subItem) => (
                            <NavLink
                              key={subItem.path}
                              to={subItem.path}
                              className={({ isActive }) =>
                                cn(
                                  "block px-2 py-2 text-sm font-medium rounded-md",
                                  isActive
                                    ? "text-indigo-600 bg-indigo-50"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )
                              }
                            >
                              {subItem.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                          isActive
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )
                      }
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Logged in as</p>
                <p className="text-xs font-medium text-gray-500 capitalize">{role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
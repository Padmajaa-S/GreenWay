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
      ListOrdered,
    } from 'lucide-react';
    import { useAuthStore } from '../../store/auth';
    import { cn } from '../../lib/utils';

    export function DashboardLayout({ children }: { children: React.ReactNode }) {
      const role = useAuthStore((state) => state.role);
      const setUser = useAuthStore((state) => state.setUser);
      const setRole = useAuthStore((state) => state.setRole);
      const navigate = useNavigate();

      const handleLogout = () => {
        setUser(null);
        setRole(null);
        navigate('/login');
      };

      const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: PackageSearch, label: 'Returns', path: '/dashboard/returns' },
        ...(role === 'customer' ? [{ icon: ShoppingBag, label: 'Marketplace', path: '/dashboard/marketplace' }] : []),
        ...(role === 'customer' ? [{ icon: ListOrdered, label: 'Orders', path: '/dashboard/orders' }] : []),
        ...(role === 'admin' ? [{ icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' }] : []),
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
                    <RefreshCw className="h-8 w-8 text-indigo-600" />
                    <span className="ml-2 text-xl font-bold text-gray-900">Returns Platform</span>
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
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        cn(
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                          isActive
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        )
                      }
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </NavLink>
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

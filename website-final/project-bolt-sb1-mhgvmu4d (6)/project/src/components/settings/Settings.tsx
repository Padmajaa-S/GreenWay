import React from 'react';
import {
  Bell,
  Mail,
  Shield,
  Truck,
  Warehouse,
  DollarSign,
  Settings as SettingsIcon,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function Settings() {
  const settingSections = [
    {
      title: 'Notifications',
      icon: Bell,
      description: 'Manage how you receive notifications and alerts',
      settings: [
        { name: 'Email Notifications', enabled: true },
        { name: 'Push Notifications', enabled: false },
        { name: 'SMS Alerts', enabled: true },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      description: 'Update your security preferences and authentication methods',
      settings: [
        { name: 'Two-Factor Authentication', enabled: true },
        { name: 'Login History', enabled: true },
        { name: 'API Access', enabled: false },
      ],
    },
    {
      title: 'Shipping',
      icon: Truck,
      description: 'Configure shipping and return label settings',
      settings: [
        { name: 'Auto-generate Labels', enabled: true },
        { name: 'Preferred Carrier', enabled: true },
        { name: 'Return Address', enabled: true },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        {settingSections.map((section) => (
          <div key={section.title} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <section.icon className="h-5 w-5 text-gray-400" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">{section.title}</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">{section.description}</p>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                {section.settings.map((setting) => (
                  <div
                    key={setting.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {setting.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      className={cn(
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
                        setting.enabled ? 'bg-indigo-600' : 'bg-gray-200'
                      )}
                    >
                      <span
                        className={cn(
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                          setting.enabled ? 'translate-x-5' : 'translate-x-0'
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
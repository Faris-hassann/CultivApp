import React from 'react';
import { Link } from 'wouter';
import { 
  ArrowLeftIcon, 
  UserIcon, 
  CogIcon, 
  BellIcon,
  ChartBarIcon,
  DocumentTextIcon,
  TruckIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  // Mock data - in a real app, this would come from your backend
  const user = {
    name: 'Ahmed Al-Rashid',
    email: 'ahmed@company.com',
    company: 'Tech Solutions Ltd.',
    avatar: null
  };

  const stats = [
    { title: 'Active Projects', value: '12', change: '+2', icon: ChartBarIcon, color: 'text-blue-600' },
    { title: 'Documents Pending', value: '5', change: '-1', icon: DocumentTextIcon, color: 'text-orange-600' },
    { title: 'Shipments', value: '8', change: '+3', icon: TruckIcon, color: 'text-green-600' },
    { title: 'Services Used', value: '15', change: '+1', icon: BuildingOfficeIcon, color: 'text-purple-600' }
  ];

  const recentActivities = [
    { type: 'document', message: 'Business registration approved', time: '2 hours ago', status: 'completed' },
    { type: 'shipment', message: 'Customs clearance completed', time: '1 day ago', status: 'completed' },
    { type: 'service', message: 'Visa application submitted', time: '2 days ago', status: 'pending' },
    { type: 'document', message: 'Document translation requested', time: '3 days ago', status: 'in-progress' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-modern">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg border-2 border-white">
                <span className="text-white font-bold text-lg tracking-wider">R</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gradient">Rwafi</span>
                <span className="text-xs text-muted-foreground">Dashboard</span>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <BellIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <CogIcon className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.company}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-modern py-8">
        {/* Back to Home */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Here's what's happening with your logistics operations today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.status === 'completed' ? 'bg-green-100' : 
                      activity.status === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      {activity.type === 'document' && <DocumentTextIcon className="w-5 h-5 text-gray-600" />}
                      {activity.type === 'shipment' && <TruckIcon className="w-5 h-5 text-gray-600" />}
                      {activity.type === 'service' && <BuildingOfficeIcon className="w-5 h-5 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.message}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/services" className="block w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <BuildingOfficeIcon className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Request New Service</span>
                  </div>
                </Link>
                <Link href="/documents" className="block w-full p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <DocumentTextIcon className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Upload Documents</span>
                  </div>
                </Link>
                <Link href="/tracking" className="block w-full p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <TruckIcon className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Track Shipments</span>
                  </div>
                </Link>
                <Link href="/support" className="block w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <CogIcon className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Get Support</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Account Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Company</span>
                  <span className="font-medium">{user.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">March 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Status</span>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
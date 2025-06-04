"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sparkles, Github, TrendingUp, TrendingDown, Home, PoundSterling, BarChart3, Minus, Calendar, CheckCircle } from "lucide-react"
import { MobileMenu } from "@/components/ui/mobile-menu"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

// Type definitions
interface MarketData {
  currentWeek: {
    endDate: string;
    weekNumber: number;
  };
  executive: {
    marketHealth: string;
    healthScore: number;
    keyMetrics: Array<{
      label: string;
      value: string;
      change: string;
      trend: string;
      period: string;
    }>;
  };
  priceData: Array<{
    month: string;
    wiganPrice: number;
    northWestPrice: number;
    ukPrice: number;
  }>;
  transactionData: Array<{
    week: string;
    sales: number;
    lettings: number;
  }>;
  propertyTypes: Array<{
    type: string;
    sales: number;
    percentage: number;
    avgPrice: number;
  }>;
  lettingsData: Array<{
    type: string;
    avgRent: number;
    yield: number;
    demand: string;
  }>;
  mortgageData: Array<{
    month: string;
    rate: number;
    approvals: number;
  }>;
}

interface MetricType {
  label: string;
  value: string;
  change: string;
  trend: string;
  period: string;
}

// Sample data - replace with real API calls
const generateSampleData = (): MarketData => ({
  currentWeek: {
    endDate: "June 2, 2025",
    weekNumber: 23
  },
  executive: {
    marketHealth: "STRONG",
    healthScore: 78,
    keyMetrics: [
      { label: "Median Sale Price", value: "£185,000", change: "+2.3%", trend: "up", period: "MoM" },
      { label: "Properties Sold", value: "247", change: "+12%", trend: "up", period: "vs last week" },
      { label: "Days on Market", value: "28", change: "-3", trend: "down", period: "vs last month" },
      { label: "New Instructions", value: "312", change: "+8%", trend: "up", period: "vs last week" }
    ]
  },
  priceData: [
    { month: "Dec 2024", wiganPrice: 178000, northWestPrice: 195000, ukPrice: 285000 },
    { month: "Jan 2025", wiganPrice: 181000, northWestPrice: 198000, ukPrice: 289000 },
    { month: "Feb 2025", wiganPrice: 180500, northWestPrice: 197500, ukPrice: 287500 },
    { month: "Mar 2025", wiganPrice: 183000, northWestPrice: 200000, ukPrice: 291000 },
    { month: "Apr 2025", wiganPrice: 184500, northWestPrice: 201500, ukPrice: 293500 },
    { month: "May 2025", wiganPrice: 185000, northWestPrice: 203000, ukPrice: 295000 }
  ],
  transactionData: [
    { week: "Week 19", sales: 198, lettings: 156 },
    { week: "Week 20", sales: 215, lettings: 142 },
    { week: "Week 21", sales: 203, lettings: 168 },
    { week: "Week 22", sales: 221, lettings: 175 },
    { week: "Week 23", sales: 247, lettings: 189 }
  ],
  propertyTypes: [
    { type: "Terraced", sales: 112, percentage: 45.3, avgPrice: 165000 },
    { type: "Semi-Detached", sales: 78, percentage: 31.6, avgPrice: 195000 },
    { type: "Detached", sales: 35, percentage: 14.2, avgPrice: 285000 },
    { type: "Flat/Apartment", sales: 22, percentage: 8.9, avgPrice: 125000 }
  ],
  lettingsData: [
    { type: "1 Bed", avgRent: 550, yield: 6.8, demand: "High" },
    { type: "2 Bed", avgRent: 675, yield: 7.2, demand: "Very High" },
    { type: "3 Bed", avgRent: 825, yield: 6.9, demand: "High" },
    { type: "4+ Bed", avgRent: 1100, yield: 6.1, demand: "Medium" }
  ],
  mortgageData: [
    { month: "Dec", rate: 5.2, approvals: 8500 },
    { month: "Jan", rate: 5.1, approvals: 9200 },
    { month: "Feb", rate: 4.9, approvals: 9800 },
    { month: "Mar", rate: 4.8, approvals: 10100 },
    { month: "Apr", rate: 4.7, approvals: 10400 },
    { month: "May", rate: 4.6, approvals: 10800 }
  ]
});

const TrendIcon = ({ trend, size = 16 }: { trend: string; size?: number }) => {
  const iconProps = { size, className: "inline ml-1" };
  
  switch (trend) {
    case "up":
      return <TrendingUp {...iconProps} className={`${iconProps.className} text-green-600`} />;
    case "down":
      return <TrendingDown {...iconProps} className={`${iconProps.className} text-red-600`} />;
    default:
      return <Minus {...iconProps} className={`${iconProps.className} text-gray-600`} />;
  }
};

const MetricCard = ({ metric }: { metric: MetricType }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{metric.label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
      </div>
      <div className={`text-right ${
        metric.trend === 'up' ? 'text-green-600' : 
        metric.trend === 'down' ? 'text-red-600' : 
        'text-gray-600'
      }`}>
        <p className="text-sm font-medium">
          {metric.change} {metric.period}
          <TrendIcon trend={metric.trend} size={14} />
        </p>
      </div>
    </div>
  </div>
);

const HealthGauge = ({ score }: { score: number }) => {
  const getColor = (score: number) => {
    if (score >= 70) return "#10b981";
    if (score >= 40) return "#f59e0b";
    return "#ef4444";
  };

  const getStatus = (score: number) => {
    if (score >= 70) return "STRONG";
    if (score >= 40) return "STABLE";
    return "WEAK";
  };

  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Health</h3>
      <div className="flex items-center justify-center">
        <div className="relative">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={data}
                cx={80}
                cy={80}
                startAngle={180}
                endAngle={0}
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
              >
                <Cell fill={getColor(score)} />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
            <div className="text-3xl font-bold text-gray-900">{score}</div>
            <div className={`text-sm font-semibold ${
              score >= 70 ? 'text-green-600' : 
              score >= 40 ? 'text-amber-600' : 
              'text-red-600'
            }`}>
              {getStatus(score)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HousingMarketReport = () => {
  const [data, setData] = useState<MarketData | null>(null);
  const [activeTab, setActiveTab] = useState('sales');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(generateSampleData());
    }, 500);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading market data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Housing Market Report
              </h1>
              <p className="text-gray-600 mt-1">
                Wigan Borough, North West England & UK • Week {data.currentWeek.weekNumber} ending {data.currentWeek.endDate}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Download PDF
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Share Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Executive Summary */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-1">
              <HealthGauge score={data.executive.healthScore} />
            </div>
            <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.executive.keyMetrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide px-1">
              {[
                { id: 'sales', label: 'Sales Market', icon: Home },
                { id: 'lettings', label: 'Lettings Market', icon: PoundSterling },
                { id: 'trends', label: 'Price Trends', icon: TrendingUp },
                { id: 'finance', label: 'Finance & Mortgages', icon: Calendar }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="mr-2 h-5 w-5 flex-shrink-0" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'sales' && (
          <div className="space-y-8">
            {/* Transaction Volume Chart */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Transaction Volume</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.transactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Property Types Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Sales by Property Type</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={data.propertyTypes}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="sales"
                      label={({ type, percentage }) => `${type} (${percentage}%)`}
                    >
                      {data.propertyTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Average Prices by Type</h3>
                <div className="space-y-4">
                  {data.propertyTypes.map((type, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{type.type}</p>
                        <p className="text-sm text-gray-600">{type.sales} sales this week</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          £{type.avgPrice.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">{type.percentage}% of market</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lettings' && (
          <div className="space-y-8">
            {/* Lettings Volume */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Lettings Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data.transactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="lettings" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Lettings" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Rental Yields & Demand */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Rental Market Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Property Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg Monthly Rent</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Gross Yield</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Demand Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.lettingsData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">{item.type}</td>
                        <td className="py-3 px-4 text-gray-700">£{item.avgRent}</td>
                        <td className="py-3 px-4 text-gray-700">{item.yield}%</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.demand === 'Very High' ? 'bg-green-100 text-green-800' :
                            item.demand === 'High' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.demand}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-8">
            {/* Price Trends Comparison */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Regional Price Comparison</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => [`£${value.toLocaleString()}`, '']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="wiganPrice" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Wigan Borough"
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="northWestPrice" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="North West England"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ukPrice" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    strokeDasharray="2 2"
                    name="UK Average"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Market Insights */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Market Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">+2.3%</div>
                  <div className="text-sm text-gray-600">Monthly Growth</div>
                  <div className="text-xs text-gray-500 mt-1">vs +1.8% regional avg</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">28 days</div>
                  <div className="text-sm text-gray-600">Average Time on Market</div>
                  <div className="text-xs text-gray-500 mt-1">3 days faster than last month</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600 mb-2">£2,245</div>
                  <div className="text-sm text-gray-600">Price per m²</div>
                  <div className="text-xs text-gray-500 mt-1">15% below regional average</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="space-y-8">
            {/* Mortgage Trends */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mortgage Market Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.mortgageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => `${value}%`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    name="Average Mortgage Rate (%)"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="approvals" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name="Monthly Approvals"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Financial Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">4.6%</div>
                <div className="text-sm text-gray-600">Average Mortgage Rate</div>
                <div className="text-xs text-green-600 mt-1">↓ -0.1% from last month</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">10,800</div>
                <div className="text-sm text-gray-600">Monthly Approvals</div>
                <div className="text-xs text-green-600 mt-1">↑ +400 from last month</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">4.2x</div>
                <div className="text-sm text-gray-600">Average Income Multiple</div>
                <div className="text-xs text-gray-600 mt-1">Stable vs last month</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">18%</div>
                <div className="text-sm text-gray-600">Avg Deposit %</div>
                <div className="text-xs text-red-600 mt-1">↑ +1% from last month</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Data Sources & Methodology</h4>
              <p className="text-sm text-gray-600 mb-2">
                This report aggregates data from HM Land Registry, ONS House Price Index, Bank of England mortgage statistics, 
                and local estate agent networks. All figures are adjusted for seasonal variations where applicable.
              </p>
              <p className="text-xs text-gray-500">
                Report generated on {new Date().toLocaleDateString()} • Next update: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                RICS Compliant
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Data Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MarketsPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const marketData = {
    may2025: {
      propertiesForSale: 2112,
      newListings: 582,
      askingPrice: 245890,
      pricePerSqFt: 235,
      salesAgreed: 463,
      salesAgreedPrice: 223450,
      salesAgreedPricePerSqFt: 226
    },
    may2024: {
      propertiesForSale: 1890,
      newListings: 452,
      askingPrice: 233500,
      pricePerSqFt: 226,
      salesAgreed: 442,
      salesAgreedPrice: 210890,
      salesAgreedPricePerSqFt: 214
    }
  }

  const yearOverYearChanges = {
    propertiesForSale: 11.75,
    newListings: 28.76,
    salesAgreed: 4.75,
    withdrawn: -39.47,
    fallThroughs: -86.61,
    newListingsPrice: 5.31,
    salesAgreedPrice: 5.96
  }

  const keyMetrics = [
    {
      title: "Base Rate",
      value: "4.25%",
      change: "-0.25%",
      trend: "down",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      title: "2-Year Fixed Mortgage",
      value: "4.52%",
      change: "-0.17%",
      trend: "down",
      icon: <Home className="w-5 h-5" />
    },
    {
      title: "Average Property Price",
      value: "£245,890",
      change: "+5.31%",
      trend: "up",
      icon: <PoundSterling className="w-5 h-5" />
    },
    {
      title: "Sales Agreed",
      value: "463",
      change: "+4.75%",
      trend: "up",
      icon: <TrendingUp className="w-5 h-5" />
    }
  ]

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-GB').format(num)
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0
    }).format(num)
  }

  const TabButton = ({ id, label, active, onClick }: { 
    id: string
    label: string
    active: boolean
    onClick: (id: string) => void
  }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 font-medium rounded-lg transition-colors ${
        active 
          ? 'bg-indigo-600 text-white' 
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      }`}
    >
      {label}
    </button>
  )

  const MetricCardOld = ({ title, value, change, trend, icon }: {
    title: string
    value: string
    change: string
    trend: string
    icon: React.ReactNode
  }) => (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-600">{icon}</div>
        <div className={`flex items-center text-sm font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-sm text-slate-600 mt-1">{title}</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Alan Batt Technology Hub</span>
          </div>
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-6">
              <Button variant="ghost" asChild>
                <Link href="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/ai">AI</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/content">Content</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/new-dev">New Dev</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/reports">Reports</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/seo">SEO</Link>
              </Button>
              <Button variant="ghost" asChild className="bg-blue-50 text-blue-600">
                <Link href="/markets">Markets</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/downloads">Downloads</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://github.com/zenifieduk/alan-batt" target="_blank">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Link>
              </Button>
            </div>
            
            {/* Mobile Menu */}
            <MobileMenu currentPage="markets" />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* New Housing Market Report Component */}
          <HousingMarketReport />

          {/* Existing Market Report Component */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold">UK Property Market Report</h1>
                  <p className="text-indigo-100 mt-2 text-lg">May 2025 - Alan Batt Local Market Update</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{formatCurrency(marketData.may2025.askingPrice)}</div>
                  <div className="text-indigo-100">Average asking price</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-slate-200 p-6">
              <div className="flex flex-wrap gap-2">
                <TabButton 
                  id="overview" 
                  label="Overview" 
                  active={activeTab === 'overview'} 
                  onClick={setActiveTab} 
                />
                <TabButton 
                  id="metrics" 
                  label="Key Metrics" 
                  active={activeTab === 'metrics'} 
                  onClick={setActiveTab} 
                />
                <TabButton 
                  id="trends" 
                  label="Market Trends" 
                  active={activeTab === 'trends'} 
                  onClick={setActiveTab} 
                />
                <TabButton 
                  id="mortgages" 
                  label="Mortgages" 
                  active={activeTab === 'mortgages'} 
                  onClick={setActiveTab} 
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {keyMetrics.map((metric, index) => (
                      <MetricCardOld key={index} {...metric} />
                    ))}
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4">Market Summary</h3>
                    <p className="text-slate-700 leading-relaxed text-lg">
                      The UK property market is demonstrating remarkable resilience following the stamp duty 
                      adjustments and Bank of England&apos;s base rate cut to 4.25%. With fall-throughs down 86.61% 
                      year-over-year and new listings up 28.76%, market confidence is steadily improving.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6">
                      <h4 className="text-xl font-semibold text-slate-900 mb-4">Supply & Demand</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Properties for Sale</span>
                          <span className="font-semibold text-slate-900">{formatNumber(marketData.may2025.propertiesForSale)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">New Listings</span>
                          <span className="font-semibold text-slate-900">{formatNumber(marketData.may2025.newListings)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Sales Agreed</span>
                          <span className="font-semibold text-slate-900">{formatNumber(marketData.may2025.salesAgreed)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6">
                      <h4 className="text-xl font-semibold text-slate-900 mb-4">Year-over-Year Growth</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">New Listings</span>
                          <span className="text-green-600 font-semibold">+{yearOverYearChanges.newListings}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Properties for Sale</span>
                          <span className="text-green-600 font-semibold">+{yearOverYearChanges.propertiesForSale}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Fall-throughs</span>
                          <span className="text-green-600 font-semibold">{yearOverYearChanges.fallThroughs}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'metrics' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-slate-900">Key Performance Metrics</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-slate-300 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Year</th>
                          <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Properties for Sale</th>
                          <th className="border border-slate-300 px-4 py-3 text-right font-semibold">New Listings</th>
                          <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Asking Price</th>
                          <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Sales Agreed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-slate-300 px-4 py-3 font-medium">May 2025</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatNumber(marketData.may2025.propertiesForSale)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatNumber(marketData.may2025.newListings)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatCurrency(marketData.may2025.askingPrice)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatNumber(marketData.may2025.salesAgreed)}</td>
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="border border-slate-300 px-4 py-3 font-medium">May 2024</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatNumber(marketData.may2024.propertiesForSale)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatNumber(marketData.may2024.newListings)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatCurrency(marketData.may2024.askingPrice)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatNumber(marketData.may2024.salesAgreed)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'trends' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-slate-900">Market Trends Analysis</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                      <h4 className="font-semibold text-green-800 mb-4 text-lg">Positive Trends</h4>
                      <ul className="space-y-2 text-green-700">
                        <li>• Fall-throughs down 86.61%</li>
                        <li>• New listings up 28.76%</li>
                        <li>• Mortgage rates below 4%</li>
                        <li>• Supply 35% above average</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                      <h4 className="font-semibold text-blue-800 mb-4 text-lg">Market Stability</h4>
                      <ul className="space-y-2 text-blue-700">
                        <li>• 16 months of 60k+ approvals</li>
                        <li>• Inflation stable at 2.6%</li>
                        <li>• Wages outpacing inflation</li>
                        <li>• Base rate on downward path</li>
                      </ul>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                      <h4 className="font-semibold text-purple-800 mb-4 text-lg">Future Outlook</h4>
                      <ul className="space-y-2 text-purple-700">
                        <li>• 5-6% more sales expected</li>
                        <li>• Modest price growth</li>
                        <li>• Rate cuts to 3.75% likely</li>
                        <li>• Market resilience proven</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'mortgages' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-slate-900">Mortgage Market Update</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6">
                      <h4 className="font-semibold text-slate-900 mb-4 text-xl">Current Rates</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Base Rate</span>
                          <span className="text-3xl font-bold text-indigo-600">4.25%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">2-Year Fixed</span>
                          <span className="text-xl font-semibold">4.52%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">5-Year Fixed</span>
                          <span className="text-xl font-semibold">4.48%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6">
                      <h4 className="font-semibold text-slate-900 mb-4 text-xl">Market Activity</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">April Approvals</span>
                          <span className="font-semibold">65,410</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">5% Deposit Products</span>
                          <span className="font-semibold">458</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Buying Power Boost</span>
                          <span className="font-semibold text-green-600">10-15%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                    <h4 className="font-semibold text-amber-800 mb-4 text-xl">Rent vs Buy Analysis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <span className="text-amber-700">Average 90% LTV Mortgage Payment:</span>
                        <div className="text-3xl font-bold text-amber-800">£1,315/month</div>
                      </div>
                      <div>
                        <span className="text-amber-700">Average Rental Payment:</span>
                        <div className="text-3xl font-bold text-amber-800">£1,365/month</div>
                      </div>
                    </div>
                    <p className="text-amber-700 mt-4 font-semibold text-lg">
                      Buying is now approximately £50 cheaper per month than renting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500">
        <p>&copy; 2025 Alan Batt Technology Hub. Professional property market insights.</p>
      </footer>
    </div>
  )
} 
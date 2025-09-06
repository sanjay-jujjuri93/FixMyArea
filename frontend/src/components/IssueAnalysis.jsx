import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#06b6d4", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#6366f1"];

const IssueAnalysis = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('pie');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(
          "https://fixmyarea-backend-6enz.onrender.com/api/complaints/public"
        );
        setComplaints(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  // Count complaints by category
  const categoryCounts = {};
  complaints.forEach((complaint) => {
    const category = complaint.category || "Other";
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  // Convert to array and sort by count (descending)
  const sortedEntries = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a);
  
  // Take top 5 categories, group the rest as "Other"
  const topCategories = sortedEntries.slice(0, 5);
  const otherCategories = sortedEntries.slice(5);
  
  let data = topCategories.map(([name, value]) => ({ name, value }));
  
  if (otherCategories.length > 0) {
    const otherTotal = otherCategories.reduce((sum, [, count]) => sum + count, 0);
    data.push({ name: "Other", value: otherTotal });
  }

  return (
    <section id="issue-analysis" className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 shadow-2xl">
            <span className="text-cyan-400 font-semibold">📊 Issue Categories</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Issue
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Analysis</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Visual breakdown of community issues by category to help prioritize solutions
          </p>
        </div>

        {/* Chart Container */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl">
          {/* View Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
              <button
                onClick={() => setViewMode('pie')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  viewMode === 'pie'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                📊 Pie Chart
              </button>
              <button
                onClick={() => setViewMode('bar')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  viewMode === 'bar'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                📈 Bar Chart
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="h-96 relative">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'pie' ? (
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    innerRadius={60}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    isAnimationActive={true}
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                        stroke="#fff"
                        strokeWidth={3}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    formatter={(value) => (
                      <span className="text-white font-semibold">
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              ) : (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'white', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                  />
                  <YAxis 
                    tick={{ fill: 'white', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="url(#colorGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl text-center">
            <div className="text-4xl font-black text-white mb-2">{complaints.length}</div>
            <div className="text-white/70">Total Issues</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl text-center">
            <div className="text-4xl font-black text-white mb-2">{Object.keys(categoryCounts).length}</div>
            <div className="text-white/70">Categories</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl text-center">
            <div className="text-4xl font-black text-white mb-2">{data.length > 0 ? data[0].name : 'N/A'}</div>
            <div className="text-white/70">Top Category</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl text-center">
            <div className="text-4xl font-black text-white mb-2">AI</div>
            <div className="text-white/70">Powered</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IssueAnalysis;

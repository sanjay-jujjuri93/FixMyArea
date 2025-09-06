import React, { useState, useEffect } from "react";
import axios from "axios";

// Enhanced Progress Bar with Glow Effect
const ProgressBar = ({ value, color, glowColor }) => (
  <div className="relative w-full bg-gray-800/20 rounded-full h-4 mb-4 overflow-hidden backdrop-blur-sm">
    <div
      className="h-full rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
      style={{
        width: `${value}%`,
        background: `linear-gradient(90deg, ${color}, ${glowColor})`,
        boxShadow: `0 0 20px ${glowColor}40`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
    </div>
  </div>
);

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return count;
};

const Stats = () => {
  const [counts, setCounts] = useState({
    solved: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(
          "https://fixmyarea-backend-6enz.onrender.com/api/complaints/public"
        );
        const complaints = res.data;

        const solved = complaints.filter((c) => c.status === "Resolved").length;
        const pending = complaints.filter((c) => c.status !== "Resolved").length;

        setCounts({ solved, pending });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching complaint counts:", error);
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const total = counts.solved + counts.pending;
  const solvedPercent = total ? Math.round((counts.solved / total) * 100) : 0;
  const pendingPercent = total ? Math.round((counts.pending / total) * 100) : 0;

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6 shadow-2xl">
            <span className="text-cyan-400 font-semibold">📊 Community Stats</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Progress
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Overview</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            See how our community is making a difference together
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Solved Issues Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-3xl">✅</span>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-white mb-1">
                    {loading ? "..." : <AnimatedCounter target={counts.solved} />}
                  </div>
                  <div className="text-emerald-400 font-semibold">Resolved</div>
                </div>
              </div>
              <ProgressBar value={solvedPercent} color="#10b981" glowColor="#34d399" />
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Success Rate</span>
                <span className="text-emerald-400 font-bold">{solvedPercent}%</span>
              </div>
            </div>
          </div>

          {/* Pending Issues Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-3xl">⏰</span>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-white mb-1">
                    {loading ? "..." : <AnimatedCounter target={counts.pending} />}
                  </div>
                  <div className="text-orange-400 font-semibold">In Progress</div>
                </div>
              </div>
              <ProgressBar value={pendingPercent} color="#f97316" glowColor="#fb923c" />
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Pending Rate</span>
                <span className="text-orange-400 font-bold">{pendingPercent}%</span>
              </div>
            </div>
          </div>

          {/* Total Reports Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-3xl">📋</span>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-white mb-1">
                    {loading ? "..." : <AnimatedCounter target={total} />}
                  </div>
                  <div className="text-blue-400 font-semibold">Total Reports</div>
                </div>
              </div>
              <ProgressBar value={100} color="#3b82f6" glowColor="#60a5fa" />
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Community Engagement</span>
                <span className="text-blue-400 font-bold">100%</span>
              </div>
            </div>
          </div>

          {/* Response Time Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-3xl">⚡</span>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-white mb-1">
                    <AnimatedCounter target={24} />h
                  </div>
                  <div className="text-cyan-400 font-semibold">Avg Response</div>
                </div>
              </div>
              <ProgressBar value={95} color="#06b6d4" glowColor="#22d3ee" />
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Efficiency</span>
                <span className="text-cyan-400 font-bold">95%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Summary */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-8 bg-white/5 backdrop-blur-xl rounded-3xl px-12 py-8 border border-white/10 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">🏆</div>
              <div className="text-white/70 text-sm">Award Winning</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">🚀</div>
              <div className="text-white/70 text-sm">AI Powered</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">🌍</div>
              <div className="text-white/70 text-sm">Global Impact</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;

import React from 'react';

const Stats = () => {
    return (
        <section className="mt-6">
            <div className="bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 border border-slate-200/60 rounded-xl p-6 shadow-lg shadow-slate-100/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-cyan-500 rounded-full"></div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">Live Analytics</h3>
                            <p className="text-sm text-slate-500">Real-time performance metrics</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-green-50 px-3 py-2 rounded-full border border-green-200/50">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm animate-pulse"></div>
                        <span className="text-xs font-medium text-green-700">Live Data</span>
                    </div>
                </div>

                <div className="relative h-56 w-full bg-gradient-to-br from-slate-50/50 to-white rounded-lg border border-slate-200/40 p-4">
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-500 py-2 font-medium">
                        <span className="text-slate-700 font-semibold">100</span>
                        <span>75</span>
                        <span>50</span>
                        <span>25</span>
                        <span className="text-slate-400">0</span>
                    </div>

                    <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-slate-500 px-4 font-medium">
                        <span>00:00</span>
                        <span>06:00</span>
                        <span>12:00</span>
                        <span>18:00</span>
                        <span>24:00</span>
                    </div>

                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <line x1="8%" y1="10%" x2="100%" y2="10%" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" />
                        <line x1="8%" y1="30%" x2="100%" y2="30%" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" />
                        <line x1="8%" y1="50%" x2="100%" y2="50%" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" />
                        <line x1="8%" y1="70%" x2="100%" y2="70%" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" />
                        <line x1="8%" y1="90%" x2="100%" y2="90%" stroke="#cbd5e1" strokeWidth="0.5" />

                        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" />
                        <line x1="40%" y1="0" x2="40%" y2="100%" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" />
                        <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" />
                        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" />
                    </svg>

                    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full block pl-4">
                        <defs>
                            <linearGradient id="chartGradient" x1="0" x2="1">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.95" />
                                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
                            </linearGradient>

                            <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
                                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
                            </linearGradient>

                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>

                        <path
                            d="M0 80 Q25 30 50 50 T100 40 T150 60 T200 30 L200 100 L0 100 Z"
                            fill="url(#areaGradient)"
                            stroke="none"
                        />

                        <path
                            d="M0 80 Q25 30 50 50 T100 40 T150 60 T200 30"
                            fill="none"
                            stroke="url(#chartGradient)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            filter="url(#glow)"
                            className="drop-shadow-sm"
                        />

                        <circle cx="0" cy="80" r="4" fill="#6366f1" stroke="#ffffff" strokeWidth="2" className="drop-shadow-sm" />
                        <circle cx="50" cy="50" r="4" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" className="drop-shadow-sm" />
                        <circle cx="100" cy="40" r="4" fill="#6366f1" stroke="#ffffff" strokeWidth="2" className="drop-shadow-sm" />
                        <circle cx="150" cy="60" r="4" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" className="drop-shadow-sm" />
                        <circle cx="200" cy="30" r="4" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" className="drop-shadow-sm" />
                    </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="group bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200/50 hover:border-orange-300/70 transition-all duration-300 hover:shadow-lg hover:shadow-orange-100/50 cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">Peak Value</span>
                            <div className="w-2 h-2 rounded-full bg-orange-400 group-hover:animate-pulse"></div>
                        </div>
                        <div className="text-2xl font-bold text-orange-700 group-hover:scale-105 transition-transform duration-300">92</div>
                        <div className="text-xs text-orange-500 mt-1">+12% from yesterday</div>
                    </div>

                    <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200/50 hover:border-blue-300/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/50 cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Average</span>
                            <div className="w-2 h-2 rounded-full bg-blue-400 group-hover:animate-pulse"></div>
                        </div>
                        <div className="text-2xl font-bold text-blue-700 group-hover:scale-105 transition-transform duration-300">64</div>
                        <div className="text-xs text-blue-500 mt-1">Stable performance</div>
                    </div>

                    <div className="group bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200/50 hover:border-green-300/70 transition-all duration-300 hover:shadow-lg hover:shadow-green-100/50 cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Current</span>
                            <div className="w-2 h-2 rounded-full bg-green-400 group-hover:animate-pulse"></div>
                        </div>
                        <div className="text-2xl font-bold text-green-700 group-hover:scale-105 transition-transform duration-300">78</div>
                        <div className="text-xs text-green-500 mt-1">↑ Trending up</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
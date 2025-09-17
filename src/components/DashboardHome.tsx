import React from "react";
import Stats from "./ui/Stats";

export default function DashboardHome() {
    return (
        <main className="relative overflow-hidden max-w-7xl mx-auto my-12 px-4">

            {/* Decorative background blobs (cover full viewport) - new variant */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                {/* Warm radiating blob top-right */}
                <svg className="absolute right-[-15%] top-[-20%] w-[820px] h-[820px] opacity-60" viewBox="0 0 820 820" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="warm" cx="0.3" cy="0.2">
                            <stop offset="0%" stopColor="#ffedd5" />
                            <stop offset="30%" stopColor="#fb7185" />
                            <stop offset="100%" stopColor="#7c3aed" />
                        </radialGradient>
                        <filter id="blurW" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="60" />
                        </filter>
                    </defs>
                    <g filter="url(#blurW)">
                        <circle cx="520" cy="120" r="260" fill="url(#warm)" transform="translate(0,0)">
                            <animateTransform attributeName="transform" type="translate" values="0 0; -20 8; 0 0" dur="18s" repeatCount="indefinite" />
                        </circle>
                    </g>
                </svg>

                {/* Cool blob bottom-left */}
                <svg className="absolute left-[-18%] bottom-[-18%] w-[760px] h-[760px] opacity-45" viewBox="0 0 760 760" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="cool" cx="0.7" cy="0.8">
                            <stop offset="0%" stopColor="#dbeafe" />
                            <stop offset="35%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#60a5fa" />
                        </radialGradient>
                        <filter id="blurC" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="50" />
                        </filter>
                    </defs>
                    <g filter="url(#blurC)">
                        <ellipse cx="200" cy="520" rx="300" ry="220" fill="url(#cool)">
                            <animateTransform attributeName="transform" type="translate" values="0 0; 12 -6; 0 0" dur="22s" repeatCount="indefinite" />
                        </ellipse>
                    </g>
                </svg>

                {/* Soft noise / grain overlay using SVG turbulence */}
                <svg className="absolute inset-0 w-full h-full opacity-6" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <defs>
                        <filter id="noise">
                            <feTurbulence baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="turb" />
                            <feColorMatrix type="saturate" values="0" />
                            <feComponentTransfer>
                                <feFuncA type="table" tableValues="0 0.12" />
                            </feComponentTransfer>
                        </filter>
                    </defs>
                    <rect width="100%" height="100%" filter="url(#noise)" fill="#000" />
                </svg>
            </div>

            <header className="mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Welcome to Zettabyte</h1>
                        <p className="mt-1 text-sm text-slate-500">A colorful demo summary with placeholder stats and a tiny animated chart.</p>
                    </div>
                </div>
            </header>

            <section className="flex gap-4 flex-wrap mb-6">
                <div className="flex-1 min-w-[160px] rounded-lg p-4 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
                    <div className="text-sm text-indigo-700">Users</div>
                    <div className="mt-2 text-2xl font-semibold text-indigo-900">1,248</div>
                    <div className="mt-3 inline-flex items-center gap-2 text-xs text-indigo-600">
                        <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        Active now
                    </div>
                </div>

                <div className="flex-1 min-w-[160px] rounded-lg p-4 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
                    <div className="text-sm text-emerald-700">Sales</div>
                    <div className="mt-2 text-2xl font-semibold text-emerald-900">$12,430</div>
                    <div className="mt-3 inline-flex items-center gap-2 text-xs text-emerald-600">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                        +8% vs last week
                    </div>
                </div>

                <div className="flex-1 min-w-[160px] rounded-lg p-4 shadow-lg bg-gradient-to-br from-pink-50 to-pink-100">
                    <div className="text-sm text-pink-700">Uptime</div>
                    <div className="mt-2 text-2xl font-semibold text-pink-900">99.98%</div>
                    <div className="mt-3 inline-flex items-center gap-2 text-xs text-pink-600">
                        <span className="inline-block w-2 h-2 rounded-full bg-pink-500" />
                        Stable
                    </div>
                </div>
            </section>

            <Stats />

        </main>
    );
}

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User } from '@/types';

const UserDetailPage = ({ params }: { params?: Promise<{ userId: string }> }) => {
    type UnknownPromise<T> = T | Promise<T> | undefined;
    const maybeReactUse = (React as unknown as { use?: <T>(p: UnknownPromise<T>) => T }).use;
    const resolvedParams = maybeReactUse ? maybeReactUse(params as unknown as UnknownPromise<{ userId: string }>) : (params as unknown as { userId?: string } | undefined);
    const userId = resolvedParams?.userId;

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${userId}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await response.json();
                if (mounted) setUser(userData);
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') return;
                if (mounted) setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                if (mounted) setLoading(false);
            }
        };

        if (userId) {
            fetchUserData();
        }

        return () => {
            mounted = false;
            controller.abort();
        };
    }, [userId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-blue-600 font-medium">Loading user data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
                >
                    <div className="text-red-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading User</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link
                        href="/users"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Users
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 py-8 px-4">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href="/users"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors group"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Users
                    </Link>

                    {user ? (
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Header Section */}
                            <div className="bg-gradient-to-r from-purple-700 to-pink-500 p-8 text-white">
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="bg-white bg-opacity-20 rounded-full h-24 w-24 flex items-center justify-center text-4xl font-bold mb-4 md:mb-0 md:mr-6">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold">{user.name}</h1>
                                        <p className="text-blue-100 opacity-90 mt-1">@{user.username.toLowerCase()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Contact Information */}
                                    <motion.div
                                        className="bg-gradient-to-br from-teal-100 to-teal-200 p-6 rounded-xl"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            Contact Information
                                        </h2>
                                        <div className="space-y-3">
                                            <p>
                                                <span className="text-gray-600 font-medium">Email:</span>{' '}
                                                <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">{user.email}</a>
                                            </p>
                                            <p>
                                                <span className="text-gray-600 font-medium">Phone:</span>{' '}
                                                <a href={`tel:${user.phone}`} className="text-gray-800">{user.phone}</a>
                                            </p>
                                            <p>
                                                <span className="text-gray-600 font-medium">Website:</span>{' '}
                                                <a
                                                    href={`https://${user.website}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {user.website}
                                                </a>
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Address Information */}
                                    <motion.div
                                        className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-xl"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Address
                                        </h2>
                                        <div className="space-y-2">
                                            <p className="text-gray-800">{user.address.street}</p>
                                            <p className="text-gray-800">{user.address.suite}</p>
                                            <p className="text-gray-800">{user.address.city}, {user.address.zipcode}</p>
                                        </div>
                                    </motion.div>

                                    {/* Company Information */}
                                    <motion.div
                                        className="bg-gradient-to-br from-pink-100 to-pink-200 p-6 rounded-xl md:col-span-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            Company
                                        </h2>
                                        <div className="space-y-3">
                                            <p className="text-xl font-medium text-gray-800">{user.company.name}</p>
                                            <p className="text-gray-600 italic">`{user.company.catchPhrase}`</p>
                                            <p className="text-gray-700">{user.company.bs}</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">User Not Found</h2>
                            <p className="text-gray-600">The user you&apos;re looking for doesn&apos;t exist.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default UserDetailPage;
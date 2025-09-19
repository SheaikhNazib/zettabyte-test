"use client";

import React from 'react';
import Link from 'next/link';
import useFetch from '@/hooks/useFetch';
import { Post, User } from '@/types';

const PostDetailPage = ({ params }: { params?: Promise<{ id: string }> }) => {
    type UnknownPromise<T> = T | Promise<T> | undefined;
    const maybeReactUse = (React as unknown as { use?: <T>(p: UnknownPromise<T>) => T }).use;
    const resolvedParams = maybeReactUse ? maybeReactUse(params as unknown as UnknownPromise<{ id: string }>) : (params as unknown as { id?: string } | undefined);
    const id: string | undefined = (resolvedParams && resolvedParams.id) || undefined;

    const { data: post, loading: postLoading, error: postError } = useFetch<Post>(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    
    const { data: user, loading: userLoading, error: userError } = useFetch<User>(
        post ? `https://jsonplaceholder.typicode.com/users/${post.userId}` : ''
    );

    if (postLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-20 mb-8"></div>
                    <div className="h-8 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-32 mb-8"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (postError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Link 
                    href="/posts" 
                    className="text-blue-600 hover:text-blue-800 font-medium mb-8 inline-block"
                >
                    ← Back to Posts
                </Link>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Post</h3>
                    <p className="text-red-600">{postError?.message ?? String(postError)}</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Link 
                    href="/posts" 
                    className="text-blue-600 hover:text-blue-800 font-medium mb-8 inline-block"
                >
                    ← Back to Posts
                </Link>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Post Not Found</h3>
                    <p className="text-yellow-600">The post you&apos;re looking for doesn&apos;t exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-8 px-4">
            <div className="container mx-auto max-w-3xl">
                <Link href="/posts" className="inline-block mb-8 px-4 py-2 bg-white bg-opacity-80 text-blue-600 font-medium rounded-lg shadow hover:bg-white transition">
                    ← Back to Posts
                </Link>
                
                <article className="bg-white bg-opacity-90 rounded-2xl p-8 shadow-xl border-0 backdrop-blur-sm">
                    <header className="mb-6">
                        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 mb-4">
                            {post.title}
                        </h1>
                        
                        <div className="flex items-center text-sm text-blue-700 space-x-4">
                            <span>Post #{post.id}</span>
                            {userLoading ? (
                                <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
                            ) : userError ? (
                                <span>User {post.userId}</span>
                            ) : user ? (
                                <span>By {user.name} (@{user.username})</span>
                            ) : null}
                        </div>
                    </header>
                    
                    <div className="prose prose-blue max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {post.body}
                        </p>
                    </div>
                    
                    {user && (
                        <footer className="mt-8 pt-6 border-t border-gray-200">
                            <div className="bg-gradient-to-r from-cyan-100 via-blue-100 to-blue-200 rounded-lg p-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">About the Author</h3>
                                <div className="text-sm text-gray-600">
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>Username:</strong> @{user.username}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                </div>
                            </div>
                        </footer>
                    )}
                </article>
            </div>
        </div>
    );
};

export default PostDetailPage;
'use client';

import React from 'react';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import { Post, User } from '@/types';

interface PostDetailPageProps {
    params: {
        id: string;
    };
}

const PostDetailPage = ({ params }: PostDetailPageProps) => {
    const { data: post, loading: postLoading, error: postError } = useFetch<Post>(
        `https://jsonplaceholder.typicode.com/posts/${params.id}`
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
                    <p className="text-red-600">{postError}</p>
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
        <div className="container mx-auto px-4 py-8">
            <Link 
                href="/posts" 
                className="text-blue-600 hover:text-blue-800 font-medium mb-8 inline-block"
            >
                ← Back to Posts
            </Link>
            
            <article className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {post.title}
                    </h1>
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
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
                
                <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {post.body}
                    </p>
                </div>
                
                {user && (
                    <footer className="mt-8 pt-6 border-t border-gray-200">
                        <div className="bg-gray-50 rounded-lg p-4">
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
    );
};

export default PostDetailPage;
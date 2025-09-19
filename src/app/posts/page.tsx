 'use client';

import React from 'react';
import useFetch from '@/hooks/useFetch';
import { Post } from '@/types';
import PostCard from '@/components/PostCard';

const PostsPage = () => {
    const { data: posts, loading, error } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts');

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Posts</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(9)].map((_, index) => (
                        <div key={index} className="bg-gray-200 rounded-lg p-6 animate-pulse">
                            <div className="h-6 bg-gray-300 rounded mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Posts</h1>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Posts</h3>
                    <p className="text-red-600">{error?.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts?.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default PostsPage;
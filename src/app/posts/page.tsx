'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useFetch from '@/hooks/useFetch';
import { Post } from '@/types';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/ui/Pagination';
import ErrorDisplay from '@/components/ui/ErrorDisplay';

const PostsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [useInvalidEndpoint, setUseInvalidEndpoint] = useState(false);
  const postsPerPage = 12;
  
  // Use invalid endpoint to demonstrate error handling
  const endpoint = useInvalidEndpoint 
    ? 'https://jsonplaceholder.typicode.com/invalid-posts' 
    : 'https://jsonplaceholder.typicode.com/posts';
    
  const { data: posts, loading, error } = useFetch<Post[]>(endpoint);
  const totalPages = posts ? Math.ceil(posts.length / postsPerPage) : 0;
  const currentPosts = posts ? posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage) : [];

  // Animation variants for staggered card animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 block bg-blue-100 px-3 py-1 rounded -mx-4">
          Posts
        </h1>
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0 block bg-blue-100 px-3 py-1 rounded -mx-4 sm:mx-0">
            Posts
          </h1>
          
          {/* Error Demonstration Controls */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setUseInvalidEndpoint(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !useInvalidEndpoint
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ✅ Valid Endpoint
            </button>
            <button
              onClick={() => setUseInvalidEndpoint(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                useInvalidEndpoint
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ❌ Simulate Error
            </button>
          </div>
        </div>
        
        {useInvalidEndpoint && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>🧪 Demo Mode:</strong> Currently using an invalid endpoint (<code className="bg-yellow-200 px-1 rounded">invalid-posts</code>) to demonstrate error handling.
            </p>
          </div>
        )}
        
        <ErrorDisplay 
          error={error} 
          title="Failed to load posts"
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0 block bg-blue-100 px-3 py-1 rounded -mx-4 sm:mx-0">
          Posts
        </h1>
        
        {/* Error Demonstration Controls */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setUseInvalidEndpoint(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !useInvalidEndpoint
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ✅ Valid Endpoint
          </button>
          <button
            onClick={() => setUseInvalidEndpoint(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              useInvalidEndpoint
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ❌ Simulate Error
          </button>
        </div>
      </div>
      
      {useInvalidEndpoint && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>🧪 Demo Mode:</strong> Currently using an invalid endpoint (<code className="bg-yellow-200 px-1 rounded">invalid-posts</code>) to demonstrate error handling.
          </p>
        </div>
      )}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={currentPage} // Re-animate when page changes
      >
        {currentPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }
            }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </motion.div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default PostsPage;
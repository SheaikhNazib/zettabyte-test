'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useFetch from '@/hooks/useFetch';
import { Post } from '@/types';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/ui/Pagination';

const PostsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const { data: posts, loading, error } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8 block bg-blue-100 px-3 py-1 rounded -mx-4">
          Posts
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Posts</h3>
          <p className="text-red-600">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 block bg-blue-100 px-3 py-1 rounded -mx-4">
        Posts
      </h1>
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
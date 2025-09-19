"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import useFetch from "@/hooks/useFetch";
import { User } from "@/types";
import UserModal from "@/components/ui/UserModal";
import ErrorDisplay from "@/components/ui/ErrorDisplay";

const UsersPage = () => {
  const [useInvalidEndpoint, setUseInvalidEndpoint] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Use invalid endpoint to demonstrate error handling
  const endpoint = useInvalidEndpoint 
    ? 'https://jsonplaceholder.typicode.com/invalid-users' 
    : 'https://jsonplaceholder.typicode.com/users';
    
  const { data: users, loading, error } = useFetch<User[]>(endpoint);

  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-4"></div>
          <p className="text-blue-600 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
        <div className="container mx-auto max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold">Users Directory</h1>
                <p className="opacity-80 mt-2">Browse through our user list and click to see details</p>
              </div>
              
              {/* Error Demonstration Controls */}
              <div className="flex gap-2">
                <button
                  onClick={() => setUseInvalidEndpoint(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !useInvalidEndpoint
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'bg-blue-500 text-white hover:bg-blue-400'
                  }`}
                >
                  ✅ Valid Endpoint
                </button>
                <button
                  onClick={() => setUseInvalidEndpoint(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    useInvalidEndpoint
                      ? 'bg-red-500 text-white shadow-md'
                      : 'bg-blue-500 text-white hover:bg-blue-400'
                  }`}
                >
                  ❌ Simulate Error
                </button>
              </div>
            </div>
            
            {useInvalidEndpoint && (
              <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                <strong>🧪 Demo Mode:</strong> Using invalid endpoint (<code className="bg-yellow-200 px-1 rounded">invalid-users</code>) to demonstrate error handling.
              </div>
            )}
          </div>
          
          <div className="p-6">
            <ErrorDisplay 
              error={error} 
              title="Failed to load users"
              onRetry={() => window.location.reload()}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold">Users Directory</h1>
              <p className="opacity-80 mt-2">Browse through our user list and click to see details</p>
            </div>
            
            {/* Error Demonstration Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setUseInvalidEndpoint(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !useInvalidEndpoint
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'bg-blue-500 text-white hover:bg-blue-400'
                }`}
              >
                ✅ Valid Endpoint
              </button>
              <button
                onClick={() => setUseInvalidEndpoint(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  useInvalidEndpoint
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-blue-500 text-white hover:bg-blue-400'
                }`}
              >
                ❌ Simulate Error
              </button>
            </div>
          </div>
          
          {useInvalidEndpoint && (
            <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
              <strong>🧪 Demo Mode:</strong> Using invalid endpoint (<code className="bg-yellow-200 px-1 rounded">invalid-users</code>) to demonstrate error handling.
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-600 font-medium">
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Company</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <motion.tr
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="cursor-pointer border-b border-gray-100 last:border-b-0"
                    whileHover={{
                      x: 12,
                      backgroundColor: "#eff6ff",
                      boxShadow: "0 4px 20px rgba(59, 130, 246, 0.15)",
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                  >
                    <td className="py-4 px-6 flex items-center">
                      <div className="bg-blue-100 text-blue-800 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                        {user.name.charAt(0)}
                      </div>
                      {user.name}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{user.email}</td>
                    <td className="py-4 px-6">
                      <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                        {user.company.name}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default UsersPage;
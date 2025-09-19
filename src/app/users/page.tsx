"use client";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { User } from "@/types";
import UserModal from "@/components/ui/UserModal";

const UsersPage = () => {
  const { data: users, loading, error } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Company</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default UsersPage;

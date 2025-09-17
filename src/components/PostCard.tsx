import Link from 'next/link';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link 
      href={`/posts/${post.id}`}
      className="block group"
    >
      <div className="relative bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50 border border-transparent rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        
        {/* Decorative gradient blur background */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-400 via-pink-400 to-purple-500 opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-all duration-300" />

        <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10 group-hover:text-indigo-600 transition-colors duration-300">
          {post.title}
        </h3>

        <p className="text-slate-600 text-sm line-clamp-3 mb-5 relative z-10">
          {post.body}
        </p>

        <div className="flex items-center justify-between text-xs font-medium relative z-10">
          <span className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            Post #{post.id}
          </span>
          <span className="px-2 py-1 rounded-full bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors">
            User {post.userId}
          </span>
        </div>
      </div>
    </Link>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PostCard({ post }) {
  return (
    <motion.article
      layout
      whileHover={{ scale: 1.02 }}
      className="glass-card p-5 rounded-xl shadow-md hover:shadow-xl transition transform"
    >
      <Link to={`/post/${post.id}`} className="block">
        <h3 className="text-lg font-semibold text-[#4b2fb8] mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-slate-600 mb-3 line-clamp-3">
          {post.description}
        </p>
        <div className="text-xs text-slate-400">
          Published • {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </Link>
    </motion.article>
  );
}

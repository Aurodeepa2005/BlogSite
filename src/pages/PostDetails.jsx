import { useParams, useNavigate, Link } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import { motion } from "framer-motion";

export default function PostDetails() {
  const { id } = useParams();
  const { posts, deletePost, user } = usePosts();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === Number(id));
  if (!post)
    return (
      <div className="container-max pt-28">
        <p className="text-slate-600">Post not found.</p>
      </div>
    );

  return (
    <main className="pt-28 pb-16">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-8 rounded-2xl shadow-xl"
        >
          <h1 className="text-3xl font-bold text-[#6C63FF] mb-2">
            {post.title}
          </h1>
          <p className="text-slate-600 mb-4">{post.description}</p>
          <div className="prose max-w-none mb-6">{post.content}</div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                deletePost(post.id);
                navigate("/");
              }}
              className="px-4 py-2 bg-red-400 text-white rounded-md"
            >
              Delete
            </button>
            {user && (
              <Link
                to={`/edit/${post.id}`}
                className="px-4 py-2 bg-[#7a56e8] text-white rounded-md"
              >
                Edit
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import { motion } from "framer-motion";

export default function CreatePost() {
  const { addPost } = usePosts();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !content.trim()) {
      alert("Please fill all fields.");
      return;
    }
    addPost(title.trim(), description.trim(), content.trim());
    navigate("/");
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setContent("");
  };

  return (
    <main className="pt-28 pb-16">
      <div className="max-w-2xl mx-auto container-max px-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass-card p-8 rounded-2xl shadow-xl bg-white/70 backdrop-blur-xl"
        >
          {/* Header Section */}
          <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center tracking-tight">
            Create a New Post
          </h2>

          {/* Form Section */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* TITLE */}
            <div className="relative">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder=" "
                className="peer w-full p-4 border rounded-lg bg-white/50 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200 shadow-sm"
              />
              <label
                className="absolute left-4 top-4 text-gray-500 transition-all bg-white/60 px-1 pointer-events-none
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-purple-600"
              >
                Title
              </label>
            </div>

            {/* DESCRIPTION */}
            <div className="relative">
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder=" "
                className="peer w-full p-4 border rounded-lg bg-white/50 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200 shadow-sm"
              />
              <label
                className="absolute left-4 top-4 text-gray-500 transition-all bg-white/60 px-1 pointer-events-none
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-purple-600"
              >
                Short Description
              </label>
            </div>

            {/* CONTENT */}
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="8"
                placeholder=" "
                className="peer w-full p-4 border rounded-lg bg-white/50 outline-none transition resize-none
                focus:border-purple-500 focus:ring-2 focus:ring-purple-200 shadow-sm"
              />
              <label
                className="absolute left-4 top-4 text-gray-500 transition-all bg-white/60 px-1 pointer-events-none
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-purple-600"
              >
                Write your content...
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 items-center pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                className="px-6 py-3 w-full bg-gradient-to-r from-purple-600 to-indigo-600 
                text-white font-semibold rounded-lg shadow-lg hover:opacity-95 transition"
              >
                Publish
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleClear}
                className="px-5 py-3 w-full border border-gray-300 rounded-lg 
                hover:bg-gray-100 transition shadow"
              >
                Clear
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";

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

  return (
    <main className="pt-28 pb-16">
      <div className="max-w-2xl mx-auto container-max px-4">
        <div className="glass-card p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-[#6C63FF] mb-4">
            Create a New Post
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#9f77ff]"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#9f77ff]"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              placeholder="Write your content..."
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#9f77ff]"
            />
            <div className="flex gap-3 items-center">
              <button
                type="submit"
                className="px-5 py-3 bg-[#7a56e8] text-white rounded-md shadow hover:opacity-95"
              >
                Publish
              </button>
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setContent("");
                }}
                className="px-4 py-2 border rounded-md"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

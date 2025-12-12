import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/PostContext";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, updatePost } = usePosts();

  const existing = posts.find((p) => p.id === Number(id));
  const [form, setForm] = useState({ title: "", description: "", content: "" });

  useEffect(() => {
    if (existing)
      setForm({
        title: existing.title,
        description: existing.description,
        content: existing.content,
      });
  }, [existing]);

  if (!existing)
    return (
      <div className="container-max pt-28">
        <p className="text-slate-600">Post not found.</p>
      </div>
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.content.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }
    updatePost(existing.id, { ...form });
    navigate(`/post/${existing.id}`);
  };

  return (
    <main className="pt-28 pb-16">
      <div className="container-max">
        <div className="glass-card p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#6C63FF] mb-4">
            Edit Post
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              className="w-full p-3 border rounded-md"
            />
            <input
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Short description"
              className="w-full p-3 border rounded-md"
            />
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows="8"
              placeholder="Content"
              className="w-full p-3 border rounded-md"
            ></textarea>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-[#7a56e8] text-white rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

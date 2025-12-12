import { usePosts } from "../context/PostContext";
import PostCard from "../components/PostCard";

export default function Home() {
  const { posts } = usePosts();

  return (
    <main className="pt-28 pb-16">
      <div className="container-max">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-[#6C63FF]">Latest posts</h1>
          <p className="text-slate-600 mt-2 max-w-xl">
            Curated collection of your blog posts. Create, edit and explore them
            here.
          </p>
        </header>

        <section className="mt-8">
          {posts.length === 0 ? (
            <div className="glass-card p-6 rounded-xl">
              <p className="text-slate-700">
                No posts yet — click Create to add the first post.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

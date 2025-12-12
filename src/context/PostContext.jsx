import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext();

export function PostProvider({ children }) {
  // Load posts from localStorage
  const [posts, setPosts] = useState(() => {
    try {
      const raw = localStorage.getItem("posts");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Load user from localStorage
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Persist posts on change
  useEffect(() => {
    try {
      localStorage.setItem("posts", JSON.stringify(posts));
    } catch {}
  }, [posts]);

  // Add a new post
  const addPost = (title, description, content) => {
    const newPost = {
      id: Date.now(),
      title,
      description,
      content,
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  // Update existing post
  const updatePost = (id, data) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  // Delete a post
  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // Login user (store object)
  const loginUser = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem("user", JSON.stringify(userData));
    } catch {}
  };

  // Logout
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("user");
    } catch {}
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
        user,
        loginUser,
        logout,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);

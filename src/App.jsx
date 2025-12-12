import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import Login from "./pages/Login";

import { PostProvider, usePosts } from "./context/PostContext";

// ProtectedRoute: redirect if not logged in
function ProtectedRoute({ children }) {
  const { user } = usePosts();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <PostProvider>
      <BrowserRouter>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditPost />
                </ProtectedRoute>
              }
            />

            <Route path="/post/:id" element={<PostDetails />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </PostProvider>
  );
}

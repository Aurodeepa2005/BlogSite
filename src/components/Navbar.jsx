import { Link } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = usePosts();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card shadow-sm border-b border-white/30">
        <div className="container-max flex items-center justify-between py-3">
          <Link
            to="/"
            className="text-2xl font-semibold bg-linear-to-r from-[#9f77ff] to-[#c79bff] text-transparent bg-clip-text"
          >
            BlogNest
          </Link>

          <nav className="hidden md:flex items-center gap-5">
            <Link
              to="/"
              className="text-sm font-medium text-slate-700 hover:text-[#7a56e8] transition"
            >
              Home
            </Link>
            {user && (
              <Link
                to="/create"
                className="px-3 py-2 bg-[#7a56e8] text-white rounded-md text-sm shadow-sm hover:opacity-95"
              >
                Create
              </Link>
            )}
            {!user ? (
              <Link
                to="/login"
                className="px-3 py-2 bg-[#c79bff] text-white rounded-md text-sm shadow-sm hover:opacity-95"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={logout}
                className="px-3 py-2 bg-red-400 text-white rounded-md text-sm shadow-sm hover:opacity-95"
              >
                Logout
              </button>
            )}
          </nav>

          <button
            className="md:hidden px-2 py-1"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/20 bg-white/70">
            <div className="flex flex-col gap-1 px-4 py-3">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="py-2 text-slate-700"
              >
                Home
              </Link>
              {user && (
                <Link
                  to="/create"
                  onClick={() => setOpen(false)}
                  className="py-2 text-slate-700"
                >
                  Create
                </Link>
              )}
              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="py-2 text-slate-700"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="py-2 text-slate-700 text-left"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import { z } from "zod";

/*
  Validation rules:
  - name: at least 3 chars
  - email: valid email AND endsWith('.com') as you requested
  - password: min 6 chars AND must contain at least one special character
*/
const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  email: z
    .string()
    .email("Please enter a valid email (must include @ and domain).")
    .refine((v) => v.toLowerCase().endsWith(".com"), {
      message: "Email must end with .com",
    }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character (!@#$ etc.)"
    ),
});

export default function Login() {
  const { loginUser } = usePosts();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({}); // inline field errors

  // toast list: { id, type: 'success'|'error', message }
  const [toasts, setToasts] = useState([]);

  // helper: push a toast (auto-dismiss)
  const pushToast = (type, message, timeout = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, timeout);
  };

  // live-validate a single changed field to provide instant inline feedback
  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);

    // Try parsing only; we want per-field feedback so derive errors from safeParse
    const res = schema.safeParse(next);
    if (res.success) {
      setErrors({});
    } else {
      // build an errors map for only the fields that failed
      const map = {};
      for (const err of res.error.errors) {
        map[err.path[0]] = err.message;
      }
      setErrors(map);
    }
  };

  // Submit handler: show popup + inline errors
  const handleSubmit = (e) => {
    e.preventDefault();

    const result = schema.safeParse(form);
    if (!result.success) {
      // Build field-based errors for inline display
      const fieldErrors = {};
      for (const err of result.error.errors) {
        fieldErrors[err.path[0]] = err.message;
      }
      setErrors(fieldErrors);

      // Build a friendly toast message: show first error prominently
      const firstMsg = result.error.errors[0]?.message || "Validation failed.";
      pushToast("error", firstMsg);
      return;
    }

    // Success: call loginUser (store full object) and show success toast
    loginUser({ name: form.name.trim(), email: form.email.trim() });
    pushToast("success", "Login successful — welcome back!");
    // navigate after a short moment so user sees the toast (optional)
    setTimeout(() => navigate("/"), 400);
  };

  // Small visual Toasts component (top-right)
  const Toasts = () => (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`max-w-sm px-4 py-3 rounded-lg shadow-md text-sm ${
            t.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-red-500 text-white"
          }`}
          role="status"
          aria-live="polite"
        >
          {t.message}
        </div>
      ))}
    </div>
  );

  // Clear a specific inline error when the user focuses an input (nice UX)
  const handleFocus = (e) => {
    const { name } = e.target;
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // optional: clear toasts on unmount
  useEffect(() => {
    return () => setToasts([]);
  }, []);

  return (
    <div className="pt-28 pb-16 px-4 min-h-screen flex items-start justify-center bg-transparent">
      <Toasts />

      <div className="max-w-md w-full glass-card p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-semibold text-[#6C63FF] mb-4 text-center">
          Welcome Back
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#9f77ff] ${
                errors.name ? "border-red-400" : ""
              }`}
              placeholder="Your full name (min 3 characters)"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#9f77ff] ${
                errors.email ? "border-red-400" : ""
              }`}
              placeholder="you@example.com (must end with .com)"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              onFocus={handleFocus}
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#9f77ff] ${
                errors.password ? "border-red-400" : ""
              }`}
              placeholder="At least 6 chars + 1 special character"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#7a56e8] text-white rounded-md shadow hover:opacity-95 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

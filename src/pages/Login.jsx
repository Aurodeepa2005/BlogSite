import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import { z } from "zod";

// ZOD VALIDATION SCHEMA
const loginSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long.")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only letters."),
  email: z
    .string()
    .email("Enter a valid email address.")
    .refine((v) => v.endsWith(".com"), {
      message: "Email must end with .com",
    }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character (!@#$%^&*)."
    ),
});

export default function Login() {
  const { loginUser } = usePosts();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [toast, setToast] = useState(null);

  // Show toast
  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 2500);
  };

  // Live field validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);

    const result = loginSchema.safeParse(updated);
    if (!result.success) {
      const newErrors = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const newErrors = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);

      // ⚠️ Trigger shake animation
      setShake(true);
      setTimeout(() => setShake(false), 500);

      // Show error toast
      showToast("error", result.error.errors[0].message);
      return;
    }

    // ✔ Valid credentials -> set user
    loginUser({
      name: form.name.trim(),
      email: form.email.trim(),
    });

    showToast("success", "Login successful 🎉");

    setTimeout(() => navigate("/"), 600);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen flex justify-center px-4 bg-transparent">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 px-4 py-3 rounded-md shadow-lg text-white z-50 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div
        className={`w-full max-w-md p-8 rounded-xl shadow-xl bg-white/70 backdrop-blur-xl transition-all ${
          shake ? "animate-shake" : ""
        }`}
      >
        <h2 className="text-3xl font-bold text-purple-600 text-center mb-6">
          Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md mt-1 ${
                errors.name ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md mt-1 ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="example@gmail.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md mt-1 ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="At least 6 chars & 1 special character"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md shadow hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

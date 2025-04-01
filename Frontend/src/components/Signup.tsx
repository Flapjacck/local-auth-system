import { useState } from "react";
import { signup } from "../api";

interface SignupProps {
  showNotification: (message: string, type: "success" | "error") => void;
}

export const Signup = ({ showNotification }: SignupProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    const newErrors = { username: "", password: "", confirmPassword: "" };
    let isValid = true;

    if (!username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      const res = await signup(username, password);

      if (res.error) {
        showNotification(res.error, "error");
      } else {
        showNotification("Account created successfully!", "success");
        // Reset form
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      showNotification("Network error. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          className={`w-full bg-slate-700 border text-white p-3 rounded-md focus:outline-none focus:ring-2 ${
            errors.username
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-600 focus:ring-blue-500"
          }`}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username}</p>
        )}
      </div>

      <div>
        <input
          className={`w-full bg-slate-700 border text-white p-3 rounded-md focus:outline-none focus:ring-2 ${
            errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-600 focus:ring-blue-500"
          }`}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <div>
        <input
          className={`w-full bg-slate-700 border text-white p-3 rounded-md focus:outline-none focus:ring-2 ${
            errors.confirmPassword
              ? "border-red-500 focus:ring-red-500"
              : "border-slate-600 focus:ring-blue-500"
          }`}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        className={`w-full p-3 rounded-md text-white font-medium transition-all ${
          isLoading
            ? "bg-green-800 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 active:transform active:scale-95"
        }`}
        onClick={handleSignup}
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </button>
    </div>
  );
};

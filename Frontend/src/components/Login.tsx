import { useState } from "react";
import { login } from "../api";

interface LoginProps {
  showNotification: (message: string, type: "success" | "error") => void;
}

export const Login = ({ showNotification }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validate = () => {
    const newErrors = { username: "", password: "" };
    let isValid = true;

    if (!username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      const res = await login(username, password);

      if (res.error) {
        showNotification(res.error, "error");
      } else {
        showNotification("Login successful!", "success");
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

      <button
        className={`w-full p-3 rounded-md text-white font-medium transition-all ${
          isLoading
            ? "bg-blue-800 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:transform active:scale-95"
        }`}
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

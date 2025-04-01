import { useState } from "react";
import { login } from "../api";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await login(username, password);
    alert(res.message || res.error);
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded shadow max-w-sm">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        className="w-full border p-2"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full border p-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 text-white p-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

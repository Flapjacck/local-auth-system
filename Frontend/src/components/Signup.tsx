import { useState } from "react";
import { signup } from "../api";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await signup(username, password);
    alert(res.message || res.error);
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded shadow max-w-sm">
      <h2 className="text-xl font-bold">Sign Up</h2>
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
        className="w-full bg-green-600 text-white p-2 rounded"
        onClick={handleSignup}
      >
        Sign Up
      </button>
    </div>
  );
};

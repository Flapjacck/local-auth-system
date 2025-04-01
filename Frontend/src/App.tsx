import { useState } from "react";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {showLogin ? <Login /> : <Signup />}
      <button
        onClick={() => setShowLogin(!showLogin)}
        className="mt-4 text-sm text-blue-600 underline"
      >
        {showLogin ? "No account? Sign up" : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default App;

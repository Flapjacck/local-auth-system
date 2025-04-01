import { useState } from "react";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Show notification function for components to use
  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  // Handle smooth transition between forms
  const toggleForm = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowLogin(!showLogin);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-gray-200">
      {/* Notification component */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 p-4 rounded shadow-lg animate-fade-in ${
            notification.type === "success" ? "bg-green-800" : "bg-red-800"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Main container with form */}
      <div
        className={`transition-all duration-300 ${
          isAnimating
            ? "opacity-0 transform scale-95"
            : "opacity-100 transform scale-100"
        }`}
      >
        <div className="p-8 bg-slate-800 rounded-lg shadow-xl border border-slate-700">
          <h1 className="text-2xl font-bold text-center mb-6 text-white">
            {showLogin ? "Welcome Back" : "Create Account"}
          </h1>

          {showLogin ? (
            <Login showNotification={showNotification} />
          ) : (
            <Signup showNotification={showNotification} />
          )}

          <button
            onClick={toggleForm}
            className="mt-6 w-full text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            {showLogin
              ? "No account? Sign up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-slate-500 text-sm">
        Secure authentication powered by bcrypt
      </div>
    </div>
  );
}

export default App;

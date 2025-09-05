import { useState } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 transition-all duration-500 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Theme Toggle Button */}
      <div className="absolute top-5 right-5">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-full border transition-all duration-300 ${
            darkMode
              ? "bg-white text-black border-white hover:bg-gray-200"
              : "bg-black text-white border-black hover:bg-gray-800"
          }`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-3">AI Website Cloner</h1>
        <p
          className={`text-lg ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Clone any website instantly and download as a ZIP file.
        </p>
      </header>

      {/* Input Section */}
      <div className="w-full max-w-md flex items-center gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter website URL"
          className={`flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-900 text-white placeholder-gray-500 focus:ring-gray-700"
              : "bg-gray-100 text-black placeholder-gray-400 focus:ring-gray-300"
          }`}
        />
        <button
          className={`px-6 py-3 font-semibold rounded-xl transition ${
            darkMode
              ? "bg-white text-black hover:bg-gray-300"
              : "bg-black text-white hover:bg-gray-700"
          }`}
        >
          Clone Now
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl text-center">
        <div
          className={`p-6 rounded-xl transition ${
            darkMode
              ? "bg-gray-900 hover:bg-gray-800"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <h3 className="text-xl font-semibold mb-2">⚡ Fast</h3>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Clone websites in seconds with blazing speed.
          </p>
        </div>
        <div
          className={`p-6 rounded-xl transition ${
            darkMode
              ? "bg-gray-900 hover:bg-gray-800"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <h3 className="text-xl font-semibold mb-2">🔒 Secure</h3>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Your data is safe, and we never store URLs.
          </p>
        </div>
        <div
          className={`p-6 rounded-xl transition ${
            darkMode
              ? "bg-gray-900 hover:bg-gray-800"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <h3 className="text-xl font-semibold mb-2">✅ Easy</h3>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Just enter the URL and download the ZIP file.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`mt-12 text-sm ${
          darkMode ? "text-gray-500" : "text-gray-600"
        }`}
      >
        © {new Date().getFullYear()} Website Cloner. All rights reserved.
      </footer>
    </div>
  );
}

import { useState } from "react";
import { cloneWebsite, downloadClonedSite } from "../services/api"; // ✅ import both

export default function CloneUI() {
  const [url, setUrl] = useState("");
  const [model, setModel] = useState("gemini");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [filename, setFilename] = useState(""); // ✅ store filename
  const [darkMode, setDarkMode] = useState(false);

  const handleClone = async () => {
    if (!url) {
      alert("Please enter a website URL!");
      return;
    }

    setLoading(true);
    setMessage("");
    setFilename(""); // reset old filename

    try {
      const response = await cloneWebsite(url, model);
      setMessage(response.message);
      if (response.filename) {
        setFilename(response.filename); // ✅ capture filename
      }
    } catch (error) {
      console.error(error);
      setMessage("Error cloning website!");
    }

    setLoading(false);
  };

  const handleDownload = () => {
    if (!filename) {
      alert("No file available to download!");
      return;
    }
    downloadClonedSite(filename); // ✅ use helper
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-lg mb-6">
        <h1 className="text-4xl font-extrabold tracking-wide">⚡ WebClone AI</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-lg font-medium border transition-all ${
            darkMode
              ? "bg-white text-black border-gray-700 hover:bg-gray-200"
              : "bg-black text-white border-gray-300 hover:bg-gray-800"
          }`}
        >
          {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <p className="text-gray-500 mb-8 text-center max-w-md">
        Clone any website instantly using AI-powered tools.
      </p>

      {/* Main Card */}
      <div
        className={`p-8 rounded-2xl shadow-2xl w-full max-w-lg border transition-colors ${
          darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        <input
          type="text"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg mb-5 focus:outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-800 text-white border border-gray-600 focus:ring-white"
              : "bg-gray-100 text-black border border-gray-300 focus:ring-black"
          }`}
        />

        {/* Model Selection */}
        <div className="mb-5">
          <p className="mb-3 font-medium">Choose AI Model:</p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="model"
                value="gemini"
                checked={model === "gemini"}
                onChange={() => setModel("gemini")}
                className="accent-black"
              />
              Gemini
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="model"
                value="openrouter"
                checked={model === "openrouter"}
                onChange={() => setModel("openrouter")}
                className="accent-black"
              />
              OpenRouter
            </label>
          </div>
          <p className="text-sm mt-2">
            ✅ For faster & best results, use{" "}
            <span className="font-bold">Gemini</span>
          </p>
        </div>

        {/* Clone Button */}
        <button
          onClick={handleClone}
          className="w-full bg-black text-white hover:bg-gray-900 py-3 rounded-lg font-bold transition-all mb-4"
        >
          {loading ? "Cloning..." : "Clone Website"}
        </button>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={!filename}
          className={`w-full py-3 rounded-lg font-bold transition-all mb-4 ${
            filename
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Download ZIP
        </button>

        {/* Message */}
        {message && (
          <div
            className={`mt-4 p-4 rounded-lg text-center border ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-gray-100 border-gray-300 text-gray-800"
            }`}
          >
            {message}
          </div>
        )}
      </div>

      {/* Footer Links */}
      <div className="mt-8 text-sm text-center">
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/AmanShaikh33"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://portfolio-1-2g0s.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Portfolio
          </a>
          <a
            href="https://www.linkedin.com/in/aman-shaikh-02b241317/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

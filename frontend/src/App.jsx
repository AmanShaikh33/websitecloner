import { useState } from "react";
import { cloneWebsite } from "../services/api"; // Use your helper

export default function CloneUI() {
  const [url, setUrl] = useState("");
  const [model, setModel] = useState("gemini");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleClone = async () => {
    if (!url) {
      alert("Please enter a website URL!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await cloneWebsite(url, model);
      setMessage(response.message);
    } catch (error) {
      console.error(error);
      setMessage("Error cloning website!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-4xl font-extrabold mb-6 animate-pulse">AI Website Cloner</h1>

      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-lg">
        <input
          type="text"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white mb-4 focus:outline-none"
        />

        {/* Model Selection */}
        <div className="mb-4">
          <p className="text-gray-300 mb-2">Choose AI Model:</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="model"
                value="gemini"
                checked={model === "gemini"}
                onChange={() => setModel("gemini")}
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
              />
              OpenRouter (Deepseek)
            </label>
          </div>
        </div>

        {/* Clone Button */}
        <button
          onClick={handleClone}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold transition-all mb-4"
        >
          {loading ? "Cloning..." : "Clone Website"}
        </button>

        {/* Always Visible Download Button */}
        <button
          onClick={() => window.location.href = "/api/download"}
          disabled={!message.includes("successfully")}
          className={`w-full py-3 rounded-lg font-bold transition-all mb-4 ${
            message.includes("successfully")
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Download ZIP
        </button>

        {/* Message Display */}
        {message && (
          <div className="mt-4 p-3 bg-gray-700 rounded-lg text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

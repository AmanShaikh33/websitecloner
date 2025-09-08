import OpenAI from "openai";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

// ✅ OpenRouter client
const openRouterClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// ✅ Gemini API details
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

/**
 * Convert HTML to React project using the specified model
 * @param {string} htmlContent - The HTML code to convert
 * @param {string} model - "openrouter" or "gemini"
 */
export async function convertHTMLToReact(htmlContent, model = "gemini") {
 const prompt = `
You are an expert React developer. Convert the following HTML into a complete React project using **Vite** and **Tailwind CSS**.

### ✅ Requirements:
- Include **package.json** with:
  - "react", "react-dom" as dependencies
  - "vite", "@vitejs/plugin-react", "tailwindcss", "postcss", "autoprefixer" as devDependencies
  - Scripts: "dev", "build", "preview"
- Include **vite.config.js** configured for React
- Include **tailwind.config.js** with proper content paths
- Include **postcss.config.js** for Tailwind
- Include **index.html** for Vite
- Include **src/main.jsx** for React root
- Include **src/App.jsx** with the main component
- Include **src/index.css** with Tailwind directives
- Use Tailwind for all styling (no external CSS files)
- Create **components folder** inside src for reusable components
- **Automatically create React components** for logical sections (e.g., Header, Navigation, Hero, Footer, Cards, Forms)
- Each component should be in its own file with proper export/import
- Use meaningful names for components based on HTML sections
- Ensure App.jsx imports and renders these components correctly

### ✅ HTML to convert:
${htmlContent}

### ✅ Output format (use this exact format):
\`\`\`
FILE: package.json
<code here>
FILE: vite.config.js
<code here>
FILE: tailwind.config.js
<code here>
FILE: postcss.config.js
<code here>
FILE: index.html
<code here>
FILE: src/main.jsx
<code here>
FILE: src/App.jsx
<code here>
FILE: src/index.css
<code here>
FILE: src/components/<ComponentName>.jsx
<code here>
(add additional components if needed)
\`\`\`

**Important:**
- Only output code in this format.
- Do not include explanations outside the FILE blocks.
- Make sure all component imports in App.jsx are correct.
`;


  if (model === "openrouter") {
    // ✅ Use OpenRouter
    const response = await openRouterClient.chat.completions.create({
      model: "deepseek/deepseek-r1:free", // Change if you want another free model
      messages: [
        { role: "system", content: "You are an expert React developer." },
        { role: "user", content: prompt },
      ],
    });

    return response.choices[0].message.content;
  }

  if (model === "gemini") {
    // ✅ Use Gemini Free API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Gemini API response invalid: " + JSON.stringify(data));
    }
  }

  throw new Error(`Model ${model} not supported`);
}

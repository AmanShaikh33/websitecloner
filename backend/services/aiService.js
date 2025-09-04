import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // Store in .env
});

export async function convertHTMLToReact(htmlContent) {
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
- Include **src/App.jsx** with the converted component
- Include **src/index.css** with Tailwind directives
- Use Tailwind for all styling (no external CSS files)
- Create folder structure:
  - root
    - index.html
    - vite.config.js
    - tailwind.config.js
    - postcss.config.js
    - package.json
    - src/
      - main.jsx
      - App.jsx
      - index.css
      - components/ (if needed)

### ✅ HTML to convert:
${htmlContent}

Output format:
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
(add components if needed)
\`\`\`
Only output code in this format.
  `;

  const response = await client.chat.completions.create({
    model: "deepseek/deepseek-r1:free", // For testing, later replace with GPT-4
    messages: [{ role: "system", content: "You are an expert React developer." }, { role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}


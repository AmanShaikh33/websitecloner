import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const cloneWebsite = async (url, model) => {
  try {
    const res = await axios.post(`${API_URL}/clone`, { url, model });
    return res.data; // contains { message, filename }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const downloadClonedSite = async (filename) => {
  try {
    const response = await axios.get(`${API_URL}/download/${filename}`, {
      responseType: "blob",
    });

    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("Download failed:", err);
    alert("Download failed. Check console for details.");
  }
};

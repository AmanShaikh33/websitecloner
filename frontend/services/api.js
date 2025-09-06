import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const cloneWebsite = async (url, model) => {
  try {
    const res = await axios.post(`${API_URL}/clone`, { url, model });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


export const downloadClonedSite = async () => {
  try {
    const response = await axios.get(`${API_URL}/download`, {
      responseType: "blob", // important for binary files
    });

    // Create a temporary link and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "cloned-react-app.zip");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("Download failed:", err);
    alert("Download failed. Check console for details.");
  }
};


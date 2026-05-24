import React from "react";
import { FaMoon, FaSun, FaDownload, FaCopy } from "react-icons/fa";

const Toolbar = ({ darkMode, setDarkMode, content }) => {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
  };

  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "document.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="toolbar">
      <h2>Collaborative Editor</h2>

      <div className="toolbar-buttons">
        <button onClick={copyLink}>
          <FaCopy /> Share
        </button>

        <button onClick={downloadFile}>
          <FaDownload /> Download
        </button>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
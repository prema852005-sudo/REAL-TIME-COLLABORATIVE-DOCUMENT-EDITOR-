import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Toolbar from "./Toolbar";
import Editor from "./Editor";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Load saved document
  useEffect(() => {

    socket.on("load-document", (data) => {
      setContent(data);
    });

    socket.on("receive-changes", (data) => {
      setContent(data);
    });

    return () => {
      socket.off("receive-changes");
    };

  }, []);

  // Send changes
  const handleChange = (value) => {
    setContent(value);
    socket.emit("send-changes", value);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <Toolbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="container">

        <div className="users-box">
          <h3>Real-Time Collaboration Active</h3>
        </div>

        <Editor
          content={content}
          setContent={handleChange}
        />

      </div>

    </div>
  );
}

export default App;
import React from "react";

const Editor = ({ content, setContent }) => {
  return (
    <textarea
      className="editor"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="Start collaborating..."
    />
  );
};

export default Editor;
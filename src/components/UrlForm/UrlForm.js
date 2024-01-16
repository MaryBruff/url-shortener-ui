import React, { useState } from "react";

function UrlForm({addUrl}) {
  const [title, setTitle] = useState("");
  const [urlToShorten, setUrlToShorten] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addUrl(urlToShorten, title);
    clearInputs();
  };

  const clearInputs = () => {
    setTitle("");
    setUrlToShorten("");
  };

  return (
    <form>
      <input
        type="text"
        className="input-field"
        placeholder="Title..."
        name="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        />

      <input
        type="text"
        className="input-field"
        placeholder="URL to Shorten..."
        name="urlToShorten"
        value={urlToShorten}
        onChange={(e) => {
          setUrlToShorten(e.target.value);
        }}
      />

      <button onClick={(e) => handleSubmit(e)}>Shorten Please!</button>
    </form>
  );
}

export default UrlForm;

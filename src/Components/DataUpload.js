import React, { useState } from 'react';
import './DataUpload.css';

function DataUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('File uploaded successfully');
      } else {
        setMessage('File upload failed');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <div className="data-upload">
      <h2>Upload Student Data (CSV)</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".csv" />
        <button type="submit" className="upload-button">Upload CSV</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DataUpload;

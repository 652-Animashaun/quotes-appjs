"use client"

import { useState } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the first file (if multiple files)
    if (selectedFile) {
      setFile(selectedFile); // Update the state with the selected file
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    console.log("handleSubmit file", file)
    formData.append('file', file); // Append the selected file to form data

    try {
      const res = await fetch('/api/uploadimage', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setImageUrl(data.fileUrl); // Display uploaded image URL
        console.log('Image uploaded successfully:', data.fileUrl);
      } else {
        console.error('Error uploading image:', data.error);
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Upload</button>
      </form>
      {imageUrl && (
        <div>
          <p>Image uploaded to:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
          <img src={imageUrl} alt="Uploaded Image" width="200" />
        </div>
      )}
    </div>
  );
}

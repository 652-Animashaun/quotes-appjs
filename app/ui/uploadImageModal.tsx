// components/FileUpload.js
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';

export default function FileUpload({handleImageURlReturn}) {
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter()

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log("event", e.target.files[0])
    console.log("FILE", file)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('file', file);
    console.log(formData)

    const res = await fetch('/api/uploadimage', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setImageUrl(data.fileUrl);
      console.log('Image URL:', data.fileUrl);
      handleImageURlReturn(imageUrl)
      return


    //       

      // Here, you would send the fileUrl to the database
      // For example, using fetch or an API client for your DB:
      // await fetch('/api/save-url', { method: 'POST', body: JSON.stringify({ url: data.fileUrl }) })
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
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


import './App.css'
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState();

  const handleUpload = () => {
    console.log(file);
    const formdata = new FormData()
    formdata.append("file", file);
    console.log(formdata);
    axios.post("http://localhost:8000/api/files/upload", formdata, { headers: { 'Content-Type': 'multipart/form-data' }})
      .then(res => console.log(res))
      .catch(err => { console.log(err) })
  }

  return (
    <>
      <div>
        <input type="file" onChange={e => setFile(e.target.files[0])} className='hidden'/>
        <label onClick={handleUpload} className='inline-block'>Upload</label>
      </div>
    </>
  )
}

export default App

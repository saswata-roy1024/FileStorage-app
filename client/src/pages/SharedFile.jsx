import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Bookmark, CircleCheckBig } from 'lucide-react';

function SharedFile() {
  const [file, setFile] = useState(null);
  const [fileNotFound, setFileNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetchFile();
  }, [id]);

  const fetchFile = async () => {
    try {
      setLoading(true);
      setFile(null);
      setFileNotFound(false);
      const response = await axios.get(`/api/files/${id}/single`);
      setFile(response.data);
    } catch (err) {
      console.log('File not found or an error occurred');
      setFileNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const preview = () => {
    if (file?.type === 'image') {
      return <img src={file.url} alt="File Image" className='w-full h-auto border-b-[3px] border-black' />;
    } else if (file?.type === 'video') {
      return (
        <ReactPlayer url={file.url} controls width='100%' className='bg-black border-b-[3px] border-black' />
      );
    } else if (file?.type === 'audio') {
      return (
        <audio controls className='w-full border-b-[3px] border-black'>
          <source src={file.url} type={`audio/${file.format}`} />
          Your browser does not support the audio element.
        </audio>
      );
    } else {
      return <div>File type not supported for preview.</div>;
    }
  };
  
  const handleSaveFile = async() => {
    try {
      await axios.post(`/api/files/save`, { id });
      setSaved(true);
    } catch (err) {
      console.error('Error saving the file', err);
    }
  };


  if (loading) {
    return <div className='min-h-screen w-screen flex items-center justify-center bg-violet-200'>Loading...</div>;
  }

  return (
    <div className='min-h-screen max-w-screen flex items-center justify-center bg-violet-200'>
      {fileNotFound ? (
        <div className='bg-white p-10 rounded-sm m-4 max-w-[90%] md:max-w-[70%] lg:max-w-[55%]'>
          <div className='text-xl font-semibold'>File Not Found</div>
        </div>
      ) : (
        <div className='bg-inherit p-2 md:p-10 rounded-md m-4 max-w-[90%] md:max-w-[70%] lg:max-w-[55%]'>
          <div className='w-full mb-10 outline rounded-sm relative'>
            {preview()}
            <div
              onClick={handleSaveFile}
              className='py-2 flex justify-center items-center text-xl font-semibold gap-2 hover:cursor-pointer'>
              { saved ? <CircleCheckBig size={30} /> : <Bookmark size={30} /> }
              {!saved && 'Save'}
            </div>
          </div>
          {file && (
            <ul className='flex flex-col gap-7 text-xl font-bold outline p-4 rounded-md break-words'>
              <li>File Name: <span className='font-normal'>{file.filename}</span></li>
              <li>Type: <span className='font-normal'>{file.type}</span></li>
              <li>Format: <span className='font-normal'>{file.format}</span></li>
              <li>Size in Bytes: <span className='font-normal'>{file.size}B</span></li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SharedFile;

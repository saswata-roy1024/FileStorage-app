import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player'

function SharedFile() {
  const [file, setFile] = useState(null);
  const [fileNotFound, setFileNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

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
      return <img src={file.url} alt="File Image" className='w-full h-auto rounded-sm outline' />;
    } else if (file?.type === 'video') {
      return (
        <ReactPlayer url={file.url} controls width={'100%'} className='bg-black'/>
      );
    } else if (file?.type === 'audio') {
      return (
        <audio controls className='w-full rounded-sm outline'>
          <source src={file.url} type={`audio/${file.format}`} />
          Your browser does not support the audio element.
        </audio>
      );
    } else {
      return <div>File type not supported for preview.</div>;
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
        <div className='bg-inherit p-2 md:p-10 rounded-sm m-4 max-w-[90%] md:max-w-[70%] lg:max-w-[55%]'>
          <div className='w-full mb-10 outline rounded-sm'>
            {preview()}
          </div>
          {file && (
            <ul className='flex flex-col gap-7 text-xl font-semibold outline p-4 rounded-sm break-words'>
              <li>File Name: {file.filename}</li>
              <li>Type: {file.type}</li>
              <li>Format: {file.format}</li>
              <li>Size in Bytes: {file.size}B</li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SharedFile;

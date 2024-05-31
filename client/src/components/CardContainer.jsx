import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFiles } from '@/Redux/Slices/filesSlice';
import Card from './Card'
import { useEffect } from 'react';

function CardContainer() {

  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);

  useEffect(() => {
    dispatch(fetchFiles());
  }, []);

  return (
    <div className='py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 h-screen overflow-y-scroll'>
      {files?.map((file) => {
        return <Card file={file} key={file._id} />
      })}
    </div>
  )
}

export default CardContainer
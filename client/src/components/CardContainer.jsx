import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFiles } from '@/Redux/Slices/filesSlice';
import Card from './Card'
import { useEffect, useState } from 'react';

function CardContainer() {
  const search = useSelector((state) => state.search.value);
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);

  useEffect(() => {
    dispatch(fetchFiles());
  }, []);

  return (
    <div className='pl-10 pr-7 h-[70vh] grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8  overflow-y-scroll w-full'>
      {files?.filter((item) => {
        return search.toLowerCase() === '' ? item : item.filename.toLowerCase().includes(search);
      }).map((file) => {
        return <Card file={file} key={file._id} />
      })}
    </div>
  )


}

export default CardContainer
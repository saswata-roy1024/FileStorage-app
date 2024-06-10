import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFiles } from '@/Redux/Slices/filesSlice';
import Card from './Card';

function CardContainer() {
  const search = useSelector((state) => state.search.value);
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const selectedOptions = useSelector((state) => state.dropdown.selectedOptions);
  const tabs = useSelector((state) => state.tabs.value);
  const sortBy = useSelector((state) => state.sortBy.value);

  useEffect(() => {
    dispatch(fetchFiles());
  }, []);

  const compareFiles = (a, b) => {
    if (sortBy === 'name') {
      return a.filename.localeCompare(b.filename);
    } else if (sortBy === 'created_at') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === 'size') {
      return a.size - b.size;
    }
    return 0;
  };

  const filteredFiles = files
    ?.filter((item) => {
      const matchesSearch = search.toLowerCase() === '' || item.filename.toLowerCase().includes(search.toLowerCase());
      const matchesFileType = selectedOptions.all || selectedOptions[item.type];
      let condition = '';

      if (tabs === 'My Files') {
        condition = item.deletedAt === null;
      } else if (tabs === 'Trash Bin') {
        condition = item.deletedAt !== null;
      } else if (tabs === 'Starred') {
        condition = item.starred === true;
      }
      return matchesSearch && matchesFileType && condition;
    })
    .sort(compareFiles);

  return (
    <div className='pl-10 pr-7 h-[70vh] grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8  overflow-y-scroll w-full'>
      {filteredFiles.map((file) => {
        return <Card file={file} key={file._id} />;
      })}
    </div>
  );
}

export default CardContainer;

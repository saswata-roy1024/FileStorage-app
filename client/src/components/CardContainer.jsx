import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFiles } from '@/Redux/Slices/filesSlice';
import { fetchSaves } from '@/Redux/Slices/savesSlice';
import Card from './Card';

function CardContainer() {
    const search = useSelector((state) => state.search.value);
    const dispatch = useDispatch();
    const files = useSelector((state) => state.files.files);
    const selectedOptions = useSelector((state) => state.dropdown.selectedOptions);
    const tabs = useSelector((state) => state.tabs.value);
    const sortBy = useSelector((state) => state.sortBy.value);
    const saves = useSelector((state) => state.saves.saves);

    useEffect(() => {
        dispatch(fetchFiles());
        dispatch(fetchSaves());
    }, [dispatch]);

    const compareFiles = (a, b) => {
        switch (sortBy) {
            case 'name':
                return a.filename.localeCompare(b.filename);
            case 'created_at':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'size':
                return a.size - b.size;
            default:
                return 0;
        }
    };

    const filteredFiles = (tabs !== 'Saved' ? files : saves)
        .filter((item) => {
            const matchesSearch = !search || item.filename.toLowerCase().includes(search.toLowerCase());
            const matchesFileType = selectedOptions.all || selectedOptions[item.type];
            let condition = false;

            switch (tabs) {
                case 'My Files':
                    condition = item.deletedAt === null;
                    break;
                case 'Trash Bin':
                    condition = item.deletedAt !== null;
                    break;
                case 'Starred':
                    condition = item.starred === true;
                    break;
                default:
                    condition = true;
                    break;
            }
            return matchesSearch && matchesFileType && condition;
        })
        .sort(compareFiles);

    return (
        <div className='pl-10 pr-7 h-[70vh] grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 overflow-y-scroll w-full'>
            {filteredFiles.map((file) => (
                <Card file={file} key={file._id} />
            ))}
        </div>
    );
}

export default CardContainer;

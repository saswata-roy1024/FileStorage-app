import React from 'react'
import { useDispatch } from 'react-redux';
import downloadFile from './features/downloadFile';
import { toggleStarFile, deleteFile } from '@/Redux/Slices/filesSlice';
import { EllipsisVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function MoreMenu({ file }) {

    const dispatch = useDispatch();

    const handleToggleStar = () => {
        console.log(file._id)
        dispatch(toggleStarFile(file._id));
    };

    const handleDeleteFile = () => {
        dispatch(deleteFile(file._id));
    };

    const handleDownloadFile = () => {
        downloadFile(file.url, file.filename)
    };

    return (

        <DropdownMenu>
            <DropdownMenuTrigger className="absolute top-2 right-2 p-1 rounded-sm border bg-opacity-75 hover:bg-gray-200" >
                <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='px-2 *:text-base *:font-semibold *:w-36'>
                <DropdownMenuSeparator />
                <DropdownMenuItem >Share</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDownloadFile}>Download</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleToggleStar} >{file.starred ? 'Unstar' : 'Mark as Star'}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDeleteFile} className='text-red-500 flex justify-center'>Delete</DropdownMenuItem>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default MoreMenu
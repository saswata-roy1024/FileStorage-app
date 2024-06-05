import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import downloadFile from './features/downloadFile';
import { toggleStarFile, deleteFile } from '@/Redux/Slices/filesSlice';
import { EllipsisVertical, Copy } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from './ui/input';
import { Button } from './ui/button';

function MoreMenu({ file }) {

    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

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

    const handleCopyLink = () => {
        navigator.clipboard.writeText(file.url);
    };

    return (<>

        <DropdownMenu>
            <DropdownMenuTrigger className="absolute top-2 right-2 p-1 rounded-sm border bg-opacity-75 hover:bg-gray-200" >
                <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='px-2 *:text-base *:font-semibold *:w-36'>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsAlertDialogOpen(true)} >Share</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDownloadFile}>Download</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleToggleStar} >{file.starred ? 'Unstar' : 'Mark as Star'}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDeleteFile} className='text-red-500 flex justify-center'>Delete</DropdownMenuItem>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>


        <AlertDialog open={isAlertDialogOpen}>
            <AlertDialogTrigger asChild>
                <button className="hidden">Open</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Link:</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="flex items-center space-x-2">
                            <Input value={file.url} disabled className='disabled:cursor-default disabled:opacity-100'/>
                            <Button variant="outline" size="icon" onClick={handleCopyLink}><Copy /></Button>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setIsAlertDialogOpen(false)}>Done</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    </>)
}

export default MoreMenu
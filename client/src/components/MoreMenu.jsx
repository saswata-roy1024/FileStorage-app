import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import downloadFile from './features/downloadFile';
import { toggleStarFile, deleteFile } from '@/Redux/Slices/filesSlice';
import { removeSaves } from '@/Redux/Slices/savesSlice';
import { EllipsisVertical, Copy, Share2, ArrowDownToLine, Star, Trash2 } from 'lucide-react';
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
import generateLink from './features/generateLink'
import axios from 'axios';

function MoreMenu({ file, className }) {

    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

    const tabs = useSelector((state) => state.tabs.value);

    const dispatch = useDispatch();

    const handleToggleStar = () => {
        console.log(file._id)
        dispatch(toggleStarFile(file._id));
    };

    const handleDeleteFile = async () => {
        if (tabs === 'Saved') return dispatch(removeSaves(file._id));
        else return dispatch(deleteFile(file._id));
    };

    const handleDownloadFile = () => {
        downloadFile(file.url, file.filename)
    };

    const handleCopyLink = () => {
        const link = generateLink(file._id);
        navigator.clipboard.writeText(link);
    };

    return (<>

        <DropdownMenu>
            <DropdownMenuTrigger className={`absolute top-2 right-2 p-1 border bg-opacity-75 hover:bg-gray-200 ${className}`} >
                <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='px-2 *:text-base *:font-semibold *:w-36'>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsAlertDialogOpen(true)} className='gap-2' > <Share2 size={19} /> Share</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDownloadFile} className='gap-2'><ArrowDownToLine size={19} /> Download</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleToggleStar} className='gap-2'> <Star size={19} /> {file.starred ? 'Unstar' : 'Mark as Star'}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDeleteFile} className='text-red-500 gap-2'> <Trash2 size={19} /> {tabs === 'Trash Bin' ? 'Restore' : tabs === 'Saved' ? 'Remove' : 'Delete'}</DropdownMenuItem>
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
                            <Input value={generateLink(file._id)} disabled className='disabled:cursor-default disabled:opacity-100' />
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
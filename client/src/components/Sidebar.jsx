import React from 'react';
import { useDispatch } from 'react-redux'
import { setTabs } from '@/Redux/Slices/tabsSlice';
import { Button } from '@/components/ui/button';
import { Archive, Star, Trash2, Bookmark, FolderOpen, LogOut } from "lucide-react";
import UploadFile from './UploadFile'

function Sidebar() {
    const dispatch = useDispatch();

    return (
        <div className='w-[20%] lg:max-w-60 dark:bg-[#152030] py-5 h-screen'>

            <div className='min-w-12 lg:w-full pb-5 flex justify-center gap-2 border-b-2 font-bold lg:text-xl items-center'>
                <FolderOpen />
                FileStorage
            </div>

            <div className='h-[90vh] flex flex-col justify-between'>
                <nav className="my-8 text-slate-200 flex flex-col gap-3 w-full">
                    <div className='flex flex-col gap-3 text-black dark:text-slate-50 w-full'>

                        <Button onClick={() => dispatch(setTabs('My Files'))}
                            className="space-x-2 relative" variant="ghost">
                            <Archive />
                            <span>My Files</span>
                        </Button>

                        <Button onClick={() => dispatch(setTabs('Starred'))}
                            className="space-x-2 relative right-1" variant="ghost">
                            <Star />
                            <span>Starred</span>
                        </Button>

                        <Button onClick={() => dispatch(setTabs('Saved'))}
                            className="space-x-2 relative right-2" variant="ghost">
                            <Bookmark />
                            <span>Saved</span>
                        </Button>
                    </div>

                    <Button onClick={() => dispatch(setTabs('Trash Bin'))}
                        className='border-y-2 py-3 w-full text-center text-black dark:text-slate-50 text-base space-x-2'
                        variant="ghost">
                        <Trash2 />
                        <span>Trash Bin</span>
                    </Button>

                    <div className='px-2'>
                        <UploadFile className="w-full" />
                    </div>
                </nav>

                <Button variant="ghost" className="w-full text-red-600 hover:text-red-500 flex gap-2 items-center  mb-3 ">
                    <LogOut size={20} />
                    <span className='font-bold text-sm pb-1'>Sign Out</span>
                </Button>
            </div>
        </div>
    );
}

export default Sidebar;

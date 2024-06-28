import React from 'react';
import { useDispatch } from 'react-redux'
import { setTabs } from '@/Redux/Slices/tabsSlice';
import { Button } from '@/components/ui/button';
import { Archive, Star, Trash2, Bookmark, FolderOpen, LogOut } from "lucide-react";
import UploadFile from './UploadFile'

function Sidebar() {
    const dispatch = useDispatch();

    return (
        <div className='w-12 md:w-[20%] lg:max-w-60 bg-indigo-200  dark:bg-[#2B2A70] py-5 h-screen'>

            <div className='min-w-12 lg:w-full pb-5 flex justify-center gap-1 border-b-2 font- text-sm text-indigo-950 dark:text-indigo-50 items-center'>
                <FolderOpen strokeWidth={3} />
                <span className="font-extrabold md:text-lg hidden md:inline-block">FileStorage</span>
            </div>

            <div className='h-[90vh] flex flex-col justify-between'>
                <nav className="text-slate-200 flex flex-col w-full">
                    <div style={{ fontFamily: 'Teko, sans-serif' }}
                        className='flex flex-col gap-4 text-black dark:text-slate-50 w-full *:md:mx-4 *:text-lg *:font-bold my-7'>

                        <Button onClick={() => dispatch(setTabs('My Files'))}
                            className="gap-3 min-w-12 p-0" variant="ghost">
                            <Archive strokeWidth={'2.4px'} className=''/>
                            <span className='hidden md:inline-block w-16'>My Files</span>
                        </Button>

                        <Button onClick={() => dispatch(setTabs('Starred'))}
                            className="gap-3 min-w-12 p-0" variant="ghost">
                            <Star strokeWidth={'2.4px'} className='' />
                            <span className='hidden md:inline-block w-16'>Starred</span>
                        </Button>

                        <Button onClick={() => dispatch(setTabs('Saved'))}
                            className="gap-3 min-w-12 p-0" variant="ghost">
                            <Bookmark strokeWidth={'2.4px'} className='' />
                            <span className='hidden md:inline-block w-16'>Saved</span>
                        </Button>
                    </div>

                    <Button onClick={() => dispatch(setTabs('Trash Bin'))}
                        className=' p-0 border-y-2 w-full text-center text-black dark:text-slate-50 md:text-xl font-bold gap-3 rounded-none h-12'
                        variant="ghost"
                        style={{ fontFamily: 'Teko, sans-serif' }}>
                        <Trash2 />
                        <span className='hidden md:inline-block'>Trash Bin</span>
                    </Button>

                    <div className='px-2 my-6'>
                        <UploadFile className="w-full font-bold gap-1 hidden md:block " />
                    </div>
                </nav>

                <Button variant="ghost" className="w-full text-gray-900 dark:text-gray-200 dark:hover:text-red-500 hover:text-red-500 flex gap-2 items-center mb-3 rounded-none p-0">
                    <LogOut strokeWidth={3} className='w-6 h-6'/>
                </Button>
            </div>
        </div>
    );
}

export default Sidebar;

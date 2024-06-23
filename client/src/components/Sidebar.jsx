import React from 'react';
import { useDispatch } from 'react-redux'
import { setTabs } from '@/Redux/Slices/tabsSlice';
import { Button } from '@/components/ui/button';
import { Archive, Star, Trash2, Bookmark, FolderOpen, LogOut } from "lucide-react";
import UploadFile from './UploadFile'

function Sidebar() {
    const dispatch = useDispatch();

    return (
        <div className='w-[20%] lg:max-w-60 bg-gradient-to-tr to-indigo-300 from-indigo-200  dark:from-[#2B2A70] dark:to-[#2f2e74] py-5 h-screen'>

            <div className='min-w-12 lg:w-full pb-5 flex justify-center gap-1 border-b-2 font- text-sm text-indigo-950 dark:text-indigo-50 items-center'>
                <FolderOpen strokeWidth={3}/>
                <span className="font-extrabold text-lg">FileStorage</span>
            </div>

            <div className='h-[90vh] flex flex-col justify-between'>
                <nav className="text-slate-200 flex flex-col w-full">
                    <div style={{ fontFamily: 'Teko, sans-serif' }}
                        className='flex flex-col gap-4 text-black dark:text-slate-50 w-full *:mx-4 *:text-lg *:font-bold my-7'>

                        <Button onClick={() => dispatch(setTabs('My Files'))}
                            className="gap-3" variant="ghost">
                            <Archive strokeWidth={'2.4px'} />
                            <span >My Files</span>
                        </Button>

                        <Button onClick={() => dispatch(setTabs('Starred'))}
                            variant="ghost">
                            <Star strokeWidth={'2.4px'} className='relative right-[11px]' />
                            <span >Starred</span>
                        </Button>

                        <Button onClick={() => dispatch(setTabs('Saved'))}
                            className="" variant="ghost">
                            <Bookmark strokeWidth={'2.4px'} className='relative right-[16px]' />
                            <span className='relative right-[6px]'>Saved</span>
                        </Button>
                    </div>

                    <Button onClick={() => dispatch(setTabs('Trash Bin'))}
                        className='border-y-2 w-full text-center text-black dark:text-slate-50 text-xl font-bold space-x-2 rounded-none'
                        variant="ghost"
                        style={{ fontFamily: 'Teko, sans-serif' }}>
                        <Trash2 />
                        <span>Trash Bin</span>
                    </Button>

                    <div className='px-2 my-6'>
                        <UploadFile className="w-full font-bold gap-1" />
                    </div>
                </nav>

                <Button variant="ghost" className="w-full text-gray-900 dark:text-gray-200 dark:hover:text-red-500 hover:text-red-500 flex gap-2 items-center mb-3 rounded-none">
                    <LogOut size={26} strokeWidth={3} />
                    <span style={{ fontFamily: 'Teko, sans-serif' }} className='font-bold text-lg pb-1 relative top-[2px]'></span>
                </Button>
            </div>
        </div>
    );
}

export default Sidebar;

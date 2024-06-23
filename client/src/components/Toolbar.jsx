import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Hash, LayoutGrid, Rows2, ArrowUpDown, Check } from "lucide-react";
import UploadFile from '@/components/UploadFile';
import { useSelector, useDispatch } from 'react-redux';
import { setSortBy } from '@/Redux/Slices/sortBySlice';
import { setView } from '@/Redux/Slices/viewSlice';
import { setSearch } from '@/Redux/Slices/searchSlice';
import Dropdown from './FilterDropdown';
import { Profile } from './ProfileComponent';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DarkMode from './DarkMode';

function Toolbar() {
    const dispatch = useDispatch();

    const tabs = useSelector((state) => state.tabs.value);
    const sortBy = useSelector((state) => state.sortBy.value);
    const view = useSelector((state) => state.view.value);

    return (
        <div className='border-b-[2px] border-white  py-5 w-full px-10 lg:max-h-44'>
            <nav className='flex justify-between items-center'>
                <div className='flex items-center gap-1 md:text-3xl lg:text-3xl rounded-sm font-extrabold'>
                    <Hash strokeWidth={3} size={29}/>
                    <span style={{ fontFamily: 'Teko, sans-serif' }}>{tabs}</span>
                </div>
                <div className='flex gap-5'>
                    <DarkMode />
                    <Profile />
                </div>
            </nav>

            <div className='flex justify-center items-center gap-2'>
                <Input onChange={(e) => dispatch(setSearch(e.target.value))} type="text" placeholder="Search" className="w-[18rem] h-12 placeholder:font-bold text-base border-slate-500 " />
                <Dropdown className='h-12' />
            </div>

            <div className='w-full flex justify-between items-center'>
                <div className='flex gap-2'>
                    <Button className=" font-bold dark:text-gray-900 text-sm flex items-center gap-2" onClick={view === 'Grid' ? () => dispatch(setView('Table')) : () => dispatch(setView('Grid'))} >
                        {view === 'Grid' ? <LayoutGrid strokeWidth={2.4}/> : <Rows2 strokeWidth={2.4}/>}
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='outline-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-14 inline-flex items-center justify-center rounded-md'><ArrowUpDown strokeWidth={3}/></DropdownMenuTrigger>
                        <DropdownMenuContent className='py-3 px-4 w-40'>
                            <DropdownMenuLabel className='text-center text-base font-bold'>Sort By</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => dispatch(setSortBy('name'))} className='flex gap-3 text-base font-semibold' >Name {sortBy === 'name' && <Check color="#1565C0" />}</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => dispatch(setSortBy('size'))} className='flex gap-3 text-base font-semibold' >Size {sortBy === 'size' && <Check color="#1565C0" />}</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => dispatch(setSortBy('date'))} className='flex gap-3 text-base font-semibold' >Date {sortBy === 'date' && <Check color="#1565C0" />}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className='flex gap-3'>
                    <UploadFile className='font-bold flex items-center gap-1' />
                </div>
            </div>
        </div>
    );
}

export default Toolbar;

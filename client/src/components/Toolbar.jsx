import React from 'react';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Hash, LayoutGrid, Rows2, ListFilter, ArrowUpDown } from "lucide-react";
import UploadFile from '@/components/UploadFile';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { setSearch } from '@/Redux/Slices/searchSlice';
import Dropdown from './Dropdown';


function Toolbar() {
    const dispatch = useDispatch();

    const tabs = useSelector((state) => state.tabs.value);
    const [view, setView] = useState(true)

    return (

        <div className='border-b py-5 w-full px-10 lg:max-h-44'>
            <nav className='flex justify-between items-center'>
                <div className='flex items-center gap-1 md:text-xl lg:text-2xl  dark:bg-slate-900 rounded-sm font-extrabold'>
                    <Hash />
                    <span>{tabs}</span>
                </div>
                <div className='flex items-center gap-5 '>

                    <Button className="rounded-full border border-slate-600" size="icon" variant="ghost">
                        <img
                            alt="Avatar"
                            className="rounded-full "
                            height="42"
                            src="/placeholder.svg"
                            style={{
                                aspectRatio: "42/42",
                                objectFit: "cover",
                            }}
                            width="42"
                        />
                    </Button>


                </div>
            </nav>

            <div className='flex justify-center items-center gap-2'>
                <Input onChange={(e) => dispatch(setSearch(e.target.value))} type="text" placeholder="Search" className="w-[18rem] h-12 placeholder:font-bold text-base border-slate-500 " />
                <Dropdown className='h-12' />
            </div>

            <div className='w-full flex justify-between items-center'>
                <div className='flex gap-2'>
                    <Button className=" font-bold dark:text-gray-900 text-sm flex items-center gap-2" onClick={view ? () => setView(false) : () => setView(true)} >
                        {view ? <LayoutGrid /> : <Rows2 />}
                    </Button>
                    <Button><ArrowUpDown /></Button>
                </div>

                <div className='flex gap-3'>

                    <UploadFile className='font-bold flex items-center gap-1' />
                </div>
            </div>

        </div>
    )
}

export default Toolbar
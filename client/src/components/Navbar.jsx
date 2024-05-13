import React from 'react'
import { Link } from "react-router-dom"
import { FolderOpen, AlignJustify } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"


function Nav() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link className="flex items-center justify-center gap-2" href="#">
        <FolderOpen />
        <span className="font-bold">FileStorage</span>
      </Link>

      <nav className="ml-auto sm:flex gap-4 sm:gap-6 items-center hidden sm:visible">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Features
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          About
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Contact
        </Link>
        <Link className="text-white text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 py-1 px-2 rounded-sm" href="#">
          Sign In
        </Link>
      </nav>
      <div className='sm:hidden'>
        <Sheet >
          <SheetTrigger><AlignJustify className='hover:cursor-pointer' /></SheetTrigger>
          <SheetContent className="bg-violet-200 sm:hidden">
            <nav className="text-indigo-950 flex flex-col items-center gap-16 text-lg my-[25%] pt-7">

              <Link className="font-extrabold " href="#">
                Home
              </Link>
              <Link className="font-semibold hover:underline underline-offset-4 " href="#">
                Features
              </Link>
              <Link className="font-medium hover:underline underline-offset-4" href="#">
                About
              </Link>
              <Link className="font-medium hover:underline underline-offset-4" href="#">
                Contact
              </Link>
              <Link className=" w-full text-center text-white font-semibold bg-indigo-600 hover:bg-indigo-500 py-4 px-2 rounded-sm" href="#">
                Sign In
              </Link>

            </nav>

          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}

export default Nav
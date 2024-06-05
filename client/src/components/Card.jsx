import React from 'react'
import { Image, Play, Text } from 'lucide-react';
import MoreMenu from './MoreMenu';

function Card({ file }) {
    const icon = () => {
        if (file.type == 'image') return <Image />
        else if (file.type == 'video') return <Play />
        else if (file.type == 'audio') return <Headphones />
        else return <Text />
    }
    return (<>

        <div className="max-w-sm my-10 bg-white shadow-md rounded-lg overflow-hidden h-80 w-full hover:shadow-2xl ">
            <div className="relative">
                <img className="w-full h-48 object-cover" src={file.url} alt="File Image" />
                <MoreMenu file={file} />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 overflow-hidden w-64 h-8">{file.filename}</h2>
            </div>
            <hr />
            <ul className='flex justify-between items-center text-sm px-6 py-4 text-gray-500 dark:text-gray-400 '>
                <li className='flex gap-2'> {icon()} {file.format}</li>
                <li>{file.createdAt.split("T")[0]}</li>
            </ul>
        </div>
    </>)
}

export default Card
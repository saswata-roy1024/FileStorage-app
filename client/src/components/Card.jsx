import React from 'react';
import { Image, Play, FileQuestion, FileText, Headphones } from 'lucide-react';
import MoreMenu from './MoreMenu';
import pdf from '../assets/pdf.png'
import ppt from '../assets/ppt.png'
import raw from '../assets/raw.png'
import docs from '../assets/docs.png'
import xls from '../assets/xls.png'
import video from '../assets/video.png'
import mp3 from '../assets/mp3.png'

function Card({ file }) {
    const validFormats = ['jpg', 'jpeg', 'png', 'mp4', 'mov', 'mkv'];

    const icon = () => {
        if (file.format === 'jpg' || file.format === 'jpeg' || file.format === 'png') return <Image />;
        else if (file.format === 'mp4' || file.format === 'mov' || file.format === 'mkv') return <Play />;
        else if (file.format === 'mp3') return <Headphones />;
        else if (file.format === 'pdf' || file.format === 'txt' ||
            file.format === 'xls' || file.format === 'xlsx' ||
            file.format === 'doc' || file.format === 'docx' ||
            file.format === 'ppt' || file.format === 'pptx') return <FileText />
        else return <FileQuestion />;
    };

    const preview = () => {
        switch (file.format) {
            case 'jpg':
            case 'jpeg':
            case 'png':
                return file.url;
            case 'pdf':
                return pdf;
            case 'doc':
            case 'docs':
            case 'docx':
                return docs;
            case 'ppt':
            case 'pptx':
                return ppt;
            case 'xls':
            case 'xlsx':
                return xls;
            case 'mp4':
            case 'mov':
            case 'mkv':
                return file.url.replace(/\.(mp4|mkv|mov)$/, '.png');;
            case 'mp3':
                return mp3;
            default:
                return raw;
        }
    };

    return (
        <div className="max-w-sm my-10 bg-white dark:bg-indigo-700 bg-opacity-60 dark:bg-opacity-55 shadow-md rounded-lg overflow-hidden h-80 w-full hover:shadow-2xl">
            <div className="relative h-48 flex justify-center items-center">
                <img className={validFormats.includes(file.format) ?
                    "w-full h-48 object-cover" :
                    'w-36 h-auto pt-7'} src={preview()} alt="File Preview" />
                <MoreMenu file={file} className="rounded-full" />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 overflow-hidden w-64 h-8">{file.filename}</h2>
            </div>
            <hr className="border-gray-300" />
            <ul className="flex justify-between items-center text-sm px-6 py-4 text-gray-500 dark:text-gray-400">
                <li className="flex gap-2">{icon()} {file.format}</li>
                <li>{file.createdAt.split("T")[0]}</li>
            </ul>
        </div>
    );
}

export default Card;

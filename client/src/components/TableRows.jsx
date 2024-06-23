import React from 'react';
import { Image, Play, FileQuestion, FileText, Headphones } from 'lucide-react';
import {
    TableRow,
    TableCell
} from "@/components/ui/table";
import MoreMenu from './MoreMenu';

const TableRows = ({ files }) => {

    const icon = (file) => {
        if (file.format === 'jpg' || file.format === 'jpeg' || file.format === 'png') return <Image />;
        else if (file.format === 'mp4' || file.format === 'mov' || file.format === 'mkv') return <Play />;
        else if (file.format === 'mp3') return <Headphones />;
        else if (file.format === 'pdf' || file.format === 'xls' || file.format === 'xlsx' ||
            file.format === 'doc' || file.format === 'docx' ||
            file.format === 'ppt' || file.format === 'pptx') return <FileText />
        else return <FileQuestion />;
    };

    return (
        <>
            {files.map((file) => (
                <TableRow key={file._id}>
                    <TableCell >{file.filename}</TableCell>
                    <TableCell className='flex gap-2 '>{icon(file)}{file.format}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell className='w-32' >{new Date(file.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className='w-0'><MoreMenu file={file} className={'relative rounded-sm'} /></TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default TableRows;

import React from 'react';
import {
    TableRow,
    TableCell
} from "@/components/ui/table";
import MoreMenu from './MoreMenu';

const TableRows = ({ files }) => {
    return (
        <>
            {files.map((file) => (
                <TableRow key={file._id}>
                    <TableCell>{file.filename}</TableCell>
                    <TableCell>{file.type}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell className='w-32' >{new Date(file.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className='w-0'><MoreMenu file={file} className={'relative'}/></TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default TableRows;

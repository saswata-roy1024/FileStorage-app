import React, { useRef } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import {useDispatch } from 'react-redux'
import { uploadFile } from '@/Redux/Slices/filesSlice';

const FileUpload = (props) => {

    const dispatch = useDispatch();
    
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            dispatch(uploadFile(file));
          }
    };

    return (
        <div>
            <Button onClick={handleButtonClick}
            className={props.className}>
                <Plus />
                Upload
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                className='hidden'
                onChange={handleFileChange}
            />
        </div>
    );
};

export default FileUpload;
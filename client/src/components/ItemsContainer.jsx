import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFiles } from '@/Redux/Slices/filesSlice';
import { fetchSaves } from '@/Redux/Slices/savesSlice';
import Card from './Card';
import TableRows from './TableRows';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function CardContainer() {
    const search = useSelector((state) => state.search.value);
    const dispatch = useDispatch();
    const files = useSelector((state) => state.files.files);
    const selectedOptions = useSelector((state) => state.dropdown.selectedOptions);
    const tabs = useSelector((state) => state.tabs.value);
    const sortBy = useSelector((state) => state.sortBy.value);
    const saves = useSelector((state) => state.saves.saves);
    const view = useSelector((state) => state.view.value);

    useEffect(() => {
        dispatch(fetchFiles());
        dispatch(fetchSaves());
    }, [dispatch]);

    const compareFiles = (a, b) => {
        const sortMapping = {
            name: () => a.filename.localeCompare(b.filename),
            created_at: () => new Date(a.createdAt) - new Date(b.createdAt),
            size: () => a.size - b.size
        };
        return (sortMapping[sortBy] || (() => 0))();
    };

    const getFileType = (format) => {
        const fileTypeMapping = {
            image: ['jpg', 'jpeg', 'png'],
            document: ['pdf', 'doc', 'docs', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'],
            video: ['mp4', 'mov', 'mkv'],
            audio: ['mp3']
        };

        for (const [type, formats] of Object.entries(fileTypeMapping)) {
            if (formats.includes(format)) return type;
        }
        return 'raw';
    };

    const filteredFiles = (tabs !== 'Saved' ? files : saves)
        .filter((item) => {
            const matchesSearch = !search || item.filename.toLowerCase().includes(search.toLowerCase());
            const fileType = getFileType(item.format);
            const matchesFileType = selectedOptions.all || selectedOptions[fileType] || (fileType === 'raw' && selectedOptions.Raw);

            const tabConditions = {
                'My Files': item.deletedAt === null,
                'Trash Bin': item.deletedAt !== null,
                'Starred': item.starred === true
            };
            const condition = tabConditions[tabs] !== undefined ? tabConditions[tabs] : true;

            return matchesSearch && matchesFileType && condition;
        })
        .sort(compareFiles);

    return (
        <div className='pl-10 pr-7 h-[70vh] overflow-y-scroll w-full'>
            {view === 'Grid' ? (
                <div className='grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8'>
                    {filteredFiles.map((file) => (
                        <Card file={file} key={file._id} />
                    ))}
                </div>
            ) : (
                <Table className="min-w-full w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Filename</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredFiles.length ? (
                            <TableRows files={filteredFiles} />
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}

export default CardContainer;

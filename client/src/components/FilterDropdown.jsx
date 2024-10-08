import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDropdown, setOption, closeDropdown } from '../Redux/Slices/filterDropdownSlice';
import { Button } from './ui/button';
import { ListFilter } from 'lucide-react';

const Dropdown = (props) => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.dropdown.isOpen);
    const selectedOptions = useSelector((state) => state.dropdown.selectedOptions);

    const handleOptionChange = (e) => {
        const { name, checked } = e.target;
        dispatch(setOption({ name, checked }));
    };

    const handleClickOutside = (e) => {
        if (!e.target.closest('.relative')) {
            dispatch(closeDropdown());
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [dispatch]);

    return (
        <div className="relative inline-block text-left">
            <Button className={props.className} onClick={() => dispatch(toggleDropdown())}>
                <ListFilter strokeWidth={3}/>
            </Button>
            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 md:left-0 mt-2 rounded-md shadow-lg bg-white dark:bg-[#020817] ring-1 ring-black ring-opacity-5 focus:outline-none w-fit md:w-44 z-50"
                >
                    <div className="py-1 dark:text-gray-200">
                        {Object.keys(selectedOptions).map((option) => (
                            <label
                                key={option}
                                className="flex items-center px-4 py-1 text-sm font-semibold text-gray-700 dark:text-gray-100 cursor-pointer hover:bg-gray-100 select-none"
                            >
                                <input
                                    type="checkbox"
                                    name={option}
                                    checked={selectedOptions[option]}
                                    onChange={handleOptionChange}
                                    className="mr-2"
                                /> {option.charAt(0).toUpperCase() + option.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;

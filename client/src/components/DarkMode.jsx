import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';
import { toggleDarkMode } from '@/Redux/Slices/darkModeSlice';

const DarkMode = () => {
  const darkMode = useSelector(state => state.darkMode.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Button variant="outline" size="icon" className="bg-inherit border-none" onClick={() => dispatch(toggleDarkMode())}>
      {darkMode ? <Sun size={32}/> : <Moon size={32} />}
    </Button>
  );
};

export default DarkMode;

import React from 'react';
import { ModeToggle } from './modeToggle';

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 flex items-center justify-between w-full h-16 bg-gray-900 text-white z-50'>
      <div className="ml-4 font-bold text-xl">Logo</div>
      <div className="flex items-center space-x-4 mr-4">
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
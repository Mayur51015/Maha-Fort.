import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-fort-600 p-1.5 rounded-lg group-hover:bg-fort-700 transition-colors shadow-sm">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif font-bold text-xl text-stone-900 tracking-tight">
              Sahyadri<span className="text-fort-600">Explorer</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/directory" className="text-stone-600 hover:text-fort-700 font-medium text-sm transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-fort-600 after:transition-all hover:after:w-full">
              Directory
            </Link>
            <Link to="/map" className="text-stone-600 hover:text-fort-700 font-medium text-sm transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-fort-600 after:transition-all hover:after:w-full">
              Treks Map
            </Link>
            <Link to="/resources" className="text-stone-600 hover:text-fort-700 font-medium text-sm transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-fort-600 after:transition-all hover:after:w-full">
              Resources
            </Link>
            <Link to="/signin" className="bg-fort-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-fort-700 active:transform active:scale-95 transition-all shadow-md hover:shadow-lg">
              Sign In
            </Link>
          </div>
          
          <div className="md:hidden">
            <button className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
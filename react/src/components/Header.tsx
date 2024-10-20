import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import { AllApplication, MessageUnread } from '@icon-park/react';

function Header() {
  return (
    <header className="container px-8 py-5 flex justify-between items-center">
      <div className="flex items-center gap-10">
        <div className="w-[40px] h-[40px] overflow-hidden">
          <img src={logo} alt="logo" className="w-full h-full" />
        </div>
        <Link
          to={'/'}
          className="flex items-center gap-3 hover:bg-gray-300 rounded-2xl py-2 px-4 cursor-pointer"
        >
          <AllApplication theme="outline" size="18" fill="#333" />
          <span className="text-sm">Dashboard</span>
        </Link>
      </div>
      <div className='flex items-center gap-5'>
        <div className='w-6 h-6 rounded-md hover:bg-gray-300 flex justify-center items-center p-4 cursor-pointer'>
          <MessageUnread theme="outline" size="18" fill="#333" />
        </div>
        <div className='w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:border'>
          <img src={avatar} alt="avatar" className='w-full h-full object-cover' />
        </div>
      </div>
    </header>
  );
}

export default Header;

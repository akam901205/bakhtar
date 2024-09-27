import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  isLoggedIn: boolean;
  userEmail: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, userEmail, onLogout }) => {
  return (
    <header className="bg-white py-4 border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-[#2C3E50]">SOCIAL</span>
          <span className="text-[#20c997]">GUIDEN.SE</span>
        </Link>
        {isLoggedIn ? (
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">{userEmail}</span>
            <button
              onClick={onLogout}
              className="bg-[#20c997] text-white px-6 py-2 rounded-full hover:bg-[#14b8a6] transition duration-300 ease-in-out text-sm font-semibold"
            >
              Logga ut
            </button>
          </div>
        ) : (
          <Link href="/login" className="bg-[#20c997] text-white px-6 py-2 rounded-full hover:bg-[#14b8a6] transition duration-300 ease-in-out text-sm font-semibold">
            Logga in
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
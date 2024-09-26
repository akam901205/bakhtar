import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white py-4 border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-[#2C3E50]">SOCIAL</span>
          <span className="text-[#20c997]">GUIDEN.SE</span>
        </Link>
        <Link href="/login" className="bg-[#20c997] text-white px-6 py-2 rounded-full hover:bg-[#14b8a6] transition duration-300 ease-in-out text-sm font-semibold">
          Logga in
        </Link>
      </div>
    </header>
  );
};

export default Header;
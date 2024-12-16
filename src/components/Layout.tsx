import { ReactNode, useState } from "react";
import Link from "next/link";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // State to toggle the mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle function for mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle function for the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg">
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-3xl font-semibold hover:text-blue-300 transition">
                Skitty Utils
              </Link>
            </div>

            {/* Desktop Navbar */}
            <div className="hidden md:flex space-x-6">
              <div className="relative group">
                <Link
                  href="/pfp"
                  className="text-lg font-medium hover:text-blue-300 focus:outline-none transition flex items-center space-x-2"
                >
                  <span>Profile Pictures</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 transform transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </Link>

                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity visibility-hidden group-hover:visible">
                    <ul className="text-gray-300">
                      <li>
                        <Link
                          href="/pfp/roblox"
                          className="block px-4 py-3 hover:bg-blue-700 transition-colors"
                        >
                          Grab Roblox PFP
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pfp/discord"
                          className="block px-4 py-3 hover:bg-blue-700 transition-colors"
                        >
                          Grab Discord PFP
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pfp/lgbtfy"
                          className="block px-4 py-3 hover:bg-blue-700 transition-colors"
                        >
                          LGBTQ-fy
                        </Link>
                      </li>
                    </ul>
                  </div>
              </div>
            </div>

            {/* Mobile Navbar Toggle */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-4 bg-gray-800 text-gray-300 px-4 py-2 rounded-lg shadow-lg">
              <button
                onClick={toggleDropdown}
                className="w-full text-left px-4 py-3 hover:bg-blue-700 transition-colors"
              >
                Profile Pictures
              </button>

              {/* Mobile Dropdown for Profile Pictures */}
              {isDropdownOpen && (
                <div className="space-y-2">
                  <Link
                    href="/pfp/roblox"
                    className="block px-4 py-3 hover:bg-blue-700 transition-colors"
                  >
                    Grab Roblox PFP
                  </Link>
                  <Link
                    href="/pfp/discord"
                    className="block px-4 py-3 hover:bg-blue-700 transition-colors"
                  >
                    Grab Discord PFP
                  </Link>
                  <Link
                    href="/pfp/lgbtfy"
                    className="block px-4 py-3 hover:bg-blue-700 transition-colors"
                  >
                    LGBTQ-fy
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-grow bg-gray-900 text-gray-100">{children}</main>
    </div>
  );
};

export default Layout;

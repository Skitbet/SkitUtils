import { ReactNode, useState } from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div
      className='flex flex-col min-h-screen'
      style={{ backgroundColor: '#36393f' }}
    >
      <header
        style={{
          backgroundColor: '#202225',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
        }}
      >
        <nav className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3'>
          <div className='flex justify-between items-center'>
            {/* Logo */}
            <Link
              href='/'
              className='text-2xl font-bold transition'
              style={{ color: '#ffffff' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#5865f2')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
            >
              Skitty Utils
            </Link>

            {/* Desktop Navbar */}
            <div className='hidden md:flex items-center space-x-2'>
              <div className='relative group'>
                <Link
                  href='/pfp'
                  className='flex items-center space-x-1 px-3 py-2 rounded text-sm font-medium transition'
                  style={{ color: '#dcddde' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#40444b';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#dcddde';
                  }}
                >
                  <span>Profile Pictures</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    className='w-3 h-3'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </Link>

                {/* Desktop Dropdown */}
                <div
                  className='absolute right-0 mt-1 w-48 rounded opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity z-50'
                  style={{
                    backgroundColor: '#18191c',
                    border: '1px solid #40444b',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  }}
                >
                  <ul>
                    {[
                      { href: '/pfp/roblox', label: 'Grab Roblox PFP' },
                      { href: '/pfp/discord', label: 'Grab Discord PFP' },
                      { href: '/pfp/lgbtfy', label: 'LGBTQ-fy' },
                    ].map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className='block px-4 py-2 text-sm transition'
                          style={{ color: '#dcddde' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#5865f2';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              'transparent';
                            e.currentTarget.style.color = '#dcddde';
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              className='md:hidden focus:outline-none'
              onClick={toggleMobileMenu}
              style={{ color: '#b9bbbe' }}
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className='md:hidden mt-3 rounded overflow-hidden'
              style={{
                backgroundColor: '#2f3136',
                border: '1px solid #40444b',
              }}
            >
              <button
                onClick={toggleDropdown}
                className='w-full text-left px-4 py-3 text-sm font-medium flex justify-between items-center transition'
                style={{ color: '#dcddde' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#40444b')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'transparent')
                }
              >
                <span>Profile Pictures</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div style={{ borderTop: '1px solid #40444b' }}>
                  {[
                    { href: '/pfp/roblox', label: 'Grab Roblox PFP' },
                    { href: '/pfp/discord', label: 'Grab Discord PFP' },
                    { href: '/pfp/lgbtfy', label: 'LGBTQ-fy' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className='block px-6 py-3 text-sm transition'
                      style={{ color: '#b9bbbe' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#5865f2';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#b9bbbe';
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      <main
        className='flex-grow'
        style={{ backgroundColor: '#36393f', color: '#dcddde' }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;

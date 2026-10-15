import { ReactNode, useState } from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

const profilePictureLinks = [
  { href: '/pfp/roblox', label: 'Grab Roblox PFP' },
  { href: '/pfp/discord', label: 'Grab Discord PFP' },
  { href: '/pfp/lgbtfy', label: 'LGBTQ-fy' },
];

const Chevron = ({ isOpen = false }: { isOpen?: boolean }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
    aria-hidden='true'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M19 9l-7 7-7-7'
    />
  </svg>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isGamesDropdownOpen, setIsGamesDropdownOpen] = useState(false);

  return (
    <div className='flex min-h-screen flex-col' style={{ backgroundColor: 'var(--color-page)' }}>
      <header
        className='sticky top-0 z-40 border-b'
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        }}
      >
        <nav className='mx-auto max-w-7xl px-6 py-3 sm:px-8 lg:px-12' aria-label='Main navigation'>
          <div className='flex items-center justify-between'>
            <Link
              href='/'
              className='text-xl font-bold tracking-tight transition-colors sm:text-2xl'
              style={{ color: 'var(--color-text)' }}
            >
              Skitty Utils
            </Link>

            <div className='hidden items-center gap-2 md:flex'>
              <div className='group relative'>
                <Link href='/pfp' className='nav-link'>
                  <span>Profile Pictures</span>
                  <Chevron />
                </Link>
                <div className='nav-menu'>
                  <ul>
                    {profilePictureLinks.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className='nav-menu-link'>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className='group relative'>
                <Link href='/games/edpi' className='nav-link'>
                  <span>Games</span>
                  <Chevron />
                </Link>
                <div className='nav-menu'>
                  <ul>
                    <li>
                      <Link href='/games/edpi' className='nav-menu-link'>
                        eDPI Calculator (BETA)
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              type='button'
              className='rounded-lg p-2 transition-colors hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] md:hidden'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ color: 'var(--color-muted)' }}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls='mobile-navigation'
            >
              <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                {isMobileMenuOpen ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>

          {isMobileMenuOpen && (
            <div id='mobile-navigation' className='mobile-nav mt-4 md:hidden'>
              <button
                type='button'
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className='mobile-nav-toggle'
                aria-expanded={isProfileDropdownOpen}
              >
                <span>Profile Pictures</span>
                <Chevron isOpen={isProfileDropdownOpen} />
              </button>

              {isProfileDropdownOpen &&
                profilePictureLinks.map((item) => (
                  <Link key={item.href} href={item.href} className='mobile-nav-link'>
                    {item.label}
                  </Link>
                ))}

              <button
                type='button'
                onClick={() => setIsGamesDropdownOpen(!isGamesDropdownOpen)}
                className='mobile-nav-toggle border-t'
                style={{ borderColor: 'var(--color-border)' }}
                aria-expanded={isGamesDropdownOpen}
              >
                <span>Games</span>
                <Chevron isOpen={isGamesDropdownOpen} />
              </button>

              {isGamesDropdownOpen && (
                <Link href='/games/edpi' className='mobile-nav-link'>
                  eDPI Calculator (BETA)
                </Link>
              )}
            </div>
          )}
        </nav>
      </header>

      <main className='flex-grow' style={{ backgroundColor: 'var(--color-page)', color: 'var(--color-text)' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

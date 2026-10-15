import Layout from '@/components/Layout';
import Link from 'next/link';
import type { NextPage } from 'next';

const utilities = [
  {
    href: '/pfp/roblox',
    title: 'Roblox PFPs',
    description: "Get someone's PFP via their Roblox username or ID.",
    action: 'Get Roblox PFP',
  },
  {
    href: '/pfp/discord',
    title: 'Discord PFPs',
    description: "Get someone's PFP via their Discord ID.",
    action: 'Get Discord PFP',
  },
  {
    href: '/pfp/lgbtfy',
    title: 'LGBT-fy PFPs',
    description: 'Express yourself with a pride flag ring on your PFP!',
    action: 'LGBT-fy your PFP',
  },
];

const PfpPage: NextPage = () => {
  return (
    <Layout>
      <div className='page-shell'>
        <div className='page-container'>
          <header className='page-header'>
            <h1 className='page-title'>Get your profile picture here</h1>
            <p className='page-description text-base sm:text-lg'>
              Trying to find a profile picture someone uses? Access profile
              pictures and create your own across a range of tools.
            </p>
          </header>

          <div className='grid gap-4 md:grid-cols-3'>
            {utilities.map((utility) => (
              <section
                key={utility.href}
                className='surface-card flex flex-col items-start p-6'
              >
                <h2 className='mb-3 text-xl font-bold' style={{ color: 'var(--color-accent)' }}>
                  {utility.title}
                </h2>
                <p className='mb-6 flex-grow text-sm leading-relaxed' style={{ color: 'var(--color-muted)' }}>
                  {utility.description}
                </p>
                <Link href={utility.href} className='button-primary w-full'>
                  {utility.action}
                </Link>
              </section>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PfpPage;

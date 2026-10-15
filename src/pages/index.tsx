import Layout from '@/components/Layout';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className='page-shell flex items-center'>
        <div className='page-container'>
          <section className='surface-card mx-auto max-w-3xl p-8 text-center sm:p-12'>
            <div className='accent-rule' />
            <h1 className='page-title mb-4'>Skitty Utils</h1>
            <p className='page-description mx-auto max-w-2xl text-base sm:text-lg'>
              Your go-to place for basic utilities like profile picture getters,
              and more tools coming soon!
            </p>
          </section>

          <nav className='mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center'>
            <Link href='/pfp' className='button-primary'>
              PFP Utilities
            </Link>
            <Link href='/games/edpi' className='button-secondary'>
              eDPI Calculator
            </Link>
          </nav>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

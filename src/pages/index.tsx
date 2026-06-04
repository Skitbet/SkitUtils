import Layout from '@/components/Layout';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Layout>
      <div
        className='flex flex-col justify-center items-center min-h-screen px-6 sm:px-12'
        style={{ backgroundColor: '#36393f', color: '#dcddde' }}
      >
        {/* Card panel like a Discord embed */}
        <div
          className='text-center max-w-2xl w-full rounded-lg p-8 mb-8'
          style={{
            backgroundColor: '#2f3136',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
        >
          {/* Blurple top accent bar */}
          <div
            className='w-16 h-1 rounded-full mx-auto mb-6'
            style={{ backgroundColor: '#5865f2' }}
          />

          <h1
            className='text-4xl md:text-5xl font-extrabold mb-3 tracking-tight'
            style={{ color: '#ffffff' }}
          >
            Skitty Utils
          </h1>
          <p className='text-base md:text-lg mb-0' style={{ color: '#b9bbbe' }}>
            Your go-to place for basic utilities like profile picture getters,
            and more tools coming soon!
          </p>
        </div>

        {/* Buttons */}
        <div className='flex flex-col md:flex-row items-center justify-center gap-4'>
          <a
            href='/pfp'
            className='font-semibold py-3 px-8 rounded text-white transition-all duration-150'
            style={{
              backgroundColor: '#5865f2',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#4752c4')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#5865f2')
            }
          >
            PFP Utilities
          </a>
          <a
            href='/'
            className='font-semibold py-3 px-8 rounded transition-all duration-150'
            style={{
              backgroundColor: '#4f545c',
              color: '#dcddde',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#5d6269')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#4f545c')
            }
          >
            Coming Soon
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

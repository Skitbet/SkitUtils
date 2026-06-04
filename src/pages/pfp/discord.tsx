import { useState } from 'react';
import Layout from '@/components/Layout';

type UserAvatarProps = {};

const UserAvatar: React.FC<UserAvatarProps> = () => {
  const [userId, setUserId] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState<string>('Get Picture');
  const [isError, setIsError] = useState<boolean>(false);

  const fetchAvatar = async () => {
    setUsername(null);
    setAvatarUrl(null);
    setIsError(false);
    try {
      setButtonText('Loading...');
      const response = await fetch(`/api/pfps/discord?userId=${userId}`);
      if (!response.ok) throw new Error('User not found');

      const data = await response.json();
      setUsername(data.username);
      setAvatarUrl(data.avatarUrl);
      setButtonText('Get Picture');
    } catch (err: any) {
      setIsError(true);
      setButtonText(err.message || 'An error occurred');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') fetchAvatar();
  };

  return (
    <Layout>
      <div
        className='flex flex-col justify-center items-center min-h-screen px-6 sm:px-12 py-12'
        style={{ backgroundColor: '#36393f', color: '#dcddde' }}
      >
        {/* Header card */}
        <div
          className='text-center max-w-2xl w-full rounded-lg p-8 mb-6'
          style={{
            backgroundColor: '#2f3136',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
        >
          <div
            className='w-16 h-1 rounded-full mx-auto mb-6'
            style={{ backgroundColor: '#5865f2' }}
          />
          <h1
            className='text-4xl md:text-5xl font-extrabold mb-3 tracking-tight'
            style={{ color: '#ffffff' }}
          >
            Discord PFP Grabber
          </h1>
          <p className='text-base md:text-lg' style={{ color: '#b9bbbe' }}>
            Enter a Discord user's ID to fetch their profile picture.
          </p>
        </div>

        {/* Tool card */}
        <div
          className='w-full max-w-lg rounded-lg p-8'
          style={{
            backgroundColor: '#2f3136',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
        >
          {/* Input */}
          <input
            type='text'
            placeholder='Enter Discord User ID'
            className='w-full px-4 py-3 mb-3 rounded text-sm focus:outline-none'
            style={{
              backgroundColor: '#202225',
              border: '1px solid #40444b',
              color: '#dcddde',
            }}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={(e) =>
              (e.currentTarget.style.border = '1px solid #5865f2')
            }
            onBlur={(e) => (e.currentTarget.style.border = '1px solid #40444b')}
          />

          {/* Error message */}
          {isError && (
            <p className='text-sm mb-3' style={{ color: '#ed4245' }}>
              {buttonText}
            </p>
          )}

          {/* Button */}
          <button
            className='w-full font-semibold py-3 rounded text-white transition-all duration-150'
            style={{ backgroundColor: '#5865f2' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#4752c4')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#5865f2')
            }
            onClick={fetchAvatar}
          >
            {isError ? 'Get Picture' : buttonText}
          </button>

          {/* Result */}
          {username && (
            <>
              <div
                className='my-6'
                style={{ borderTop: '1px solid #40444b' }}
              />
              <p
                className='text-sm mb-4 text-center'
                style={{ color: '#b9bbbe' }}
              >
                Username:{' '}
                <span className='font-semibold' style={{ color: '#ffffff' }}>
                  {username}
                </span>
              </p>
            </>
          )}

          {avatarUrl && (
            <div className='flex flex-col items-center gap-4'>
              <img
                src={avatarUrl}
                alt='Discord Avatar'
                className='w-48 h-48 object-cover rounded-full'
                style={{
                  border: '4px solid #5865f2',
                  boxShadow: '0 0 24px rgba(88,101,242,0.4)',
                }}
              />
              <a
                href={avatarUrl}
                download={`${username || 'avatar'}.png`}
                className='font-semibold py-3 px-8 rounded text-white transition-all duration-150 inline-block'
                style={{ backgroundColor: '#3ba55d' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#2d7d46')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = '#3ba55d')
                }
              >
                Download Avatar
              </a>
            </div>
          )}
        </div>

        {/* Back button */}
        <div className='mt-6 mb-10'>
          <a
            href='/pfp'
            className='font-semibold py-3 px-8 rounded text-white transition-all duration-150 inline-block'
            style={{ backgroundColor: '#4f545c' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#5d6269')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#4f545c')
            }
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default UserAvatar;

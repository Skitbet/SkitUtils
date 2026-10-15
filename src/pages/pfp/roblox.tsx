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
      const response = await fetch(`/api/pfps/roblox?userId=${userId}`);
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
      <div className='page-shell flex flex-col items-center'>
        {/* Header card */}
        <div className='page-header w-full text-center'>
          <div className='accent-rule' />
          <h1 className='page-title'>
            Roblox PFP Grabber
          </h1>
          <p className='page-description text-base md:text-lg'>
            Enter a Roblox username or ID to retrieve their profile picture.
          </p>
        </div>

        {/* Tool card */}
        <div className='surface-card w-full max-w-xl p-6 sm:p-8'>
          <input
            type='text'
            placeholder='Enter Roblox ID or Username'
            className='themed-control mb-3 px-4 py-3 text-sm'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {isError && (
            <p className='mb-3 text-sm' style={{ color: 'var(--color-error)' }}>
              {buttonText}
            </p>
          )}

          <button
            className='button-primary w-full'
            onClick={fetchAvatar}
          >
            {isError ? 'Get Picture' : buttonText}
          </button>

          {username && (
            <>
              <div
                className='my-6 border-t'
                style={{ borderColor: 'var(--color-border)' }}
              />
              <p
                className='mb-4 text-center text-sm'
                style={{ color: 'var(--color-muted)' }}
              >
                Username:{' '}
                <span className='font-semibold' style={{ color: 'var(--color-text)' }}>
                  {username}
                </span>
              </p>
            </>
          )}

          {avatarUrl && (
            <div className='flex flex-col items-center gap-4'>
              <img
                src={avatarUrl}
                alt='Roblox Avatar'
                className='w-48 h-48 object-cover rounded-full'
                style={{
                  border: '4px solid var(--color-accent)',
                  boxShadow: '0 0 24px rgba(214,161,93,0.3)',
                }}
              />
              <a
                href={avatarUrl}
                download={`${username || 'avatar'}.png`}
                className='button-success'
              >
                Download Avatar
              </a>
            </div>
          )}
        </div>

        {/* Back button */}
        <div className='mb-10 mt-6'>
          <a
            href='/pfp'
            className='button-secondary'
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default UserAvatar;

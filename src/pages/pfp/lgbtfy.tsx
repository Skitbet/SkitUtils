import Layout from '@/components/Layout';
import { getFlagColors } from '@/utils/gay';
import React, { useState, useRef, useEffect } from 'react';

const RainbowPFPGenerator = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [isImageEmpty, setIsImageEmpty] = useState<boolean>(false);
  const [rainbowColors, setRainbowColors] = useState<string[]>([
    '#FF0000',
    '#FF7F00',
    '#FFFF00',
    '#00FF00',
    '#0000FF',
    '#4B0082',
    '#8B00FF',
  ]);
  const [rainbowWidth, setRainbowWidth] = useState<number>(50);
  const [rainbowReps, setRainbowReps] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsImageEmpty(false);
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          setIsImageLoaded(true);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      setIsImageEmpty(true);
    }
  };

  const handleRainbowTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRainbowColors(getFlagColors(e.target.value));
  };

  useEffect(() => {
    if (image && isImageLoaded) {
      drawRainbowRing(image);
    }
  }, [image, isImageLoaded, rainbowColors, rainbowWidth, rainbowReps]);

  const drawRainbowRing = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const canvasSize = 500;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
    ctx.restore();

    const colors = [];
    for (let i = 0; i < rainbowReps; i++) {
      colors.push(...rainbowColors);
    }

    const segmentWidth = (2 * Math.PI) / colors.length;

    colors.forEach((color, index) => {
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radius,
        index * segmentWidth,
        (index + 1) * segmentWidth,
      );
      ctx.arc(
        centerX,
        centerY,
        radius - rainbowWidth,
        (index + 1) * segmentWidth,
        index * segmentWidth,
        true,
      );
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    });
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'rainbow-pfp.png';
      link.href = canvas.toDataURL();
      link.click();
    }
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
            LGBT-fy Profile Picture
          </h1>
          <p className='text-base md:text-lg' style={{ color: '#b9bbbe' }}>
            Upload your profile picture and add a pride flag ring!
          </p>
        </div>

        {/* Main tool card */}
        <div
          className='w-full max-w-lg rounded-lg p-8 text-center'
          style={{
            backgroundColor: '#2f3136',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
        >
          {/* Upload button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className='w-1/2 font-semibold py-3 rounded text-white transition-all duration-150 mb-6'
            style={{ backgroundColor: '#5865f2' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = '#4752c4')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = '#5865f2')
            }
          >
            Upload Image
          </button>

          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handleFileUpload}
            className='hidden'
          />

          {isImageEmpty && (
            <div className='mb-6' style={{ color: '#ed4245' }}>
              Please upload a valid image.
            </div>
          )}

          {isImageLoaded ? (
            <>
              <canvas
                ref={canvasRef}
                className='rounded mb-6 mx-auto h-72'
                style={{ border: '1px solid #202225' }}
              />
              <button
                onClick={downloadImage}
                className='w-full font-semibold py-3 px-8 rounded text-white transition-all duration-150'
                style={{ backgroundColor: '#3ba55d' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#2d7d46')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = '#3ba55d')
                }
              >
                Download Image
              </button>
            </>
          ) : (
            <div className='mb-6' style={{ color: '#72767d' }}>
              No image uploaded yet. Please upload an image to proceed.
            </div>
          )}

          {/* Divider */}
          <div className='my-6' style={{ borderTop: '1px solid #40444b' }} />

          {/* Outline Thickness */}
          <div className='my-4 text-left'>
            <label
              className='block mb-2 text-sm font-semibold'
              style={{ color: '#b9bbbe' }}
            >
              Outline Thickness
            </label>
            <input
              type='range'
              min='10'
              max='100'
              value={rainbowWidth}
              onChange={(e) => setRainbowWidth(parseInt(e.target.value))}
              className='w-full accent-indigo-500'
              style={{ accentColor: '#5865f2' }}
            />
          </div>

          {/* Flag Repetitions */}
          <div className='my-4 text-left'>
            <label
              className='block mb-2 text-sm font-semibold'
              style={{ color: '#b9bbbe' }}
            >
              Flag Repetitions
            </label>
            <input
              type='range'
              min='1'
              max='5'
              value={rainbowReps}
              onChange={(e) => setRainbowReps(parseInt(e.target.value))}
              className='w-full'
              style={{ accentColor: '#5865f2' }}
            />
          </div>

          {/* Flag Type Selector */}
          <div className='my-4 text-left'>
            <label
              className='block mb-2 text-sm font-semibold'
              style={{ color: '#b9bbbe' }}
            >
              Select Flag Type
            </label>
            <select
              onChange={handleRainbowTypeChange}
              className='w-full px-4 py-2 rounded text-white'
              style={{
                backgroundColor: '#202225',
                border: '1px solid #40444b',
                color: '#dcddde',
              }}
            >
              <option value='pride'>Pride</option>
              <option value='lesbian'>Lesbian</option>
              <option value='mlm'>MLM</option>
              <option value='bisexual'>Bisexual</option>
              <option value='transgender'>Transgender</option>
              <option value='pansexual'>Pansexual</option>
              <option value='asexual'>Asexual</option>
              <option value='genderfluid'>Genderfluid</option>
              <option value='nonbinary'>Nonbinary</option>
              <option value='queer'>Queer</option>
              <option value='intersex'>Intersex</option>
            </select>
          </div>
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

export default RainbowPFPGenerator;

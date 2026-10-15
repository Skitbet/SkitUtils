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
      <div className='page-shell flex flex-col items-center'>
        {/* Header card */}
        <div className='page-header w-full text-center'>
          <div className='accent-rule' />
          <h1 className='page-title'>
            LGBT-fy Profile Picture
          </h1>
          <p className='page-description text-base md:text-lg'>
            Upload your profile picture and add a pride flag ring!
          </p>
        </div>

        {/* Main tool card */}
        <div className='surface-card w-full max-w-xl p-6 text-center sm:p-8'>
          {/* Upload button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className='button-primary mb-6'
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
            <div className='mb-6 text-sm' style={{ color: 'var(--color-error)' }}>
              Please upload a valid image.
            </div>
          )}

          {isImageLoaded ? (
            <>
              <canvas
                ref={canvasRef}
                className='rounded mb-6 mx-auto h-72'
                style={{ border: '1px solid var(--color-border)' }}
              />
              <button
                onClick={downloadImage}
                className='button-success w-full'
              >
                Download Image
              </button>
            </>
          ) : (
            <div className='mb-6 text-sm' style={{ color: 'var(--color-subtle)' }}>
              No image uploaded yet. Please upload an image to proceed.
            </div>
          )}

          {/* Divider */}
          <div className='my-6 border-t' style={{ borderColor: 'var(--color-border)' }} />

          {/* Outline Thickness */}
          <div className='my-4 text-left'>
            <label
              className='block mb-2 text-sm font-semibold'
              style={{ color: 'var(--color-muted)' }}
            >
              Outline Thickness
            </label>
            <input
              type='range'
              min='10'
              max='100'
              value={rainbowWidth}
              onChange={(e) => setRainbowWidth(parseInt(e.target.value))}
              className='w-full'
              style={{ accentColor: 'var(--color-accent)' }}
            />
          </div>

          {/* Flag Repetitions */}
          <div className='my-4 text-left'>
            <label
              className='block mb-2 text-sm font-semibold'
              style={{ color: 'var(--color-muted)' }}
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
              style={{ accentColor: 'var(--color-accent)' }}
            />
          </div>

          {/* Flag Type Selector */}
          <div className='my-4 text-left'>
            <label
              className='block mb-2 text-sm font-semibold'
              style={{ color: 'var(--color-muted)' }}
            >
              Select Flag Type
            </label>
            <select
              onChange={handleRainbowTypeChange}
              className='themed-control px-4 py-2'
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
            className='button-secondary'
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default RainbowPFPGenerator;

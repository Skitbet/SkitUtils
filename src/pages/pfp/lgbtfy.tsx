import Layout from "@/components/Layout";
import { getFlagColors } from "@/utils/gay";
import React, { useState, useRef, useEffect } from "react";

const RainbowPFPGenerator = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [isImageEmpty, setIsImageEmpty] = useState<boolean>(false);
  const [rainbowColors, setRainbowColors] = useState<string[]>([
    "#FF0000", // Red
    "#FF7F00", // Orange
    "#FFFF00", // Yellow
    "#00FF00", // Green
    "#0000FF", // Blue
    "#4B0082", // Indigo
    "#8B00FF", // Violet
  ]); // Default: Pride rainbow
  const [rainbowWidth, setRainbowWidth] = useState<number>(50); // Default thickness
  const [rainbowReps, setRainbowReps] = useState<number>(1); // Default to 1, so it draws once.
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
    const value = e.target.value;
    setRainbowColors(getFlagColors(value));
  };

  useEffect(() => {
    if (image && isImageLoaded) {
      drawRainbowRing(image);
    }
  }, [image, isImageLoaded, rainbowColors, rainbowWidth, rainbowReps]);

  const drawRainbowRing = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
  
    const canvasSize = 500;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
  
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY);
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Clip the canvas for the circular shape
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
    ctx.restore();
  
    // Repeat the rainbow colors based on the slider value
    const colors = [];
    for (let i = 0; i < rainbowReps; i++) {
        colors.push(...rainbowColors);
    }
  
    const segmentWidth = (2 * Math.PI) / colors.length;

    colors.forEach((color, index) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, index * segmentWidth, (index + 1) * segmentWidth);
        ctx.arc(centerX, centerY, radius - rainbowWidth, (index + 1) * segmentWidth, index * segmentWidth, true);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    });
  };

  

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.download = "rainbow-pfp.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 sm:px-12">
        <div className="text-center max-w-3xl mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            LGBT-fy Profile Picture
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Upload your profile picture!
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-lg text-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white py-3 rounded-lg font-semibold shadow-md transform transition-transform duration-200 hover:scale-105 mb-6"
          >
            Upload Image
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {isImageEmpty && (
            <div className="text-red-500 text-lg mb-6">Please upload a valid image.</div>
          )}

          {isImageLoaded ? (
            <>
              <canvas ref={canvasRef} className="border border-none rounded mb-6 mx-auto h-72" />
              <button
                onClick={downloadImage}
                className="w-full inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg shadow-md transform transition-all hover:scale-105"
              >
                Download Image
              </button>
            </>
          ) : (
            <div className="text-gray-400 mb-6">No image uploaded yet. Please upload an image to proceed.</div>
          )}

          {/* Rainbow thickness slider */}
          <div className="my-4">
            <label className="text-white mr-4">Outline Thickness</label>
            <input
              type="range"
              min="10"
              max="100"
              value={rainbowWidth}
              onChange={(e) => setRainbowWidth(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="my-4">
            <label className="text-white mr-4">Flag Repetitions</label>
            <input
                type="range"
                min="1"
                max="5" // You can set the maximum repetitions you want
                value={rainbowReps}
                onChange={(e) => setRainbowReps(parseInt(e.target.value))}
                className="w-full"
            />
          </div>

          {/* Rainbow type selector */}
          <div className="my-4">
            <label className="text-white mr-4">Select Flag Type</label>
            <select
              onChange={handleRainbowTypeChange}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              <option value="pride">Pride</option>
                <option value="bisexual">Bisexual</option>
                <option value="pansexual">Pansexual</option>
                <option value="transgender">Transgender</option>
                <option value="asexual">Asexual</option>
                <option value="genderfluid">Genderfluid</option>
                <option value="lesbian">Lesbian</option>
                <option value="nonbinary">Nonbinary</option>
                <option value="queer">Queer</option>
                <option value="intersex">Intersex</option>
            </select>
          </div>
        </div>
        <div className="mt-8 mb-10 w-full text-center">
          <a
            href="/pfp"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default RainbowPFPGenerator;

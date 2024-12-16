// pages/index.tsx

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500">
        Welcome to Next.js with TypeScript and Tailwind CSS!
      </h1>
    </div>
  )
}

export default Home

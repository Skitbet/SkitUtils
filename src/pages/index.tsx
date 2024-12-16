import Layout from '@/components/Layout'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white px-6 sm:px-12">
        
        <div className="text-center max-w-3xl mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-blue-400">
            Welcome to Skitty Utils
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Your go-to place for basic utilities like profile picture getters, and more tools coming soon!
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6 md:space-y-8">
          <a
            href="/pfp"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform transition-all hover:scale-105"
          >
            Get Profile Picture
          </a>
          <a
            href="/"
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform transition-all hover:scale-105"
          >
            Coming Soon
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default Home

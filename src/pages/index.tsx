import Layout from '@/components/Layout'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-6 sm:px-12">
        
        <div className="text-center max-w-3xl mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-blue-400 drop-shadow-md">
            Welcome to Skitty Utils
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Your go-to place for basic utilities like profile picture getters, and more tools coming soon!
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          <a
            href="/pfp"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform transition-transform hover:scale-110"
          >
            Get Profile Picture
          </a>
          <a
            href="/"
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform transition-transform hover:scale-110"
          >
            Coming Soon
          </a>
        </div>
      </div>
    </Layout>
  )
}

export default Home
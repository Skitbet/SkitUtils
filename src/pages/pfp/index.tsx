import Layout from '@/components/Layout'
import type { NextPage } from 'next'

const PfpPage: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white px-6 sm:px-12">

        <div className="text-center max-w-3xl mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-blue-400">
            Get Your Profile Picture (PFP) Here
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Trying to find a profile picture someone uses? Here you can access profile pictures across many websites!
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6 md:space-y-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-xs text-center">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Roblox PFPs</h2>
            <p className="text-gray-300 mb-4">Get someones PFP via their Roblox Username or ID.</p>
            <a
              href="/pfp/roblox"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform transition-all hover:scale-105"
            >
              Get Roblox PFP
            </a>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-xs text-center">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">Discord PFPs (Soon)</h2>
            <p className="text-gray-300 mb-4">Coming soon: Get someones PFP via their Discord ID.</p>
            <a
              href="/pfp/discord"
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transform transition-all hover:scale-105"
            >
              Coming Soon
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PfpPage

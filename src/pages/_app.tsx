// pages/_app.tsx

import type { AppProps } from 'next/app'
import '../styles/globals.css' // Import global styles

// Ensure you return a React component
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp

import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.href = '/login'
    }
  }, [])
  return null
}

export default Home

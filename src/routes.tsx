import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './pages/auth/auth.context'
import PrivateRoutes from './privateRoutes'

const Home = React.lazy(() => import('./pages'))
const Login = React.lazy(() => import('./pages/auth/login'))
const Profile = React.lazy(() => import('./pages/dashboard/profile'))

const Loading = () => <p>Loading ...</p>

const Router = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <PrivateRoutes>
                  <Profile />
                </PrivateRoutes>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.Suspense>
  )
}

export default Router

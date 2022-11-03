import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './pages/auth/auth.context'
import PrivateRoutes from './privateRoutes'
import Loader from '../src/components/loader/loader'
import Error404 from './pages/error404/error404'

const Home = React.lazy(() => import('./pages'))
const Login = React.lazy(() => import('./pages/auth/login'))
const Profile = React.lazy(() => import('./pages/dashboard/profile'))

const Router = () => {
  return (
    <React.Suspense fallback={<Loader />}>
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
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </React.Suspense>
  )
}

export default Router

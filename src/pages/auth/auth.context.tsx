/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { authentication } from '../../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = React.createContext<any>(null)

const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user: any) => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

/* eslint-disable no-undef */
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const authentication = getAuth(app)

/* eslint-disable @typescript-eslint/no-explicit-any */
import './profile.css'
import LOGO from '../../assets/NC_Logo.jpeg'
import { signOut } from 'firebase/auth'
import { authentication } from '../../utils/firebase'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../auth/auth.context'
import Req from '../../api/requesstProcesssor'
import { ToastContainer, toast } from 'react-toastify'
import { emailPattern } from '../../utils/contants'

interface IProfile {
  name: string
  email: string
}

const toastObj: any = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const [details, setDetails] = useState<IProfile>({ name: '', email: '' })
  const [loading, setLoading] = useState<boolean>(false)
  const [displayName, setDisplayName] = useState<string>('')

  useEffect(() => {
    const getUser = async () => {
      const res = await Req.get(`/${currentUser.phoneNumber}`)
      if (res.status === 200) {
        if (res.data) {
          setDetails({ name: res.data.name, email: res.data.email })
          setDisplayName(res.data.name)
        }
      } else {
        toast.error(res.message, toastObj)
      }
    }
    if (currentUser.phoneNumber) {
      getUser()
    }
  }, [currentUser])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // validation
    if (details.name.length < 1) {
      toast.error('Name is required', toastObj)
      return
    } else if (!emailPattern.test(details.email)) {
      toast.error('Invalid email', toastObj)
      return
    }
    const payload = {
      name: details.name,
      email: details.email,
      phoneNumber: currentUser.phoneNumber,
    }
    setLoading(true)
    const res = await Req.put('/', payload)
    setLoading(false)
    setDisplayName(details.name)
    if (res.status === 201) {
      toast.success(res.message, toastObj)
    } else {
      toast.error(res.message, toastObj)
    }
  }

  const handleLogout = () => {
    signOut(authentication)
      .then(() => {
        // Sign-out successful.
      })
      .catch(() => {
        // An error happened.
      })
  }
  return (
    <>
      <ToastContainer />
      <div>
        <div className="pr-header">
          <div className="pr-logo">
            <img src={LOGO} alt="LOGO" />
          </div>
          <button
            className="pr-logout-btn"
            type="button"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i>logout
          </button>
        </div>
        <div className="pr-details">
          <div>
            <div className="pr-name">
              {details.email ? `Welcome ${displayName}` : 'Update your profile'}
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={details.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={details.email}
                onChange={handleChange}
              />
              <button type="submit">{loading ? 'Loading...' : 'Save'}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile

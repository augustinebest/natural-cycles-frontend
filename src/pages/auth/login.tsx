/* eslint-disable @typescript-eslint/no-explicit-any */
import './auth.css'
import LOGO from '../../assets/NC_Logo.jpeg'
import { Navigate } from 'react-router-dom'
import { authentication } from '../../utils/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import PhoneInput from 'react-phone-input-2'
import { AuthContext } from './auth.context'

const generateRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    'recaptcha-container',
    {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
      },
    },
    authentication,
  )
}

interface ILoginDetail {
  phoneNumber: string
  otp: string
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

const Login = () => {
  const [otpStatus, setOtpStatus] = useState<boolean>(false)
  const [values, setValue] = useState<ILoginDetail>({
    phoneNumber: '',
    otp: '',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const { currentUser } = useContext(AuthContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!otpStatus) {
      if (values.phoneNumber.length < 1) {
        toast.error('Invalid phone number', toastObj)
        return
      }
      generateRecaptcha()
      const appVerifier = window.recaptchaVerifier
      setLoading(true)
      signInWithPhoneNumber(authentication, values.phoneNumber, appVerifier)
        .then((confirmationResult) => {
          setLoading(false)
          window.confirmationResult = confirmationResult
          setOtpStatus(true)
          toast.success('OTP sent to your phone number', toastObj)
        })
        .catch(() => {
          toast.error('Error ocurred while sending OTP', toastObj)
          setLoading(false)
        })
    } else {
      const confirmationResult = window.confirmationResult
      setLoading(true)
      confirmationResult
        .confirm(values.otp)
        .then(() => {
          setLoading(false)
        })
        .catch(() => {
          toast.error('Invalid verification code', toastObj)
          setLoading(false)
        })
    }
  }

  const handlePhoneChange = (value: any, country: any, e: any) => {
    setValue({ ...values, [e.target.name]: e.target.value })
  }

  const isValidPhoneNumber = (value: any, country: any) => {
    if (value.match(/12345/)) {
      return 'Invalid value: ' + value + ', ' + country
    } else if (value.match(/1234/)) {
      return false
    } else {
      return true
    }
  }

  if (currentUser) return <Navigate to="/profile" replace />

  return (
    <>
      <ToastContainer />
      <div className="at-frame">
        <div>
          <div className="at-description">
            <h3>Prevent pregnancy today, plan for tomorrow…</h3>
            <h5>Find out if Natural Cycles works for you!</h5>
          </div>
        </div>
        <div>
          <div className="at-login-section">
            <div className="at-logo">
              <img src={LOGO} alt="LOGO" />
            </div>
            <div className="at-login">Login your Account</div>
            <form onSubmit={handleSubmit}>
              <PhoneInput
                country={'ng'}
                value={values.phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Enter your phone number"
                inputProps={{
                  name: 'phoneNumber',
                  required: true,
                }}
                disabled={otpStatus ? true : false}
                isValid={isValidPhoneNumber}
              />
              {otpStatus && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  name="otp"
                  value={values.otp}
                  onChange={handleChange}
                  required={true}
                  maxLength={6}
                />
              )}
              <button type="submit">
                {loading ? 'Loading...' : !otpStatus ? 'Login' : 'Verify'}
              </button>
              <div id="recaptcha-container"></div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

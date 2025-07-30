import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router'
import { BASE_URL } from '../utils/constants'
import SignUp from './SignUp'

const Login = () => {
  const [formData, setFormData] = useState({
    emailID: "",
    password: ""
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    
    // Clear previous errors
    setErrorMessage(null)
    
    // Basic validation
    if (!formData.emailID.includes('@')) {
      setErrorMessage("Please enter a valid email address")
      return
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters")
      return
    }

    try {
      setIsSubmitting(true)
      
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailID: formData.emailID,
          password: formData.password
        },
        { withCredentials: true }
      )

      dispatch(addUser(res.data))
      navigate("/")
      
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || 
        err.message || 
        "Login failed. Please check your credentials."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (showSignUp) {
    return <SignUp setShowSignUp={setShowSignUp} />
  }

  return (
    <form onSubmit={handleLogin} className="fieldset bg-base-200 border-base-300 my-10 rounded-box w-xs border p-4 m-auto">
      <legend className="fieldset-legend text-3xl">Login</legend>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          name="emailID"
          value={formData.emailID}
          className="input input-bordered"
          placeholder="Email"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          className="input input-bordered"
          placeholder="Password"
          onChange={handleChange}
          required
          minLength={6}
        />
      </div>

      {errorMessage && (
        <div className="alert alert-error mt-4">
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-6">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Login"
          )}
        </button>

        <button 
          type="button"
          className="btn btn-ghost"
          onClick={() => setShowSignUp(true)}
        >
          New User? Sign Up
        </button>
      </div>
    </form>
  )
}

export default Login
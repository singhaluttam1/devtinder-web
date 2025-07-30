import axios from 'axios'
import { useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useNavigate } from 'react-router'
import UserForm from './UserForm'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
const SignUp = ({ setShowSignUp }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    emailID: '',
    password: '',
    gender: '',
    age: '',
    photourl: '',
    about: ''
  })
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
    const onSwitchToLogin = () => {
    navigate('/login');
  };

  const handleSignup = async (e) => {
    e.preventDefault(); 
    
    // Clear previous errors
    setErrorMessage(null)

    // Validation
    if (!userData.firstName.trim()) {
      setErrorMessage("First name is required")
      return
    }
    if (!userData.lastName.trim()) {
      setErrorMessage("Last name is required")
      return
    }
    if (!userData.emailID.includes('@')) {
      setErrorMessage("Please enter a valid email address")
      return
    }
    if (userData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters")
      return
    }

    try {
      setIsSubmitting(true)
      
      const res = await axios.post(
        `${BASE_URL}/signup`,
        userData,
        { withCredentials: true }
      )
      dispatch(addUser(res.data.data))

      navigate("/profile")
      
      
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || 
        err.message || 
        "Signup failed. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <UserForm 
      userData={userData}
      setUserData={setUserData}
      onSubmit={handleSignup}
      errorMessage={errorMessage}
      formName="Sign Up"
      showAuthFields={true}
      isSubmitting={isSubmitting}
      onSwitchToLogin={() => setShowSignUp(false)}
    />
  )
}

export default SignUp
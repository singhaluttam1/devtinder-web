import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import Navbar from './Navbar'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'


const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      });
      dispatch(addUser(res.data))
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
        return;
      }
    }
  }

  useEffect(() => {
    if (!userData) {
      fetchUser()
    }
  }, [userData])

  return (
    <div className='min-h-screen flex flex-col bg-base-200'> 
      <Navbar />
      <div className='flex-grow pb-20'>

      <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Body
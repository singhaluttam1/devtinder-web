import { useState } from 'react'
import Card from './Card'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import UserForm from './UserForm'

const EditProfile = ({ user }) => {
    const [userData, setUserData] = useState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        gender: user.gender || "",
        age: user.age || "",
        photourl: user.photourl || "",
        about: user.about || ""
    })
    const [errorMessage, setErrorMessage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useDispatch()
    const [showToast, setShowToast] = useState(false)

    const saveProfile = async () => {
        const { firstName, lastName, gender, age, photourl, about } = userData
        
        try {
            setIsSubmitting(true)
            setErrorMessage(null)
            
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                gender,
                age,
                photourl,
                about
            }, {
                withCredentials: true
            })
            
            dispatch(addUser(res.data?.data))
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message || "Failed to save profile")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <div className='flex justify-center my-10'>
                <UserForm
                    userData={userData}
                    setUserData={setUserData}
                    onSubmit={saveProfile}
                    errorMessage={errorMessage}
                    isSubmitting={isSubmitting}
                     formName="Edit Profile"
                />
                <Card user={userData} showActions={false} />
            </div>
            
            {/* Error Toast */}
            {errorMessage && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-error">
                        <span>{errorMessage}</span>
                    </div>
                </div>
            )}
            
            {/* Success Toast */}
            {showToast && (
                <div className="toast toast-bottom toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully.</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditProfile
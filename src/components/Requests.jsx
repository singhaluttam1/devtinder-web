import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'
const Requests = () => {
    const dispatch = useDispatch()
    const requests = useSelector(store => store.requests)
    const [showToast, setShowToast] = useState(false)
    const reviewRequest = async (status, requestId, fromUserId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + fromUserId, {}, {
                withCredentials: true
            })
            dispatch(removeRequest({ _id: requestId }))
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 2000);

        } catch (error) {
            console.error("Error processing request", error)
        }
    }
    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests", {
                withCredentials: true
            })
            dispatch(addRequests(res.data?.data))
        } catch (error) {
            console.error("Error fetching requests", error)
        }


    }
    useEffect(() => {
        fetchRequest()
    }, [])
    if (!requests) return
    if (requests.length === 0) return <h1 className='text-center mt-10 text-xl'>("No Requests Found")</h1>
    return (<>
        <div className='text-center my-10'>
            <h1 className=' font-bold text-4xl '>Connection Requests</h1>
            {requests.map((request) => {
                const { _id, firstName, lastName, photourl, age, gender, about } = request?.fromUserId
                return (
                    <div key={_id} className='flex items-center m-4 p-4 border rounded-lg bg-base-100 shadow-md w-1/2 mx-auto'>
                        <img src={photourl} alt={`${firstName} ${lastName}`} className='w-20 h-20 rounded-full ml-2' />
                        <div className='m-auto'>
                            <h2 className='text-lg font-semibold'>{firstName} {lastName}</h2>
                            {age && gender && <p>{age + " " + gender}</p>}
                            <h2>{about}</h2>

                        </div>
                        <div className='flex gap-2 ml-auto'>
                            <button className="btn btn-active btn-primary cursor-pointer" onClick={() => reviewRequest("rejected", request._id, request?.fromUserId?._id)}>Reject</button>
                            <button className="btn btn-active btn-secondary cursor-pointer" onClick={() => reviewRequest("accepted", request._id, request?.fromUserId?._id)}>Accept</button>
                        </div>
                    </div>


                )
            })}
        </div>
        {showToast && (
            <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Request Reviewed successfully.</span>
                </div>
            </div>
        )}
    </>
    )
}

export default Requests

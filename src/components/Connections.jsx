import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector(user => user.connections)
    const fetchConnection = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            })
            dispatch(addConnections(res.data?.data))
        } catch (error) {
            console.error("Error fetching connections", error)
        }
    }
    useEffect(() => {
        fetchConnection()
    }, []) // Empty dependency array to run only once on mount
    if (!connections) return
    if (connections.length === 0) return <h1>No Connections Found</h1>

    return (

        <div className='text-center my-10'>
            <h1 className=' font-bold text-4xl '>Connections</h1>
            {connections.map((connection) => {
                const {_id, firstName, lastName, photourl, age, gender, about } = connection
                return (
                    <div key={_id} className='flex items-center m-4 p-4 border rounded-lg bg-base-100 shadow-md w-1/2 mx-auto'>
                        <img src={photourl} alt={`${firstName} ${lastName}`} className='w-20 h-20 rounded-full ml-2' />
                        <div className='m-auto'>
                            <h2 className='text-lg font-semibold'>{firstName} {lastName}</h2>
                            {age && gender && <p>{age + " " + gender}</p>}
                            <h2>{about}</h2>

                        </div>
                    </div>)
            })}
        </div>
    )
}

export default Connections

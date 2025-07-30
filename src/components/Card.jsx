import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { removeUserFromfeed } from "../utils/feedSlice"
const Card = ({ user, showActions = true }) => {
    const dispatch = useDispatch()
    const handleSendRequest = async (status,userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {
                withCredentials: true
            })
            dispatch(removeUserFromfeed(userId))
        } catch (error) {
            console.error("Error sending request", error)

        }
    }
    const {_id, about, firstName, lastName, age, gender, photourl, skills } = user

    return (
        <div className="card bg-base-100 w-76 h-auto shadow-xl mt-18 mx-auto">
            <figure>
                <img
                    src={photourl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <div className="card-actions justify-end">
                    <p>Age: {age}</p>
                    <p>Gender: {gender}</p>
                    <p>{about}</p>
                    <p>{skills}</p>
                    {showActions && <div className='card-actions justify-center mx-auto my-4'>
                        <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Igonre</button>
                        <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Card

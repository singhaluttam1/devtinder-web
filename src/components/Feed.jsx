import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addfeed } from '../utils/feedSlice'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import Card from './Card'

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)

  useEffect(() => {
    const getFeed = async () => {
      if (feed) return
      try {
        const res = await axios.get(BASE_URL + "/feedcards",{
          withCredentials: true
        })
        dispatch(addfeed(res.data))
      } catch (error) {
        console.error("Error fetching feed", error)
      }
    }

    getFeed()
  }, []) // add dependencies
  if(!feed || feed.length === 0) {  
    return <div className="text-center my-10">No New User found in the feed</div>
  } 

  return (
    (feed &&

      <div>
      <Card user={feed[0]}/>
      
    </div>
    )
  )
}

export default Feed
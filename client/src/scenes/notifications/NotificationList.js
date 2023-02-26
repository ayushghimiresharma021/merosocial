import { useTheme } from '@emotion/react'
import React from 'react'
import { useSelector } from 'react-redux'

function NotificationList() { 
    const  {userId }= useSelector((state) => state.user)
    const {palette} =  useTheme()
    const Notification  = async() =>{
        const response = await fetch(`http://localhost:3001/notifications/${userId}`)
    }
  return (
    <div>
      
    </div>
  )
}

export default NotificationList

import React, { useEffect, useState } from 'react'
import EmptyAddictionsList from '@/components/emptyaddictionslist'
import { useAuthStore } from '@/store/authStore'
import { useAutoRefreshToken } from '@/helpers/checkAuth'
import { useAddictionStore } from '@/store/addictionStore'
import AddictionCard from '@/components/addictionCard'

const MainPage = () => {
  /// when access token expires, refresh function creates new access token
  useAutoRefreshToken();

  const refreshToken = useAuthStore((state)=>state.refreshToken)
  const accessToken = useAuthStore((state)=>state.accessToken)

  const addictions = useAddictionStore((state) => state.addictions);
  const getAddictionsByUser = useAddictionStore((state)=>state.getAddictionByUser)

  useEffect(()=>{
     getAddictionsByUser()
  },[getAddictionsByUser, accessToken]);

  console.log('access', accessToken);
  console.log('refresh' , refreshToken)
  
  return (
    <div className="p-4">
      {addictions.length === 0 ? (
        <EmptyAddictionsList/>
      ) : (
        <div className='flex flex-wrap justify-center gap-6'>
          {addictions.map((a)=>(
            <AddictionCard addiction={a} key={a.id}/>
          ))}
        </div>
      )}
    </div>
  )
}
export default MainPage
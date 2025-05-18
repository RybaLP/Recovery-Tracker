import React, { useEffect, useState } from 'react'
import EmptyAddictionsList from '@/components/emptyaddictionslist'
import { useAuthStore } from '@/store/authStore'
import {jwtDecode} from "jwt-decode"
import { useAutoRefreshToken } from '@/helpers/checkAuth'
import { fetchAddictionsByUser } from '@/api/addictionApi'
import { Addiction } from '@/types/addiction'
import { useAddictionStore } from '@/store/addictionStore'


const MainPage = () => {
  /// when access token expires, refresh function creates new access token
  useAutoRefreshToken();

  const refresh = useAuthStore((state)=>state.refresh)
  const refreshToken = useAuthStore((state)=>state.refreshToken)
  const accessToken = useAuthStore((state)=>state.accessToken)
  const addictions = useAddictionStore((state) => state.addictions);
  const getAddictionsByUser = useAddictionStore((state)=>state.getAddictionByUser)
  const loading = useAddictionStore((state) => state.loading);
  const error = useAddictionStore((state) => state.error);

  useEffect(()=>{
     getAddictionsByUser()
  },[getAddictionsByUser])

  console.log('access', accessToken);
  console.log('refresh' , refreshToken)
  
   return (
    <div>
      {addictions.length === 0 ? (
        <EmptyAddictionsList />
      ) : (
        <ul>
          {addictions.map((addiction) => (
            <li key={addiction.id}>{addiction.addictionName}</li> 
          ))}
        </ul>
      )}
    </div>
  );
}

export default MainPage
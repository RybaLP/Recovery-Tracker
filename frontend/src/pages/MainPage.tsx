import React, { useEffect } from 'react'
import EmptyAddictionsList from '@/components/emptyaddictionslist'
import { useAuthStore } from '@/store/authStore'
import {jwtDecode} from "jwt-decode"
import { useAutoRefreshToken } from '@/helpers/checkAuth'

const MainPage = () => {

  /// when access token expires, refresh function creates new access token
  useAutoRefreshToken();

  const accessToken = useAuthStore((state)=>state.accessToken);
  const refreshToken = useAuthStore((state)=>state.refreshToken);
  const refresh = useAuthStore((state)=>state.refresh);

 
  console.log('this is my accces token : ' , accessToken);
  console.log("and this is my refreh token : " , refreshToken);
 
  return (
    <div>

      <EmptyAddictionsList/>
    </div>
  )
}

export default MainPage
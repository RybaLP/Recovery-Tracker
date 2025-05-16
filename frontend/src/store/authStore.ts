import { create } from "zustand";
import { AuthState, Tokens } from "@/types/auth";
import { LoginUser } from "@/api/userApi";
import { ILoginUser } from "@/interfaces/loginUser";
import { persist, createJSONStorage } from 'zustand/middleware';
import { RefreshToken } from "@/api/tokenApi";

export const useAuthStore = create<AuthState>()(
    persist(
    (set) => ({
    accessToken : undefined,
    refreshToken : undefined,
    isLoggedIn : false, 
    login : async (login : string , password : string) : Promise<boolean> => {
        try {
            const loginData : ILoginUser = {login, password}
            const response = await LoginUser(loginData);
            if(response?.accessToken !== undefined && response?.refreshToken !== undefined){
                set({
                    accessToken : response.accessToken,
                    refreshToken : response.refreshToken,
                    isLoggedIn : true
                })
            }
            return true

        } catch (error) {
            set({accessToken : undefined, refreshToken : undefined, isLoggedIn : false})
            throw error;            
        }
    },
    refresh : async () : Promise<void> => {
       try {
         const refreshToken = useAuthStore().refreshToken;
         if(!refreshToken){
            set({accessToken : undefined, refreshToken : undefined, isLoggedIn : false})
            return;
         }

         const response = await RefreshToken({refreshToken});
         if(response?.accessToken){
            set({
                accessToken : response.accessToken,
                refreshToken : response.refreshToken,
                isLoggedIn : true
            })
         } else {
            set({accessToken : undefined, refreshToken : undefined, isLoggedIn : false})
            return;
         }

       } catch (error) {
            set({
                accessToken : undefined , refreshToken : undefined, isLoggedIn : false
            })
       }

    }, 
    logout : () => {
        /// to do later
        set({accessToken : undefined, refreshToken : undefined, isLoggedIn : false})
        localStorage.removeItem('auth-storage')
    }
}),
    {
        name : 'auth-storage',
        storage : createJSONStorage(()=>localStorage),
    }
))
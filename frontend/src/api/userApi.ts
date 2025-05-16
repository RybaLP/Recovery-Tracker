import { ILoginUser } from "@/interfaces/loginUser";
import { IRegisterUser } from "@/interfaces/registerUser";
import apiClient from "./axiosConfig";
import { REGISTER_URL, LOGIN_URL } from "./constants/endpoints";
import { Tokens } from "@/types/auth";


export const RegisterUser = async (registerData : IRegisterUser) : Promise<void> => {
    try {
      const response = await apiClient.post(REGISTER_URL, registerData);
      console.log("Registered successfuly");
      return response.data;

    } catch (error) {
      throw error;
    }
}

export const LoginUser = async (loginData : ILoginUser) : Promise<Tokens | undefined> => {
    try {
        const response = await apiClient.post(LOGIN_URL, loginData)
        if(response && response.data){
          return response.data as Tokens
        }

    } catch (error) {
        throw error;
    }
}

import { ILoginUser } from "@/interfaces/loginUser";
import { IRegisterUser } from "@/interfaces/registerUser";
import axios from "axios";

const baseUrl : string = "http://localhost:3000"
const registerUrl : string = "/user/register"
const loginUrl : string = "/auth/login"



export const RegisterUser = async (registerData : IRegisterUser) => {
    await axios.post(baseUrl + registerUrl, registerData).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

export const LoginUser = async (loginData : ILoginUser) => {
    await axios.post(baseUrl + loginUrl, loginData).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
}

import axios from "axios";

const baseUrl : string = "http://localhost:3000/auth"


export const fetchLogin = async(credentials : string) => {
    try {
        const response = await axios.post(baseUrl + credentials)
        return response.data;
    } catch (error) {
        throw new Error("");
    }
}

export const registerUser = async(data : string) => {
    try {
        const respone = await axios.post(baseUrl + data)
        
    } catch (error) {
        
    }
}
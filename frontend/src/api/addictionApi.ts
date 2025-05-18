import { Addiction } from "@/types/addiction"
import apiClient from "./axiosConfig"
import { useAuthStore } from "@/store/authStore"

export const fetchAddictionsByUser = async () : Promise<Addiction[]> => {
    try {
        const accessToken = useAuthStore.getState().accessToken;
        const response = await apiClient.get<Addiction[]>(`/addiction`, {
            headers : {
                Authorization : `Bearer ${accessToken}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}
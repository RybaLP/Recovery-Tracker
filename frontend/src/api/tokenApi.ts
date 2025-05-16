import { Tokens } from "@/types/auth";
import { IRefreshToken } from "./interfaces/tokens";
import apiClient from "./axiosConfig";
import { REFRESH_URL } from "./constants/endpoints";
import { IRefreshTokenResponse } from "./interfaces/refreshTokensResponse";

export const RefreshToken = async (refreshToken : IRefreshToken) => {
    try {
        const response = await apiClient.post(REFRESH_URL, refreshToken);
        return response.data;
    } catch (error) {
        throw error
    }
}
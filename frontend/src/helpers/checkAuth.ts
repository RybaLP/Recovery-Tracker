import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

// type JwtPayload = {
//     sub: number;
// }

export const useAutoRefreshToken = () => {
    const accessToken = useAuthStore((s) => s.accessToken);
    // const refreshToken = useAuthStore((s) => s.refreshToken);
    const refresh = useAuthStore((s)=>s.refresh)

    useEffect(() => {
        if (!accessToken) {
            return
        }

        const decoded = jwtDecode(accessToken);
        const expiration = decoded.exp as number * 1000
        const now = Date.now();
        const timeUnitRefresh = expiration - now - 30_000;

        if(timeUnitRefresh <= 0) {
            refresh();
            return;
        }

        const timeoutId = setTimeout(()=>{
            refresh()
        }, timeUnitRefresh)

        return () => clearTimeout(timeoutId);
    }, [accessToken, refresh]);
}
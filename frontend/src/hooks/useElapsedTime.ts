import { useState, useEffect } from "react";
import { getElapsedTime } from "@/helpers/elapsedTime";

export const useElapsedTime = (startTime : Date | string) : string => {
    const [elapsedTime , setElapsedTime] = useState<string>(()=>getElapsedTime(startTime))
    useEffect(()=>{
        const intervalid = setInterval(()=>{setElapsedTime(getElapsedTime(startTime))}, 1000);
        return () => clearInterval(intervalid);
    }, [startTime])
    return elapsedTime
}
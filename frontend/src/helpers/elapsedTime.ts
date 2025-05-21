import {differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays} from 'date-fns'

export const getElapsedTime = (startTime : Date | string) : string => {
    const now = new Date();
    if(startTime > now){
        return "waiting"
    }

    let totalSeconds = differenceInSeconds(now,startTime);

    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    totalSeconds -= days * (60 * 60 * 24);

    const hours = Math.floor(totalSeconds / (60*60));
    totalSeconds -= hours * (60 * 60);

    const minutes = Math.floor(totalSeconds / 60);
    totalSeconds -= 60;

    const seconds = totalSeconds;

    const parts : string[] = [];
    if(days > 0) parts.push(`${days} days`);
    if(hours > 0) parts.push(`${hours} hours`);
    if(minutes > 0) parts.push(`${minutes} minutes`);
    if(seconds >= 0 || parts.length === 0) parts.push(`${seconds} secs`);

    return parts.join(', ');
}
export interface AddictionState {
    date : Date | undefined,
    hours : string, 
    minutes : string,
    addictionName : string,
    setDate : (date : Date | undefined) => void,
    setHours : (hours : string) => void,
    setMinutes : (minutes : string) => void,
    setAddictionName : (name : string) => void;
}


import {create} from "zustand";
import { AddictionState } from "@/interfaces/addictionstate";


const useFormStore = create<AddictionState>((set)=> ({
    date: undefined,
    hours: new Date().getHours().toString().padStart(2, '0'), 
    minutes: new Date().getMinutes().toString().padStart(2, '0'), 
    addictionName: '',
    setDate: (date) => set({ date }),
    setHours: (hours) => set({ hours: hours.padStart(2, '0') }),
    setMinutes: (minutes) => set({ minutes: minutes.padStart(2, '0') }),
    setAddictionName: (name) => set({ addictionName: name }),
}))

export default useFormStore
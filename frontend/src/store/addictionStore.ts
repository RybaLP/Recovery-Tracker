import {create} from "zustand";
import { FormState } from "@/types/formStore";

const useFormStore = create<FormState>((set, get) => ({
  addictionName: '',
  notes: '',
  date: null,
  time: '',
  setAddictionName: (name) => set({ addictionName: name }),
  setNotes: (notes) => set({ notes }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  getFullDateTime: () => {
    const {date, time} = get()
    if(!date || !time) return null

    const [hours, minutes] = time.split(':').map(Number)
    const fullDate = new Date(date)
    fullDate.setHours(hours)
    fullDate.setMinutes(minutes)
    fullDate.setSeconds(0)
    fullDate.setMilliseconds(0)

    return fullDate
  },
  clearForm: () => set({
    addictionName: '',
    notes: '',
    date: null,
    time: '',
  }),
}))

export default useFormStore
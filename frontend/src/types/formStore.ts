export interface FormState {
  addictionName: string
  notes: string
  date: string
  time: string 
  setAddictionName: (name: string) => void
  setNotes: (notes: string) => void
  setDate: (date: string) => void
  setTime: (time: string) => void
  getFullDateTime: () => Date | null
  clearForm: () => void
}
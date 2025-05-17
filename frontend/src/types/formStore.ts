export interface FormState {
  addictionName: string
  notes: string
  date: Date | null
  time: string 
  setAddictionName: (name: string) => void
  setNotes: (notes: string) => void
  setDate: (date: Date | null) => void
  setTime: (time: string) => void
  getFullDateTime: () => Date | null
  clearForm: () => void
}
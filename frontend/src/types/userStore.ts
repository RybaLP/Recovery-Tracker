import { Addiction } from "./addiction"
import { User } from "./user"

export type UserStore = {
    user : User | null,
    addictions : Addiction [],
    setUser : (user : User) => void,
    logout : () => void,
    addAddiction : (addiction : Addiction) => void
    removeAddiction : (addiction : Addiction) => void
    editAddiction : (addiction : Addiction) => void
    resetAddiction : (addiction : Addiction) => void 
}
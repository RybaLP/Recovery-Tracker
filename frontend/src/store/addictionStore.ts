import {create} from "zustand";
import { fetchAddictionsByUser } from "@/api/addictionApi";
import { AddictionStore } from "@/types/addictionStore";

export const useAddictionStore = create<AddictionStore>((set)=>({
    addictions : [],
    loading : false,
    error : null,
    getAddictionByUser : async () => {
        set({loading : true, error : null})
        try {
            const fetchedAddictions = await fetchAddictionsByUser();
            set({addictions : fetchedAddictions , loading : false});
        } catch (error) {
            set({error : "error", loading : false})
        }
    },
}))
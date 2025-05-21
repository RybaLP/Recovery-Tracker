import { CiSquarePlus } from "react-icons/ci";
import { Card, CardTitle } from './ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from './ui/button';
import Navbar from './Navbar';
import TimePicker from "./timepicker";
import DatePicker from "./datehtmlpicker";
import toast, {Toaster} from "react-hot-toast";
import { ComboboxDemo } from '@/components/ui/combobox'
import useFormStore from "@/store/formStore";
import { DatePickerDemo } from "./ui/datepicker";


const EmptyAddictionsList = () => {

    const createdSuccessfuly = () => toast("Addiction created successfuly! ");

    const time = useFormStore().time;
    const notes = useFormStore().notes;
    const addictionName = useFormStore().addictionName;

    const date = useFormStore((state)=>state)
    const getFullDateTime = useFormStore().getFullDateTime
    const clearForm = useFormStore().clearForm

    const hanndleSave = () => {
        if(!addictionName){
            toast.error("Please select an addiction")
        }        
        if(!date){
            toast.error("Please pick a date")
        }
        if(!time){
            toast.error("Please pick time")
        }
        const fullDate = getFullDateTime();
        if(!fullDate){
            toast.error("Invalid date/time combination");
            return;
        }

        toast.success("Addiction created successfuly! ");
        clearForm();
    }

    return (
        <>
            <Navbar />
            <div>
                <Card className='flex flex-col items-center p-15 overflow-visible'>

                    <CardTitle>
                        Any addictions yet?
                    </CardTitle>

                    <p>Click down there to add your addiction to track!</p>

                    <Dialog>
                        <DialogTrigger asChild>
                            <CiSquarePlus size={60} className='hover:cursor-pointer' />
                        </DialogTrigger>
                  <DialogContent
                    className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen flex items-center flex-col"}
                    >
                            <DialogHeader>
                                <DialogTitle>Add Addiction</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="name">
                                        Addiction
                                    </Label>
                                    <div className="p-4">
                                        <ComboboxDemo/>
                                    </div>
                
                                </div>

                                <div className='flex gap-5 overflow-visible'>
                                    <p>Choose Date</p>
                                    <DatePicker/>
                                </div>

                                <div className='flex gap-5'><p>Chose since when</p>
                                    <TimePicker/>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="submit" onClick={hanndleSave}>Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </Card>
                <Toaster/>
            </div>
        <ComboboxDemo/>
        </>
    )
}

export default EmptyAddictionsList



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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from './ui/button';
import Navbar from './Navbar';
import { DatePickerDemo } from "./ui/datepicker";
import TimePicker from "./timepicker";
import useFormStore from "@/store";
import DatePicker from "./datehtmlpicker";
import { useState } from "react";
import toast, {Toaster} from "react-hot-toast";

const EmptyAddictionsList = () => {

    const createdSuccessfuly = () => toast("Addiction created successfuly! ");


    const addictionName = useFormStore((state) => state.addictionName);
    const setAddictionName = useFormStore((state) => state.setAddictionName);
    const date = useFormStore((state) => state.date);
    const hours = useFormStore((state) => state.hours);
    const minutes = useFormStore((state) => state.minutes);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const hanndleSave = () => {
        console.log('Zapisuję:', { addictionName, date, hours, minutes });
        console.log("", isDialogOpen);
        setIsDialogOpen(false);
        createdSuccessfuly();
        console.log("setted to false", isDialogOpen);

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

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <CiSquarePlus size={60} className='hover:cursor-pointer' />
                        </DialogTrigger>
                        <DialogContent className="!overflow-visible sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Addiction</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Addiction
                                    </Label>
                                    <Input className="col-span-3" value={addictionName} onChange={(e)=>setAddictionName(e.target.value)}/>
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
        </>
    )
}

export default EmptyAddictionsList



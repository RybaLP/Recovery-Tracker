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
import DatePicker from "./datehtmlpicker";
import { useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import { ComboboxDemo } from '@/components/ui/combobox'


const EmptyAddictionsList = () => {

    const createdSuccessfuly = () => toast("Addiction created successfuly! ");

    const hanndleSave = () => {
        // console.log('Zapisuję:', { addictionName, date, hours, minutes });
        // console.log("", isDialogOpen);
        // setIsDialogOpen(false);
        // createdSuccessfuly();
        // console.log("setted to false", isDialogOpen);

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



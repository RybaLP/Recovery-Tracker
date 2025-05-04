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
import { TimePickerDemo } from './ui/timepicker';
import { useState } from 'react';
import { DatePickerDemo } from "./ui/datepicker";

const EmptyAddictionsList = () => {

    const [date, setDate] = useState<Date | undefined>(undefined);
    const [addiction, setAddiction] = useState("");

    return (
        <>
            <Navbar />
            <div>

                <Card className='flex flex-col items-center p-15'>

                    <CardTitle>
                        Any addictions yet?
                    </CardTitle>

                    <p>Click down there to add your addiction to track!</p>

                    <Dialog>
                        <DialogTrigger asChild>
                            <CiSquarePlus size={60} className='hover:cursor-pointer' />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] overflow-visible">
                            <DialogHeader>
                                <DialogTitle>Add Addiction</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Addiction
                                    </Label>
                                    <Input id="name" value="addiction example" className="col-span-3" />
                                </div>

                                <div className='flex gap-5'>
                                    <p>Choose Date</p>

                                </div>

                                <div className='flex gap-5'><p>Chose since when</p><TimePickerDemo date={date} setDate={setDate}/></div>
                            </div>

                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </Card>

            </div>
        </>
    )
}

export default EmptyAddictionsList

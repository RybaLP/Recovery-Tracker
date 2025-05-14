import React, { useState } from 'react'
import useFormStore from '@/store';

const TimePicker = () => {

    const hours = useFormStore((state) => state.hours);
    const minutes = useFormStore((state) => state.minutes);
    const setHours = useFormStore((state) => state.setHours);
    const setMinutes = useFormStore((state) => state.setMinutes);

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        const [newHours, newMinutes] = event.target.value.split(':');
        if (newHours !== undefined) {
            setHours(newHours);
        }
        if (newMinutes !== undefined) {
            setMinutes(newMinutes);
        }
    }

    return (
        <div>
            <input type='time' value={`${hours}:${minutes}`} onChange={handleTimeChange}></input>
        </div>
    )
}

export default TimePicker


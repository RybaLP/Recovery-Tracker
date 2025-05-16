import React, { useState } from 'react'
// import useFormStore from '@/store';

const TimePicker = () => {



    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        // const [newHours, newMinutes] = event.target.value.split(':');
        // if (newHours !== undefined) {
        //     setHours(newHours);
        // }
        // if (newMinutes !== undefined) {
        //     setMinutes(newMinutes);
        // }
    }

    return (
        <div>
            <input type={'time'}></input>
        </div>
    )
}

export default TimePicker


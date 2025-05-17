import React from 'react';
import { useAuthStore } from '@/store/authStore';
import useFormStore from '@/store/addictionStore';

const DatePicker = () => {

  const date = useFormStore((state)=>state.date)
  const setDate = useFormStore((state)=>state.setDate)

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const newDateString = event.target.value;
     setDate(newDateString);
  };

  return (
    <div>
      <input type="date" value={date} onChange={handleDateChange} className='border p-2 rounded' />
    </div>
  );
};

export default DatePicker;
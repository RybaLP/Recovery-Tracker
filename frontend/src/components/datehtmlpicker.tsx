import React from 'react';
import useFormStore from '@/store/formStore';

const DatePicker = () => {

  const date = useFormStore((state)=>state.date)
  const setDate = useFormStore((state)=>state.setDate)

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDate(event.target.value)
  };

  return (
    <div>
      <input type="date" value={date} onChange={handleDateChange} className='border p-2 rounded' />
    </div>
  );
};

export default DatePicker;
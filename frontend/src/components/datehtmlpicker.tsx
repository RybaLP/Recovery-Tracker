import React from 'react';
import useFormStore from '@/store';

const DatePicker = () => {
  const date = useFormStore((state) => state.date);
  const setDate = useFormStore((state) => state.setDate);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDateString = event.target.value;
    setDate(newDateString ? new Date(newDateString) : undefined);
  };

  return (
    <div>
      <input
        type="date"
        value={date ? date.toISOString().slice(0, 10) : ''}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePicker;
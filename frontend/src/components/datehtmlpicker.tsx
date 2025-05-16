import React from 'react';

const DatePicker = () => {


  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDateString = event.target.value;
  };

  return (
    <div>
      <input
        type="date"

        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePicker;
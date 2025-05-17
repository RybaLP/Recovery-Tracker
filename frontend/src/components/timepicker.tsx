import React from 'react'
import useFormStore from '@/store/addictionStore'

const TimePicker = () => {
  const time = useFormStore((state) => state.time)
  const setTime = useFormStore((state) => state.setTime)

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value)
  }

  return (
    <div>
      <input
        type="time"
        value={time}
        onChange={handleTimeChange}
        className="border rounded px-2 py-1"
      />
    </div>
  )
}

export default TimePicker

import React, { useState, FormEvent } from 'react';

const Todo = () => {
  const [hours, setHours] = useState("#DAY-DAY: TIME AM - TIME PM");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHours(e.target.value);
  };

  // Prevent form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2 flex items-center gap-4">
      <label className="font-semibold text-black mr-2" htmlFor="business-hours">Hours:</label>
      <input 
        className="border rounded px-2 py-1 w-64" 
        placeholder="Hours"
        type="text" 
        value={hours} 
        onChange={handleChange}
        id="business-hours" 
        name="business-hours"
      />
    </form>
  );
};

export default Todo; 
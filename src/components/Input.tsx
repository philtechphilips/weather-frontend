// Reusable Input component
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div className="mb-4">
    {label && <label className="block mb-1 font-medium">{label}</label>}
    <input
      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      {...props}
    />
  </div>
);

export default Input;

"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'

interface MyComponentProps {
  label: string;
  value: string;
  type: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  inputWidth?: string
  error?: string
}

const InputField: React.FC<MyComponentProps> = ({ label, value, type, onChange, placeholder, inputWidth, error }) => {

  return (
    <div className="flex flex-col space-y-1.5">
      <h1 className='font-black'>{label}</h1>
      <Input style={{ width: inputWidth }}
        className=" font-semibold bg-[#d2d8e1] dark:bg-gray-900 text-gray-800 border-gray-300 p-2 rounded dark:text-white"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
        error={error}
      />
    </div>

  );
};


export default InputField
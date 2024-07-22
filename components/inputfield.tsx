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
}

const InputField: React.FC<MyComponentProps> = ({ label, value, type, onChange, placeholder, inputWidth }) => {

  return (
    <div className="flex flex-col space-y-1.5">
      <h1>{label}</h1>
      <Input style={{ width: inputWidth }}
        className="bg-[#d8dbe0] text-gray-800 border-gray-300 p-2 rounded"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
};


export default InputField
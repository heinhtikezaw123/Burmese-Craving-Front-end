'use client';
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

export const Input = ({ label, ...props }: InputProps) => (
    <div className="w-full mb-4">
        {label && <label className="block text-sm mb-1 font-medium">{label}</label>}
        <input
            {...props}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

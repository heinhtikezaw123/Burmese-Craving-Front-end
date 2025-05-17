'use client';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
};

export const Button = ({ label, ...props }: ButtonProps) => (
    <button
        {...props}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
    >
        {label}
    </button>
);

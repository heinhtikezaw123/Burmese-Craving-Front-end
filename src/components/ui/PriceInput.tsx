'use client';
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

export const PriceInput = ({ label, error, ...props }: InputProps) => {
    return (
        <div className="flex items-center border px-3 py-2 rounded-md focus:border-primary focus-within:ring-2 focus-within:ring-primary/50 hover:border-primary">
            <span className="mr-2 text-gray-400">$</span>
            <input
                {...props}
                type={props.type || 'text'}
                className="flex-1 outline-none text-sm"
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

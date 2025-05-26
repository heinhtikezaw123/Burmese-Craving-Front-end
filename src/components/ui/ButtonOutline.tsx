'use client';
import React, { ReactNode } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    type?: 'button' | 'submit' | 'reset';
    label: ReactNode;
    onClick?: () => void;

};

export const ButtonOutline = ({ label, ...props }: ButtonProps) => (
    <button
        {...props}
        className="w-full py-2 px-4 border border-primary hover:bg-primary/30 hover:font-bold text-primary font-semibold rounded-md cursor-pointer"
    >
        {label}
    </button>
);

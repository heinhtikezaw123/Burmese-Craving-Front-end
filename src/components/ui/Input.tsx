'use client';
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    as?: 'input' | 'textarea' | 'file';
};

export const Input = ({ label, error, as = 'input', ...props }: InputProps) => {
    const commonClasses =
        'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary';

    return (
        <div className="w-full mb-4">
            {label && <label className="block text-sm font-medium mb-1">{label}</label>}

            {as === 'textarea' ? (
                <textarea {...(props as any)} className={commonClasses} />
            ) : (
                <input
                    {...props}
                    type={props.type || 'text'}
                    className={commonClasses}
                />
            )}

            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
};

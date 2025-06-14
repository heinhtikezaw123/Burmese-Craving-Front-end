'use client';
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    as?: 'input' | 'textarea' | 'file';
};

export const Input = ({ label, error, as = 'input', ...props }: InputProps) => {
    const commonClasses =
        'w-full px-4 py-2 border rounded-md hover:border-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50';

    return (
        <div className="w-full">
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

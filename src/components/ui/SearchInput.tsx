'use client';

import { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

interface SearchInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    debounce?: number;
}

export default function SearchInput({
    placeholder = 'Search...',
    value = '',
    onChange,
    debounce = 300,
}: SearchInputProps) {
    const [searchTerm, setSearchTerm] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            onChange?.(searchTerm);
        }, debounce);

        return () => clearTimeout(handler);
    }, [searchTerm, debounce, onChange]);

    const handleClear = () => {
        setSearchTerm('');
        onChange?.('');
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                className="w-full pr-10 pl-8 py-2 border border-black/20 rounded-md focus:outline-none focus:ring focus:ring-primary"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                <AiOutlineSearch className='w-5 h-5' />

            </div>
            {searchTerm && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black hover cursor-pointer"
                >
                    <AiOutlineClose className='w-5 h-5' />
                </button>
            )}
        </div>
    );
}

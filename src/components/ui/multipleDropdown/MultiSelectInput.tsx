// components/ui/MultiSelectInput.tsx
import React from 'react';

type Option = { value: string; label: string };

type Props = {
    label?: string;
    options: Option[];
    selected: string[];
    onChange: (values: string[]) => void;
};

const MultiSelectInput = ({ label, options, selected, onChange }: Props) => {
    const toggle = (value: string) => {
        if (selected.includes(value)) {
            onChange(selected.filter((v) => v !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    return (
        <div>
            {label && <label className="block text-sm font-medium mb-1">{label}</label>}
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => toggle(option.value)}
                        className={`px-3 py-1 rounded-full text-sm border ${selected.includes(option.value)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MultiSelectInput;

'use client';

import React from 'react';
import Select from 'react-select';

export type Option = {
    value: string;
    label: string;
};

type Props = {
    label?: string;
    options: Option[];
    selected: string[];
    onChange: (values: string[]) => void;
};

const MultipleSelectDropdown: React.FC<Props> = ({
    label,
    options,
    selected,
    onChange,
}) => {
    const selectedOptions = options.filter((opt) => selected.includes(opt.value));

    const handleChange = (selectedOptions: Option[] | null) => {
        onChange(selectedOptions ? selectedOptions.map((opt) => opt.value) : []);
    };

    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium mb-1">{label}</label>}
            <Select
                options={options}
                value={selectedOptions}
                onChange={handleChange}
                isMulti
                placeholder="Select options..."
                styles={{
                    control: (base, state) => ({
                        ...base,
                        backgroundColor: 'white',
                        borderColor: state.isFocused ? 'var(--primary)' : '#000',
                        boxShadow: state.isFocused ? `0 0 0 1px var(--primary)` : undefined,
                        '&:hover': {
                            borderColor: 'var(--primary)',
                        },
                        borderRadius: 6,
                        minHeight: '2.5rem',
                    }),
                    option: (base, { isFocused, isSelected }) => ({
                        ...base,
                        backgroundColor: isSelected
                            ? 'var(--primary)'
                            : isFocused
                                ? 'oklch(0.92 0.05 39.58)'
                                : undefined,
                        color: isSelected ? 'white' : 'black',
                        cursor: 'pointer',
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: 'oklch(0.93 0.05 39.58)',
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        color: 'var(--primary)',
                    }),
                    multiValueRemove: (base) => ({
                        ...base,
                        color: 'var(--primary)',
                        ':hover': {
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                        },
                    }),
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'var(--primary)',
                        primary25: 'oklch(0.92 0.05 39.58)',
                        primary50: 'oklch(0.86 0.1 39.58)',
                    },
                })}
            />
        </div>
    );
};

export default MultipleSelectDropdown;

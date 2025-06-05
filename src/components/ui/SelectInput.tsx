import Select, {
    ActionMeta,
    SingleValue,
    MultiValue,
    StylesConfig,
} from 'react-select';

export type Option = {
    value: string;
    label: string;
};

type Props = {
    options: Option[];
    value: Option | Option[] | null;
    onChange: (value: Option | Option[] | null) => void;
    isMulti?: boolean;
    placeholder?: string;
};

export const SelectInput = ({
    options,
    value,
    onChange,
    isMulti = false,
    placeholder = 'Select...',
}: Props) => {
    const handleChange = (
        newValue: MultiValue<Option> | SingleValue<Option>,
        _actionMeta: ActionMeta<Option>
    ) => {
        if (isMulti) {
            onChange(Array.isArray(newValue) ? [...newValue] : []);
        } else {
            onChange(newValue as Option | null);
        }
    };

    // 🟠 Your project theme color customization
    const customStyles: StylesConfig<Option, boolean> = {
        control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? '#FF6B00' : '#000',
            boxShadow: state.isFocused ? '0 0 0 1px #FF6B00' : undefined,
            '&:hover': {
                borderColor: '#FF6B00',
            },
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? '#FF6B00'
                : state.isFocused
                    ? '#FFF3E6'
                    : 'white',
            color: state.isSelected ? 'white' : '#333',
            '&:active': {
                backgroundColor: '#FF6B00',
                color: 'white',
            },
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: '#FF6B0020',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: '#FF6B00',
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: '#FF6B00',
            ':hover': {
                backgroundColor: '#FF6B00',
                color: 'white',
            },
        }),
    };

    return (
        <Select
            options={options}
            value={value}
            onChange={handleChange}
            isMulti={isMulti}
            placeholder={placeholder}
            styles={customStyles}
            className="text-sm"
        />
    );
};

interface VariantItem {
    label: string
    price: number
}

interface Props {
    options: VariantItem[]
    selected: VariantItem
    onSelect: (item: VariantItem) => void
}

const PortionSelector: React.FC<Props> = ({ options, selected, onSelect }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-md space-y-2">
            {options.map((item) => (
                <label
                    key={item.label}
                    className="flex justify-between items-center cursor-pointer"
                >
                    <div className="flex items-center gap-2">
                        <input
                            disabled
                            type="radio"
                            name={item.label}
                            checked={selected.label === item.label}
                            onChange={() => onSelect(item)}
                        />
                        <span>{item.label}</span>
                    </div>
                    <span className="font-medium">${item.price}</span>
                </label>
            ))}
        </div>
    )
}

export default PortionSelector

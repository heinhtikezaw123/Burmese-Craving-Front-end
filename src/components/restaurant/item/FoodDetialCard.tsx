'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PortionSelector from './PortionSelector'

interface VariantItem {
    label: string
    price: number
}

interface Variant {
    id: number
    title: string
    vairantItems: VariantItem[]
}

interface Props {
    title: string
    description: string
    price: number
    totalSold: number
    imageSrc: string
    variants: Variant[]
    id?: string | number // Assuming each food has an ID
}

const FoodDetailCard: React.FC<Props> = ({
    title,
    description,
    price,
    totalSold,
    imageSrc,
    variants,
    id,
}) => {
    const [selectedOptions, setSelectedOptions] = useState(() =>
        variants.map((variant) => ({
            variantId: variant.id,
            selected: variant.vairantItems[0],
        }))
    )

    const router = useRouter()

    const handleEdit = () => {
        // Replace with your edit route
        router.push(`edit/${id}`)
    }

    const handleDelete = () => {
        // TODO: Add your delete logic here
        console.log('Delete clicked')
    }

    const additionalPrice = selectedOptions.reduce(
        (sum, v) => sum + v.selected.price,
        0
    )
    const totalPrice = price + additionalPrice

    return (
        <div className="bg-white rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow">
            <div className="w-full md:w-1/3 rounded-xl overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={title}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                />
            </div>
            <div className="flex-1">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
                <p className="text-lg font-bold mt-2">${totalPrice}</p>
                <p className="text-sm text-gray-600">
                    Total Sold : <span className="font-semibold">{totalSold}</span>
                </p>

                <div className="mt-4 space-y-4">
                    {variants.map((variant) => {
                        const selected = selectedOptions.find(
                            (v) => v.variantId === variant.id
                        )?.selected

                        return (
                            <div key={variant.id}>
                                <h3 className="text-sm font-semibold mb-2">{variant.title}</h3>
                                <PortionSelector
                                    options={variant.vairantItems}
                                    selected={selected!}
                                    onSelect={(item) => handleSelect(variant.id, item)}
                                />
                            </div>
                        )
                    })}
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        className="flex-1 py-2 bg-orange-500 hover:bg-primary text-white rounded-md font-medium cursor-pointer"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                    <button
                        className="flex-1 py-2 border border-orange-500 text-orange-500 rounded-md font-medium"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FoodDetailCard

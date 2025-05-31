'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface FoodCardProps {
    id: string
    title: string
    description: string
    price: number
    qty: number
    imageSrc: string
    tag?: string
}

const FoodCard: React.FC<FoodCardProps> = ({ id, title, description, price, qty, imageSrc, tag }) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/dashboard/items/${id}`)
    }

    return (
        <div
            onClick={handleClick}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 cursor-pointer"
        >
            <div className="p-1">
                <div className="w-full h-52 rounded-t-lg overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="mt-1">
                    {tag && <p className="text-primary">{tag}</p>}
                    <p>{title}</p>
                    <p className="font-bold">${price}</p>
                    <p className="line-clamp-3 text-sm text-gray-500">{description}</p>
                    <div className="font-bold">
                        <span className="text-gray-600">Qty : </span>
                        <span>{qty}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodCard

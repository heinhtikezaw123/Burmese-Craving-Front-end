import AnalyticsSection from '@/components/restaurant/item/AnalyticsSection'
import FoodDetailCard from '@/components/restaurant/item/FoodDetialCard'
import React from 'react'
import foodImage from "@/assets/images/default/burma-superstar-famous-tea-leaf-salad-brumese.jpg"

const FoodDetailPage = () => {
    const food = {
        id: 'nan-gyi-salad',
        title: 'Nan Gyi Salad',
        description:
            'Made with thick rice noodles, curried chicken, hard-boiled eggs, and chickpea flour, all mixed with aromatic spices and garnished with crispy toppings',
        price: 200,
        totalSold: 250,
        imageSrc: foodImage,
        variants: [
            {
                id: 1,
                title: "Choose Portion Size",
                vairantItems: [
                    { label: 'Normal', price: 0 },
                    { label: 'Big portion', price: 5 },
                    { label: 'Family Set for 5', price: 25 },
                ]
            },
            {
                id: 2,
                title: "Choose Type",
                vairantItems: [
                    { label: 'Soup', price: 0 },
                    { label: 'Salad', price: 5 },
                ]
            }
        ],
    }

    return (
        <div className="p-4 space-y-6">
            <FoodDetailCard {...food} />
            <AnalyticsSection title={food.title} />
        </div>
    )
}

export default FoodDetailPage

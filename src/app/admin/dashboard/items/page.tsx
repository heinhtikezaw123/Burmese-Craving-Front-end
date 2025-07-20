"use client"
import { ButtonOutline } from '@/components/ui/ButtonOutline'
import Image from 'next/image'
import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import food from "@/assets/images/default/burma-superstar-famous-tea-leaf-salad-brumese.jpg"
import SearchInput from '@/components/ui/SearchInput'
import { BiSolidDashboard } from 'react-icons/bi'
import { IoListOutline } from 'react-icons/io5'
import FoodCard from '@/components/restaurant/item/FoodCart'
import { useRouter } from 'next/navigation'

const foods = [
  {
    id: 1,
    title: 'Tea Salad',
    description: 'Made with thick rice noodles, curried chicken, hard-boiled eggs, and chickpea flour...',
    price: 200,
    qty: 120,
    imageSrc: food,
    tag: 'Popular',
  },
  {
    id: 2,
    title: 'Tea Salad',
    description: 'Made with thick rice noodles, curried chicken, hard-boiled eggs, and chickpea flour...',
    price: 200,
    qty: 120,
    imageSrc: food,
    tag: 'Popular',
  },
  {
    id: 3,
    title: 'Tea Salad',
    description: 'Made with thick rice noodles, curried chicken, hard-boiled eggs, and chickpea flour...',
    price: 200,
    qty: 120,
    imageSrc: food,
    tag: 'Popular',
  },
  {
    id: 4,
    title: 'Tea Salad',
    description: 'Made with thick rice noodles, curried chicken, hard-boiled eggs, and chickpea flour...',
    price: 200,
    qty: 120,
    imageSrc: food,
    tag: 'Popular',
  },
  {
    id: 5,
    title: 'Tea Salad',
    description: 'Made with thick rice noodles, curried chicken, hard-boiled eggs, and chickpea flour...',
    price: 200,
    qty: 120,
    imageSrc: food,
    tag: 'Popular',
  },
  // Add more items here
]

const page = () => {
  const [query, setQuery] = useState('');

  const router = useRouter()

  const handleCreateClick = () => {
    router.push(`/dashboard/items/create`)
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between">
        <div className="create-card w-full md:w-1/2 lg:w-1/4 p-2" >
          <div className="shadow w-full h-full p-5 rounded-lg flex flex-col justify-center items-center space-y-3 bg-white">
            <h3 className='text-xl font-bold'>Add New Item</h3>
            <p className='text-center'>Got something tasty to share? Click here to add your delicious dish!</p>
            <div>
              <ButtonOutline
                onClick={handleCreateClick}

                type="button"
                label={
                  <div className="flex justify-center items-center">
                    <AiOutlinePlus className="me-2" />
                    Create New Item
                  </div>
                }
              />
            </div>
          </div>
        </div >
        <div className="hidden md:block popular-item w-full md:w-1/2 lg:w-3/4 p-2">
          <div className="p-3 bg-white rounded-lg shadow">
            <h3 className='text-slate-400 text-xl font-bold'>Popular Items</h3>
            <div className="flex flex-col">
              {/* popular items */}
              <div className="items flex items-center border-b border-black/10 p-2">
                <div className="w-12 h-12 overflow-hidden rounded bg-slate-300">
                  <Image src={food} alt="" width={100} height={100} className='object-cover' />
                </div>
                <div className="flex-1 px-5">
                  <span className='text-md'>Tea Salad</span>
                </div>
                <div className="font-bold">
                  <span className='text-slate-600'>Qty : </span>
                  <span>120</span>
                </div>
              </div>
              <div className="items flex items-center border-b border-black/10 p-2">
                <div className="w-12 h-12 overflow-hidden rounded bg-slate-300">
                  <Image src={food} alt="" width={100} height={100} className='object-cover' />
                </div>
                <div className="flex-1 px-5">
                  <span className='text-md'>Tea Salad</span>
                </div>
                <div className="font-bold">
                  <span className='text-slate-600'>Qty : </span>
                  <span>120</span>
                </div>
              </div>
              <div className="items flex items-center p-2">
                <div className="w-12 h-12 overflow-hidden rounded bg-slate-300">
                  <Image src={food} alt="" width={100} height={100} className='object-cover' />
                </div>
                <div className="flex-1 px-5">
                  <span className='text-md'>Tea Salad</span>
                </div>
                <div className="font-bold">
                  <span className='text-slate-600'>Qty : </span>
                  <span>120</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div >
      <div className="my-5">
        <div className="flex flex-col space-y-5">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <SearchInput
                placeholder="Filter By Name"
                onChange={(val) => setQuery(val)}
              />
            </div>
            <div className="flex gap-1 px-2 ">
              <div className="p-1 hover:bg-gray-300 rounded cursor-pointer">
                <IoListOutline className='w-5 h-5' />
              </div>
              <div className="p-1 hover:bg-gray-300 rounded cursor-pointer">
                <BiSolidDashboard className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="p-5 bg-white rounded-lg ">
            <h3 className='text-gray-600 font-bold text-xl mb-4 '>Popular  (10)</h3>
            <div className="flex flex-wrap">
              {/* Item Card */}
              {foods.map(food => (
                <FoodCard key={food.id} {...food} />
              ))}

            </div>
            <div className="flex justify-center items-center mt-10">
              <button type='button' className='font-bold cursor-pointer'>Load More</button>
            </div>
          </div>

          {/* Menu 1 */}
          <div className="p-5 bg-white rounded-lg ">
            <h3 className='text-gray-600 font-bold text-xl mb-4 '>Menu - 1  (10)</h3>
            <div className="flex flex-wrap">
              {/* Item Card */}
              {foods.map(food => (
                <FoodCard key={food.id} {...food} />
              ))}
            </div>
            <div className="flex justify-center items-center mt-10">
              <button type='button' className='font-bold cursor-pointer'>Load More</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default page
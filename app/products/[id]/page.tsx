"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import { GoArrowLeft, GoUpload } from 'react-icons/go'
import { CgClose } from 'react-icons/cg'
import { FiCheck } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'

interface Stock {
    color: string,
    size: number,
    quantity: number
}

interface Product {
    _id: string,
    title: string,
    description: string,
    currentPrice: number,
    colors: string[],
    categories: string[],
    sizes: number[],
    stock: Stock[],
    images: {
        src: string,
        color: string,
        // alt: string
    }[]
}

interface Category {
    _id: string,
    title: string
}

const Product = () => {
    const id = usePathname();

    const [product, setProduct] = useState<Product>();
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    useEffect(() => {
        getProduct();
    }, [])

    const handleSelectedColor = (color: string) => {
        setSelectedColor(color);
    }
    
    const handleSelectedSize = (size: number) => {
        setSelectedSize(size);
    }

    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3333${id}`);
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getCategories = async () => {
        try {
        const response = await axios.get('http://localhost:3333/categories');
        return response.data;
        } catch (error) {
        throw error;
        }
    }; 

    return (
        <div className='flex flex-col px-32 justify-center mb-16 w-full text-lg'>
            <div className='mb-4 flex items-center'>
                <Link href={"/products"}>
                    <GoArrowLeft className='text-2xl' />
                </Link>
                <span className='text-2xl ml-8'>{product?.title}</span>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                    <span>Product Name</span>
                    <div>
                        <span className='bg-white px-4 py-2 rounded-lg text-dark-gray'>{product?.title}</span>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <span>Category</span>
                    <div>
                    {product?.categories.map((category, index) =>
                            <span className='bg-white px-4 py-2 rounded-lg text-dark-gray' key={index}>{category}</span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span>Colors</span>
                    <div className='flex gap-2'>
                        {product?.colors.map((color, index) =>
                            <span onClick={() => handleSelectedColor(color)} className={`cursor-pointer rounded-full relative px-6 py-2${selectedColor === color ? " bg-blue-700 outline outline-2 outline-slate-900 text-neutral-50" : " bg-white"}`} key={index}>{color}</span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span>Photos</span>
                    <div className='flex gap-2'>
                        {!selectedColor && 
                            <div className={`bg-white w-40 h-40 flex items-center justify-center rounded-lg text-dark-gray`}>
                                <span className='text-center'>Select a Color First</span>
                            </div>
                        }
                        {product?.images.map((image, index) =>
                            image.color === selectedColor &&
                            <div key={index}>
                                <Image 
                                    width={160}
                                    height={160}
                                    src={image.src}
                                    alt={""} 
                                    className='rounded-lg object-cover h-[160px]'/>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <span>Sizes</span>
                    <div className='flex gap-2'>
                        {product?.sizes.map((size, index) =>
                            <span onClick={() => handleSelectedSize(size)} className={`cursor-pointer rounded-full relative px-6 py-2${selectedSize === size ? " bg-blue-700 outline outline-2 outline-slate-900 text-neutral-50" : " bg-white"}`} key={index}>{size}</span>
                        )}
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <span>Stock</span>
                    {(!selectedColor || !selectedSize) &&
                            <div>
                                <span className='bg-white px-4 py-2 rounded-lg text-dark-gray'>Select a Color and Size</span>
                            </div>
                        }
                    {product?.stock.map((stock, index) =>
                        stock.color === selectedColor && stock.size === selectedSize &&
                        <div key={index}>
                            <span className='bg-white px-4 py-2 rounded-lg text-dark-gray'>{stock.quantity}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <span>Description</span>
                    <div>
                        <span className='bg-white px-4 py-2 rounded-lg text-dark-gray'>{product?.description}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span>Price</span>
                    <div>
                        <span className='bg-white px-4 py-2 rounded-lg text-dark-gray'>${product?.currentPrice}</span>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 items-center bottom-8 right-32 absolute'>
                <span className='font-medium text-2xl'>Edit</span>
                <Link href={`/products/${product?._id}/edit`} className='w-14 h-14 flex items-center justify-center bg-blue-700 rounded-full shadow-lg transition-colors text-white cursor-pointer hover:bg-blue-800'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default Product
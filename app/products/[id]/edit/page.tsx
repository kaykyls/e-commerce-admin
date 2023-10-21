"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

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

const Edit = () => {
    const { id } = useParams();

    const [product, setProduct] = useState<Product>();
    const [productName, setProductName] = useState<string>('');
    const [categories, setCategories] = useState<any[]>([]);
    // const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    useEffect(() => {
        getProduct();
        getCategories();
    }, [])

    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3333/products/${id}`);

            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3333/categories');
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e: any) => {
        // e.preventDefault();
        // try {
        //     const response = await axios.post('http://localhost:3333/products', {
        //         title: productName,
        //         categories: [selectedCategory]
        //     });
        //     console.log(response);
        // } catch (error) {
        //     console.log(error);
        // }
    }
    
    return (
        <div className='flex flex-col px-32 justify-center mb-16 w-full text-lg'>
            <form className='w-full flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label>Product Name</label>
                    <input className='bg-white p-2 rounded-lg placeholder-dark-gray' placeholder='Product Name' type="text" defaultValue={product?.title} onChange={(e) => setProductName(e.target.value)} required />
                </div>
                {/* <div className='flex flex-col'>
                    <label>Category</label>
                    <select className='bg-white p-2 rounded-lg text-dark-gray' value={"Add New Color"}>
                        <option value="">Add New Category</option>
                        {categories.map((category, index) => 
                        <option key={index} value={category._id}>{category.title}</option>
                        )}
                    </select>
                </div> */}
            </form>
        </div>
    )
}

export default Edit
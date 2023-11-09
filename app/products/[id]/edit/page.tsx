"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { GoArrowLeft } from 'react-icons/go'
import { CgClose } from 'react-icons/cg'
import { GoUpload } from 'react-icons/go'

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

    const [product, setProduct] = useState<Product>({
        _id: '',
        title: '',
        description: '',
        currentPrice: 0,
        colors: [],
        categories: [],
        sizes: [],
        stock: [],
        images: []
    });
    console.log(product);

    const [categories, setCategories] = useState<any[]>([]);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<number>(0);
    const [selectedPhotos, setSelectedPhotos] = useState<{file: File, color: string}[]>([]);

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

    const handleChangeName = (name: string) => {
        setProduct(product => ({...product, title: name}));
    }

    const handleSelectColor = (color: string) => {
        setSelectedColor(color);
    }

    const handleSelectSize = (size: number) => {
        setSelectedSize(size);
    }

    const getStockForSelectedColorAndSize = () => {
        if (selectedColor && selectedSize) {
            const stock = product?.stock.find(stock => stock.color === selectedColor && stock.size === selectedSize);
            return stock?.quantity;
        }
        return "";
    }

    const handleSetStocks = (quantity: number) => {
        if (selectedColor && selectedSize) {
            const stock = product?.stock.find(stock => stock.color === selectedColor && stock.size === selectedSize);
            stock!.quantity = quantity;
        }
    }

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          const newPhotos = Array.from(event.target.files).map((file) => ({
            file,
            color: selectedColor
          }));
          setSelectedPhotos([...selectedPhotos, ...newPhotos]);
        }
    };

    const handleAddCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value;
        if (selectedCategory) {
            const category = categories.find(category => category._id === selectedCategory);
            setProduct(product => ({...product, categories: [...product.categories, category!._id]}));
        }
    }

    const handleAddColor = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (product?.colors.includes(event.target.value)) {
            return;
        }

        const selectedColor = event.target.value;

        if (selectedColor) {
            setProduct(product => ({...product, colors: [...product.colors, selectedColor]}));
        }
    }

    const handleAddSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (product?.sizes.includes(Number(event.target.value))) {
            return;
        }

        const selectedSize = Number(event.target.value);

        if (selectedSize) {
            setProduct(product => ({...product, sizes: [...product.sizes, selectedSize]}));
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
            <div className='mb-4 flex items-center'>
                <Link href={`/products/${product?._id}`}>
                    <GoArrowLeft className='text-2xl' />
                </Link>
                <span className='text-2xl ml-8'>Editing {product?.title}</span>
            </div>
            <form className='w-full flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label>Product Name</label>
                    <input className='bg-white p-2 rounded-lg placeholder-dark-gray' placeholder='Product Name' type="text" defaultValue={product?.title} onChange={(e) => handleChangeName(e.target.value)} required />
                </div>
                <div className='flex flex-col'>
                    <label>Category</label>
                    <select onChange={handleAddCategory} className='bg-white p-2 rounded-lg text-dark-gray' value={"Add New Color"}>
                        <option value="">Add New Category</option>
                        {categories.map((category, index) => 
                        <option key={index} value={category._id}>{category.title}</option>
                        )}
                    </select>
                </div>
                <div className='flex'>
                    {product?.categories.map((category, index) =>
                        <div key={index} className='bg-white p-2 rounded-lg text-dark-gray'>{categories.filter((categ) => categ._id === category).map((categ) => categ.title)}</div>
                    )}
                </div>
                <div className='flex flex-col'>
                    <label>Color</label>
                    <select onChange={handleAddColor} className='bg-white p-2 rounded-lg text-dark-gray' value={"Add New Color"}>
                        <option value="">Add New Color</option>
                        <option className='text-slate-900' value="Red">Red</option>
                        <option className='text-slate-900' value="Blue">Blue</option>
                        <option className='text-slate-900' value="Green">Green</option>
                        {/* {product?.colors.map((color, index) => 
                        <option key={index} value={color}>{color}</option>
                        )} */}
                    </select>
                </div>

                <div className="flex gap-2 my-2">
                {product?.colors.map((color, index) => 
                    <div key={index} onClick={() => handleSelectColor(color)} className={`cursor-pointer rounded-full relative px-6 py-2${selectedColor === color ? " bg-blue-700 outline outline-2 outline-slate-900 text-neutral-50" : " bg-white"}`}>
                        <span>{color}</span>
                        <div className='flex items-center justify-center absolute w-5 h-5 bg-red-600 top-0 right-0 rounded-full cursor-pointer text-neutral-50'>
                            <CgClose className='w-3 h-3'/>
                        </div>
                    </div>
                )}
                </div>

                <div className='flex flex-col'>
                    <label>Photos</label>
                    <div className='flex flex-row gap-2'>
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
                        <label className={` ${selectedColor ? "cursor-pointer" : "cursor-not-allowed"} bg-white w-40 h-40 flex flex-col items-center justify-center rounded-lg text-dark-gray`} htmlFor="image-input">
                    <GoUpload className='w-6 h-6'/>
                    <span>{selectedColor ? "Upload Image" : `Select Color First`}</span>
                    </label>
                    {selectedColor && 
                    <input id='image-input' className='bg-white p-2 rounded-lg hidden' type="file" multiple onChange={handlePhotoChange} required />
                    }
                    </div>
                    
                </div>
                    
                <div className='flex flex-col'>
                    <label>Sizes</label>
                    <select onChange={handleAddSize} className='bg-white p-2 rounded-lg text-dark-gray' value={"Add New Size"}>
                        <option value="">Add New Size</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        {/* {product?.sizes.map((size, index) => 
                        <option key={index} value={size}>{size}</option>
                        )} */}
                    </select>
                </div>

                <div className="flex gap-2 my-2">
                {product?.sizes.map((size, index) => 
                    <div key={index} onClick={() => handleSelectSize(size)} className={`cursor-pointer rounded-full relative px-6 py-2${selectedSize === size ? " bg-blue-700 outline outline-2 outline-slate-900 text-neutral-50" : " bg-white"}`}>
                        <span>{size}</span>
                        <div className='flex items-center justify-center absolute w-5 h-5 bg-red-600 top-0 right-0 rounded-full cursor-pointer text-neutral-50'>
                            <CgClose className='w-3 h-3'/>
                        </div>
                    </div>
                )}
                </div>

                <div className='flex flex-col'>
                    <label>{`Stock${selectedColor && selectedSize ? ` For ${selectedColor} ${selectedSize}` : ""}`}</label>
                    <input disabled={!selectedColor || !selectedSize} placeholder={!selectedColor || !selectedSize ? "Select Color And Size First" : `Stock For ${selectedColor} ${selectedSize}`} className='bg-white p-2 rounded-lg placeholder-dark-gray' type="number" defaultValue={getStockForSelectedColorAndSize()} onChange={(e) => handleSetStocks(Number(e.target.value))} required />
                </div>

                <div className='flex flex-col'>
                    <label>Price</label>
                    <input className='bg-white p-2 rounded-lg placeholder-dark-gray' placeholder='Price' type="number" defaultValue={product?.currentPrice} required />
                </div>

                <div className='flex flex-col'>
                    <label>Description</label>
                    <textarea className='bg-white p-2 rounded-lg placeholder-dark-gray' placeholder='Description' defaultValue={product?.description} required />
                </div>

                


                
            </form>
        </div>
    )
}

export default Edit
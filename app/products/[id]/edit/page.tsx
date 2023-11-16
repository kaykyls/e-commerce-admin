"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { GoArrowLeft } from 'react-icons/go'
import { CgClose } from 'react-icons/cg'
import { GoUpload } from 'react-icons/go'
import { FiCheck } from 'react-icons/fi'

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
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [productName, setProductName] = useState<string>("");

    useEffect(() => {
        getProduct();
        getCategories();

        if (product) {
            setProductName(product.title);
        }
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
            const newStock = product?.stock.map(stock => {
                if (stock.color === selectedColor && stock.size === selectedSize) {
                    return {
                        ...stock,
                        quantity
                    }
                }
                return stock;
            });
            setProduct(product => ({...product, stock: newStock!}));
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
        if (product?.categories.includes(event.target.value)) {
            return;
        }

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsUploading(true);

        try {
            const response = await axios.put(`http://localhost:3333/products/${id}/edit`, {
                title: product.title,
                description: product.description,
                currentPrice: product.currentPrice,
                colors: product.colors,
                categories: product.categories,
                sizes: product.sizes,
                stock: product.stock,
                images: product.images
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }

        setIsUploading(false);
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
                    <label>Description</label>
                    <textarea className='bg-white p-2 rounded-lg placeholder-dark-gray' placeholder='Description' defaultValue={product?.description} required />
                </div>

                <div className='flex flex-col'>
                    <label>Price</label>
                    <input className='bg-white p-2 rounded-lg placeholder-dark-gray' placeholder='Price' type="number" defaultValue={product?.currentPrice} required />
                </div>

                <div className='flex justify-end items-center gap-2 mt-4'>
                <span>Finish</span>
                <button className='bg-blue-700 text-neutral-50 rounded-full p-2' type="submit">{isUploading ?
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-blue-600 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/3000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div> : <FiCheck className='text-3xl'/>
                }</button>
            </div>
            </form>  
        </div>
    )
}

export default Edit
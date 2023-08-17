"use client";

import React, { useState, useEffect } from 'react';
import { GoUpload } from 'react-icons/go';
import { CgClose } from 'react-icons/cg';
import { FiCheck } from 'react-icons/fi';
import Image from 'next/image';
import axios from 'axios';
import Modal from '../../components/Modal';

const Add: React.FC = () => {
  const [productName, setProductName] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<{ file: File, color: string }[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<number>();
  const [stocks, setStocks] = useState<{color: string, size: number | undefined, quantity: number}[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      setIsAuthenticated(true);
    }
  }, [])

  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3333/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  };  
  
  interface ProductData {
    title: string;
    description: string;
    currentPrice?: number;
    categories: string[];
    selectedColors: string[];
    selectedSizes: number[];
    stock: string;
    colors: string[];
    sizes: number[];
    photosColors: string;
  }
  
  const postProduct = async () => {
    setIsUploading(true);

    const productData: ProductData = {
      title: productName,
      description: description,
      currentPrice: price,
      categories: selectedCategories,
      selectedColors: selectedColors,
      selectedSizes: selectedSizes,
      stock: JSON.stringify(stocks),
      colors: selectedColors,
      sizes: selectedSizes,
      photosColors: JSON.stringify(selectedPhotos)
    };
  
    const formData = new FormData();
  
    selectedPhotos.forEach(photo => {
      formData.append('files', photo.file);
    });

    for (const [key, value] of Object.entries(productData)) {
      formData.append(key, String(value));
    }
  
    try {
      const response = await axios.post('http://localhost:3333/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsUploading(false);

      setModalMessage("Product Added Successfully");
      setModalIsOpen(true);
    } catch (error) {
      setIsUploading(false);

      setModalMessage("Something Went Wrong");
      setModalIsOpen(true);
      console.log(error);
    }
  };
  
  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, [])

  const getStockForSelectedColorAndSize = () => {
    if (selectedColor && selectedSize) {
      const stockForSelected = stocks.find(
        (item) => item.color === selectedColor && item.size === selectedSize
      );
      return stockForSelected ? stockForSelected.quantity : "";
    }
    return "";
  };

  const handleAddColor = (color: string) => {
    if (selectedColors.includes(color)) {
      return;
    }

    setSelectedColors([...selectedColors, color]);
  }

  const handleSelectColor = (color: string) => () => {
    setSelectedColor(color);
  }

  const handleAddSize = (size: number) => {
    if (selectedSizes.includes(size)) {
      return;
    }

    setSelectedSizes([...selectedSizes, size]);
  }

  const handleSelectSize = (size: number) => () => {
    setSelectedSize(size);
  };

  const handleAddCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      return;
    }

    setSelectedCategories([...selectedCategories, category]);
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

  const handleSetStocks = (stock: number) => {
    const item = stocks.find(item => item.color === selectedColor && item.size === selectedSize);

    if(item) {
      item.quantity = stock;
      setStocks([...stocks]);
      return;
    }

    setStocks([...stocks, {color: selectedColor, size: selectedSize, quantity: stock}])
  }
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postProduct();
  };

  return (
    <div className='flex justify-center mt-16 mb-16 w-full text-lg font-medium'>
      {modalIsOpen && <Modal message={modalMessage} setModalIsOpen={setModalIsOpen}/>}
      <form className='w-full px-48 flex flex-col gap-2' onSubmit={handleSubmit}>
        {!isAuthenticated && <span className='text-red-600 border-b border-slate-300'>You are not authenticated. This is preview only.</span>}
        <div className='flex flex-col'>
          <label>Product Name</label>
          <input className='bg-slate-300 p-2 rounded-lg placeholder-slate-400' placeholder='Product Name' type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </div>
        <div className='flex flex-col'>
          <label>Category</label>
          <select onChange={(e) => handleAddCategory(e.target.value)} className='bg-slate-300 p-2 rounded-lg text-slate-400' value={"Add New Color"}>
            <option value="">Add New Category</option>
            {categories.map((category, index) => 
              <option key={index} value={category._id}>{category.title}</option>
            )}
          </select>
        </div>

        <div className='flex'>
              {selectedCategories.map((category, index) =>
                <div key={index} className='bg-slate-300 p-2 rounded-lg text-slate-400'>{categories.filter((categ) => categ._id === category).map((categ) => categ.title)
                }</div>
              )}
        </div>

        <div className='flex flex-col'>
          <label>Colors</label>
          <select onChange={(e) => handleAddColor(e.target.value)} className='bg-slate-300 p-2 rounded-lg text-slate-400' value={"Add New Color"}>
            <option value="">Add New Color</option>
            <option className='text-slate-900' value="Red">Red</option>
            <option className='text-slate-900' value="Blue">Blue</option>
            <option className='text-slate-900' value="Green">Green</option>
          </select>
        </div>
        <div className="flex gap-2 my-2">
          {selectedColors.map((color, index) => 
            <div key={index} onClick={handleSelectColor(color)} className={`cursor-pointer rounded-full relative px-6 py-2${selectedColor === color ? " bg-blue-700 outline outline-2 outline-slate-900 text-neutral-50" : " bg-slate-300"}`}>
              <span>{color}</span>
              <div className='flex items-center justify-center absolute w-5 h-5 bg-red-600 top-0 right-0 rounded-full cursor-pointer text-neutral-50'>
                <CgClose className='w-3 h-3'/>
              </div>
            </div>
          )}
        </div>
        <div className='flex flex-col'>
          <span>{`Photos${selectedColor ? ` For ${selectedColor}` : ""}`}</span>
          <div className='flex gap-2 flex-wrap'>
            {selectedPhotos
              .filter((photo) => photo.color === selectedColor)
              .map((photo, index) => (
                <Image
                  className='rounded-lg object-cover'
                  key={index}
                  src={URL.createObjectURL(photo.file)}
                  alt=""
                  width="160"
                  height="160"
                />
              ))}
            <label className={` ${selectedColor ? "cursor-pointer" : "cursor-not-allowed"} bg-slate-300 w-40 h-40 flex flex-col items-center justify-center rounded-lg text-slate-400`} htmlFor="image-input">
              <GoUpload className='w-6 h-6'/>
              <span>{selectedColor ? "Upload Image" : `Select Color First`}</span>
            </label>
            {selectedColor && 
              <input id='image-input' className='bg-slate-300 p-2 rounded-lg hidden' type="file" multiple onChange={handlePhotoChange} required />
            }
          </div>

        </div>
        <div className='flex flex-col'>
          <label>Sizes</label>
          <select value={"Add New Size"} className='bg-slate-300 p-2 rounded-lg text-slate-400' onChange={(e => handleAddSize(Number(e.target.value)))}>
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
          </select>
        </div>

        <div className="flex gap-2 my-2">
          {selectedSizes.map((size, index) => 
            <div key={index} onClick={handleSelectSize(size)} className={`cursor-pointer rounded-full relative px-6 py-2${selectedSize === size ? " bg-blue-700 outline outline-2 outline-slate-900 text-neutral-50" : " bg-slate-300"}`}>
              <span>{size}</span>
              <div className='flex items-center justify-center absolute w-5 h-5 bg-red-600 top-0 right-0 rounded-full cursor-pointer text-neutral-50'>
                <CgClose className='w-3 h-3'/>
              </div>
            </div>
          )}
        </div>

        <div className='flex flex-col'>
          <label>{`Stock${selectedColor && selectedSize ? ` For ${selectedColor} ${selectedSize}` : ""}`}</label>
          <input disabled={!selectedColor || !selectedSize} placeholder={!selectedColor || !selectedSize ? "Select Color And Size First" : `Stock For ${selectedColor} ${selectedSize}`} className='bg-slate-300 p-2 rounded-lg placeholder-slate-400' type="number" value={getStockForSelectedColorAndSize()} onChange={(e) => handleSetStocks(Number(e.target.value))} required />
        </div>
        <div className='flex flex-col'>
          <label>Description</label>
          <textarea placeholder='Description' className='bg-slate-300 placeholder-slate-400 p-2 rounded-lg' value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className='flex flex-col'>
          <label>Price</label>
          <input placeholder='Price' className='placeholder-slate-400 bg-slate-300 p-2 rounded-lg' type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
        </div>
        <div className='flex justify-end items-center gap-2 mt-4'>
          <span>Finish</span>
          <button className='bg-blue-700 text-neutral-50 rounded-full p-2' type="submit">{isUploading ?
          <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-blue-600 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div> : <FiCheck className='text-3xl'/>
          }</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
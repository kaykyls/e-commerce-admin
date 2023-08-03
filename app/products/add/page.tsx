"use client";

import React, { useState } from 'react';
import { GoUpload } from 'react-icons/go';
import { CgClose } from 'react-icons/cg';
import Image from 'next/image';

const Add: React.FC = () => {
  const [productName, setProductName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<{ file: File, color: string }[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [stock, setStock] = useState<number>();
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<number>();
  const [stocks, setStocks] = useState<{color: string, size: string, stock: number}[]>([]);

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
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className='flex justify-center mt-16 w-full text-lg font-medium'>
      <form className='w-full px-48 flex flex-col gap-2' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label>Product Name</label>
          <input className='bg-slate-300 p-2 rounded-lg placeholder-slate-400' placeholder='Product Name' type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </div>
        <div className='flex flex-col'>
          <label>Category</label>
          <select className='bg-slate-300 p-2 rounded-lg text-slate-400' onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Add New Category</option>
          </select>
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
          <input disabled={!selectedColor || !selectedSize} placeholder={!selectedColor || !selectedSize ? "Select Color And Size First" : `Stock For ${selectedColor} ${selectedSize}`} className='bg-slate-300 p-2 rounded-lg placeholder-slate-400' type="number" value={stock} onChange={(e) => setStock(parseInt(e.target.value, 10))} required />
        </div>
        <div className='flex flex-col'>
          <label>Description</label>
          <textarea placeholder='Description' className='bg-slate-300 placeholder-slate-400 p-2 rounded-lg' value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className='flex flex-col'>
          <label>Price</label>
          <input placeholder='Price' className='placeholder-slate-400 bg-slate-300 p-2 rounded-lg' type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
        </div>
      </form>
    </div>
  );
};

export default Add;
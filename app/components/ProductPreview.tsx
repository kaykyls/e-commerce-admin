import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaEdit, FaTrashAlt} from 'react-icons/fa'
import axios from 'axios'

interface ProductPreviewProps {
    name: string
    category: string
    image: string
}

const ProductPreview:React.FC<ProductPreviewProps> = ({name, category, image}: ProductPreviewProps) => {
    return (
        <div className='flex hover:bg-slate-300 transition-colors cursor-pointer rounded-lg p-4 gap-4'>

            <Image
                src={image}
                width={150}
                height={150}
                alt='product image'
                style={{borderRadius: '.5rem', objectFit: 'cover', width: '150px', height: '150px'}}
            />

            <div className='flex flex-col justify-end'>
                <span className='font-medium text-gray-400 text-lg'>{category}</span>
                <span className='font-medium text-gray-700 text-2xl'>{name}</span>
            </div>
            <div className='flex ms-auto items-end text-2xl gap-1'>
                <div className='p-2 rounded-lg bg-white'>
                    <FaEdit/>
                </div>
                <div className='p-2 rounded-lg bg-white'>
                    <FaTrashAlt/>
                </div>
            </div>
        </div>
    )
}

export default ProductPreview
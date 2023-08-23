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
    const [categoryName, setCategoryName] = useState<string>('');

    const getCategoryName = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:3333/categories/${id}`);
            console.log(response.data.title);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getCategoryName(category)
            .then(categoryData => {
                setCategoryName(categoryData.title);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    

    return (
        <div className='flex hover:bg-slate-300 transition-colors cursor-pointer rounded-lg p-4 gap-8'>
            <Image
                src={image}
                width={100}
                height={100}
                alt='product image'
                style={{borderRadius: '.5rem', objectFit: 'cover', width: '100px', height: '100px'}}
            />

            <div className='flex flex-col justify-end'>
                <span className='font-medium text-gray-400 text-sm'>{categoryName}</span>
                <span className='font-medium text-gray-700 text-xl'>{name}</span>
            </div>
            <div className='flex ms-auto items-end text-2xl gap-1'>
                <div className='p-2 rounded-lg bg-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                </div>
                <div className='p-2 rounded-lg bg-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default ProductPreview
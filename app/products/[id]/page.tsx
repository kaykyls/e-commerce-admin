"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

interface Product {
    _id: string,
    title: string,
    description: string,
    price: number,
    categories: string[],
    images: {
        src: string,
        alt: string
    }[]
}

const Product = () => {
    const router = useRouter()
    const { id } = router.query

    const [product, setProduct] = useState<Product>();

    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3333/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>

        </div>
    )
}

export default Product
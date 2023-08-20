"use client"

import React, { useState } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import Link from 'next/link'
import axios from 'axios'

const AddAdmin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3333/admin/auth/register', {
                name,
                email,
                password,
            });

            console.log(response);
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <div className='px-32 w-full'>
            <div className='flex items-center'>
                <Link href={"/settings"}>
                    <GoArrowLeft className='text-2xl' />
                </Link>
                <span className='text-xl ml-8'>Add New Admin</span>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col w-full gap-2 mt-8'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name">Name</label>
                    <input onChange={(e) => setName(e.target.value)} placeholder='Name' id='name' className="px-4 py-2 rounded-lg" type="text" required/>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} placeholder='Email' id='email' className="px-4 py-2 rounded-lg" type="email" required/>
                </div>
                <div className="flex gap-4 w-full">
                    <div className='flex flex-col w-full gap-2'>
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} placeholder='Password' id='password' className=' px-4 py-2 rounded-lg' type="password" required/>
                    </div>
                    <div className='flex flex-col w-full gap-2'>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' id='confirm-password' className='px-4 py-2 rounded-lg' type="password" required/>
                    </div>
                </div>
                <div className='flex justify-end mt-8'>
                    <button className='bg-blue-600 rounded-2xl px-4 py-2 text-white'>
                        Confirm
                    </button>
                </div>    
            </form>
        </div>
    )
}

export default AddAdmin
import React from 'react'
import {GrFormClose} from 'react-icons/gr'

interface ModalProps {
    message: string,
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal:React.FC<ModalProps> = ({message, setModalIsOpen} : ModalProps) => {
    console.log(setModalIsOpen)

    return (
        <div className='z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-25'>
            <div className='bg-white p-2 rounded-lg'>
                <div className='flex justify-end'>
                    <button onClick={() => setModalIsOpen(false)} className='text-4xl text-gray-600 hover:text-gray-500'><GrFormClose/></button>
                </div>
                <div className='text-center p-4'>
                    <p className='text-xl maxw mt-4'>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default Modal
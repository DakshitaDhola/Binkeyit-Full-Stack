import React from 'react'
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({ close , value , onChange , submit }) => {
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-70 z-50
    flex justify-center items-center p-4'>
        <div className='bg-white p-4 rounded w-full max-w-md'>
            <div className='flex items-center justify-between gap-3'>
                <h1 className='font-semibold'>Add Fields</h1>
                <button onClick={close}>
                    <IoClose size={25}/>
                </button>
            </div>
            <input
                placeholder='Enter Your Field Name'
                value={value}
                onChange={onChange}
                className='bg-blue-50 my-2 p-2 border outline-none focus-within:border-primary-100 rounded w-full'
            />
            <button onClick={submit} className='bg-primary-200 hover:bg-primary-100 px-4 py-2 rounded mx-auto w-fit block'>
                Add Field
            </button>
        </div>
    </section>
  )
}

export default AddFieldComponent

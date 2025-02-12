import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
    const location = useLocation()
    return (
        <div className='m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
            <p className='text-green-800 font-semibold text-lg text-center'>{Boolean(location?.state?.text) ? location?.state?.text : "Payment"} Successfully Done </p>
            <Link to='/' className='border border-green-900 px-4 py-1 text-green-900 hover:bg-green-900 hover:text-white transition-all'>Go To Home</Link>
        </div>
    )
}

export default Success

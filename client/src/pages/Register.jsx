import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const ValideValue = Object.values(data).every(el => el)

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(data.password !== data.confirmPassword){
            toast.error(
                "Password And Confirm Password Must Be Same"
            )
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data : data
            })

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)

                setData({
                    name : "",
                    email : "",
                    password : "",
                    confirmPassword : ""
                })

                navigate("/login")
            }

            console.log("Response",response)
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p>Welcome To Binkeyit</p>

                <form action="" className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor="name">Name :</label>
                        <input
                            type="text"
                            name='name'
                            id='name'
                            autoFocus
                            className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter Your Name'
                        />
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor="email">Email :</label>
                        <input
                            type="email"
                            name='email'
                            id='email'
                            autoFocus
                            className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter Your Email'
                        />
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor="password">Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input
                                type={showPassword ? "text" : "password"}
                                name='password'
                                id='password'
                                autoFocus
                                className='w-full outline-none'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter Your Password'
                            />
                            <div onClick={() => setShowPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor="confirmPassword">Confirm Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmPassword'
                                id='confirmPassword'
                                autoFocus
                                className='w-full outline-none'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter Your Confirm Password'
                            />
                            <div onClick={() => setShowConfirmPassword(preve => !preve)} className='cursor-pointer'>
                                {
                                    showConfirmPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaRegEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <button disabled={!ValideValue} className={`${ValideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wider`}>Register</button>
                </form>
                <p>Already Have Account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link></p>
            </div>
        </section>
    )
}

export default Register
Register
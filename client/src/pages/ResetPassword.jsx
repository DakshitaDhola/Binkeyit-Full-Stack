import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';

const ResetPassword = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    const ValideValue = Object.values(data).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(data.newPassword !== data.confirmPassword){
            toast.error("New Password And Confirm Password Must Be Same...")
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.resetPassword,
                data: data
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/login')
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })
            }

            console.log("Response", response)
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate('/')
        }

        if (location?.state?.email) {
            setData((preve) => {
                return {
                    ...preve,
                    email: location?.state?.email
                }
            })
        }
    }, [])

    console.log("data", data)
    console.log("Reset Password Page", location)

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='font-semibold text-lg'>Enter Your Password</p>
                <form action="" className='grid gap-4 py-4' onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor="newPassword">New Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input
                                type={showPassword ? "text" : "password"}
                                name='newPassword'
                                id='newPassword'
                                autoFocus
                                className='w-full outline-none'
                                value={data.newPassword}
                                onChange={handleChange}
                                placeholder='Enter Your New Password'
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
                                placeholder='Enter Your confirm Password'
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
                    <button disabled={!ValideValue} className={`${ValideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wider`}>Change Password</button>
                </form>
                <p>Already Have Account ? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link></p>
            </div>
        </section>
    )
}

export default ResetPassword
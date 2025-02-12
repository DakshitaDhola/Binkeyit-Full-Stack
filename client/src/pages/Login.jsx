import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

        try {
            const response = await Axios({
                ...SummaryApi.login,
                data : data
            })

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem('accesstoken',response.data.data.accesstoken)
                localStorage.setItem('refreshtoken',response.data.data.refreshtoken)

                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))

                setData({
                    email : "",
                    password : ""
                })

                navigate("/")
            }

            console.log("Response",response)
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>

                <form action="" className='grid gap-4 py-4' onSubmit={handleSubmit}>
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
                        <Link className='block ml-auto hover:text-primary-200' to={"/forgot-password"}>Forgot Password ?</Link>
                    </div>

                    <button disabled={!ValideValue} className={`${ValideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wider`}>Login</button>
                </form>
                <p>Don't Have Account ? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link></p>
            </div>
        </section>
    )
}

export default Login

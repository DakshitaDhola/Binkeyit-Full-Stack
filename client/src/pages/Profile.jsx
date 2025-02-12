import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvtarEdit from '../components/UserProfileAvtarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';

const Profile = () => {

  const user = useSelector(state => state.user)
  const [openProfileAvtarEdit, setProfileAvtarEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile
  })

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    })
  }, [user])
  const handleOnChange = (e) => {
    const { name, value } = e.target

    setUserData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data : userData
      })
      const { data : responseData } = response

      if(responseData.success){
        toast.success(responseData.message)
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='p-4'>
      {/* profile upload and display */}
      <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
        {
          user.avtar ? (
            <img
              src={user.avtar}
              alt={user.name}
              className='w-full h-full'
            />
          ) : (
            <FaRegUserCircle size={65} />
          )
        }
      </div>
      <button onClick={() => setProfileAvtarEdit(true)} className='text-sm min-w-20 hover:bg-primary-200 border border-primary-100 hover:border-primary-200 px-3 py-1 rounded-full mt-3'>Edit</button>
      {
        openProfileAvtarEdit && (
          <UserProfileAvtarEdit close={() => setProfileAvtarEdit(false)} />
        )
      }
      {/* name,mobile,email and change Password */}
      <form action="" className='mt-4 grid gap-2' onSubmit={handleSubmit}>
        <div className='grid'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id='name'
            value={userData.name}
            name='name'
            onChange={handleOnChange}
            placeholder='Enter Your Name'
            required
            className='p-2 bg-slate-200 outline-none rounded border focus-within:border-primary-200'
          />
        </div>
        <div className='grid'>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            name='email'
            id='email'
            required
            value={userData.email}
            onChange={handleOnChange}
            placeholder='Enter Your Email'
            className='p-2 bg-slate-200 outline-none rounded border focus-within:border-primary-200'
          />
        </div>
        <div className='grid'>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            name='mobile'
            id='mobile'
            required
            value={userData.mobile}
            onChange={handleOnChange}
            placeholder='Enter Your mobile'
            className='p-2 bg-slate-200 outline-none rounded border focus-within:border-primary-200'
          />
        </div>

        <button className='border px-4 py-2 font-semibold hover:bg-primary-100
         border-primary-100 text-primary-200 hover:text-neutral-800 rounded'>
          {
            loading ? "Loading..." : "Submit"
          }
        </button>
      </form>
    </div>
  )
}

export default Profile

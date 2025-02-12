import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAdress from '../components/AddAdress'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from '../components/EditAddressDetails';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { useGolbalContext } from '../provider/GlobalProvider';

const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress, setOpenAddress] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const { fetchAddress } = useGolbalContext()

  const handleDisableAddress = async(id) => {
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data : {
          _id : id
        }
      })
      if(response.data.success){
        toast.success("Address Remove")
        if(fetchAddress){
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <div className=''>
      <div className='bg-white shadow-md px-2 py-2 flex justify-between gap-4 items-center'>
        <h2 className='font-semibold text-ellipsis line-clamp-1'>Address</h2>
        <button onClick={() => setOpenAddress(true)} className='border border-primary-200 text-primary-200 px-2 py-1 rounded-full hover:bg-primary-200 hover:text-black'>
          Add Address
        </button>
      </div>
      <div className='bg-blue-50 p-2 grid gap-4'>
        {
          addressList.map((address, index) => {
            return (
              <div className={`border rounded p-3 flex gap-3 bg-white ${!address.status && 'hidden'}`} key={address._id + "address" + index}>
                <div className='w-full'>
                  <p>{address.address_line}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.country} - {address.pincode}</p>
                  <p>{address.mobile}</p>
                </div>
                <div className='grid gap-10'>
                  <button
                    onClick={() => {
                      setOpenEdit(true)
                      setEditData(address)
                    }
                    }
                    className='bg-green-200 p-1 rounded hover:text-white hover:bg-green-600'>
                    <MdEdit size={20} />
                  </button>
                  <button
                  onClick={()=>handleDisableAddress(address._id)}
                  className='bg-red-200 rounded p-1 hover:text-white hover:bg-red-600'>
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            )
          })
        }
        <div onClick={() => setOpenAddress(true)} className='bg-blue-50 h-16 border-2 border-dashed flex justify-center items-center cursor-pointer'>
          Add Address
        </div>
      </div>
      {
        openAddress && (
          <AddAdress close={() => setOpenAddress(false)} />
        )
      }
      {
        openEdit && (
          <EditAddressDetails data={editData} close={()=>setOpenEdit(false)}/>
        )
      }
    </div>
  )
}

export default Address
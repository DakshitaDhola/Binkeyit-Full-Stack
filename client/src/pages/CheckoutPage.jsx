import React, { useState } from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { useGolbalContext } from '../provider/GlobalProvider'
import AddAdress from '../components/AddAdress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

const CheckoutPage = () => {
  const { noDiscountTotalPrice, totalPrice, totalQty, fetchCartItem , fetchOrder} = useGolbalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectAddress, setSelectAddress] = useState(0)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()


  const handleCashOnDelivery = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice
        }
      })

      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        if (fetchCartItem) {
          fetchCartItem()
        }
        if(fetchOrder){
          fetchOrder()
        }
        navigate('/success', {
          state: {
            text: "Order"
          }
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const handleOnlinePayment = async () => {
    try {
      toast.loading('Loading....')
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
      const stripePromise = await loadStripe(stripePublicKey)
      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice
        }
      })

      const { data: responseData } = response

      stripePromise.redirectToCheckout({ sessionId: responseData.id })

      if(fetchCartItem){
        fetchCartItem
      }
      if(fetchOrder){
        fetchOrder
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className='bg-blue-50 p-4'>
      <div className='container mx-auto p-4 flex w-full gap-5 justify-between flex-col lg:flex-row'>
        <div className='w-full'>
          {/* address */}
          <h3 className='text-lg font-semibold'>Choose Your Address</h3>
          <div className='bg-white p-2 grid gap-4'>
            {
              addressList.map((address, index) => {
                return (
                  <label htmlFor={"address" + index} key={address._id + "address" + index} className={!address.status && 'hidden'}>
                    <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                      <div>
                        <input
                          id={"address" + index}
                          type='radio'
                          name='address'
                          value={index}
                          onChange={(e) => setSelectAddress(e.target.value)}
                        />
                      </div>
                      <div>
                        <p>{address.address_line}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                        <p>{address.country} - {address.pincode}</p>
                        <p>{address.mobile}</p>
                      </div>
                    </div>
                  </label>
                )
              })
            }
            <div onClick={() => setOpenAddress(true)} className='bg-blue-50 h-16 border-2 border-dashed flex justify-center items-center cursor-pointer'>
              Add Address
            </div>
          </div>
        </div>
        <div className='w-full max-w-md bg-white py-4 px-2'>
          {/* summary */}
          <h3 className='text-lg font-semibold'>Summary</h3>
          <div className='bg-white p-4'>
            <h3 className='font-semibold'>Bill Details</h3>
            <div className='flex gap-4 justify-between'>
              <p>Items Total</p>
              <p className='flex items-center gap-2'>
                <span className='line-through text-neutral-400'>{DisplayPriceInRupees(noDiscountTotalPrice)}</span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </p>
            </div>
            <div className='flex gap-4 justify-between'>
              <p>Quntity total</p>
              <p className='flex items-center gap-2'>{totalQty} item</p>
            </div>
            <div className='flex gap-4 justify-between'>
              <p>Delivery Charge</p>
              <p className='flex items-center gap-2'>Free</p>
            </div>
            <div className='font-semibold flex items-center justify-between gap-4'>
              <p >Grand total</p>
              <p>{DisplayPriceInRupees(totalPrice)}</p>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <button className='py-2 px-4 bg-green-600 text-white font-semibold hover:bg-green-700' onClick={handleOnlinePayment}>Online Payment</button>
            <button
              onClick={handleCashOnDelivery}
              className='py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white'>Cash On Delivery</button>
          </div>
        </div>
      </div>
      {
        openAddress && (
          <AddAdress close={() => setOpenAddress(false)} />
        )
      }
    </section>
  )
}

export default CheckoutPage
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.png'
import image2 from '../assets/Best_Prices_Offers.png'
import image3 from '../assets/Wide_Assortment.png'
import { priceWithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from '../components/AddToCartButton'

const ProducDisplayPage = () => {
  const params = useParams()
  let productId = params?.product?.split("-")?.slice(-1)[0]
  const [data, setData] = useState({
    name: "",
    image: []
  })
  const [image, setImage] = useState(0)
  const imageContainer = useRef()
  const [loading, setLoading] = useState(false)

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }
    finally {
      setLoading(false)
    }
  }

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  console.log(data)
  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2'>
      <div className=''>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] min-h-56 max-h-56 h-full w-full'>
          <img
            src={data.image[image]}
            className='w-full h-full object-scale-down'
          />
        </div>
        <div className='flex items-center justify-center gap-3 my-2'>
          {
            data.image.map((img, index) => {
              return (
                <div key={img + index + "point"} className={`bg-slate-200 lg:w-5 lg:h-5 w-3 h-3 rounded-full ${index === image && "bg-slate-300"}`}></div>
              )
            })
          }
        </div>
        <div className='grid relative'>
          <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
            {
              data.image.map((img, index) => {
                return (
                  <div className='w-20 h-20 min-h-20 min-w-20 cursor-pointer shadow-md' key={img + index}>
                    <img
                      src={img}
                      alt='min-product'
                      onClick={() => setImage(index)}
                      className='w-full h-full object-scale-down'
                    />
                  </div>
                )
              })
            }
          </div>
          <div className='w-full hidden lg:flex justify-between absolute h-full -ml-3 items-center'>
            <button onClick={handleScrollLeft} className='bg-white relative z-10 p-1 rounded-full shadow-lg'><FaAngleLeft /></button>
            <button onClick={handleScrollRight} className='bg-white relative z-10 p-1 rounded-full shadow-lg'><FaAngleRight /></button>
          </div>
        </div>
        <div></div>
        <div className='my-4 hidden lg:grid gap-3'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              return (
                <div>
                  <p className='font-semibold'>{element}</p>
                  <p className='text-base'>{data?.more_details[element]}</p>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='p-4 lg:pl-7 text-base lg:text-lg'>
        <p className='bg-green-300 w-fit rounded-full px-2'>10 min</p>
        <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
        <p className=''>{data.unit}</p>
        <Divider />
        <div>
          <p>Price</p>
          <div className='flex items-center gap-2 lg:gap-4'>
            <div className='border border-green-600 px-4 py-2 rounded bg-green-100 w-fit'>
              <p className='font-semibold text-lg lg:text-xl'>
                {DisplayPriceInRupees(priceWithDiscount(data.price, data.discount))}
              </p>
            </div>
            {
              data.discount && (
                <p className='line-through text-lg'>{DisplayPriceInRupees(data.price)}</p>
              )
            }
            {
              data.discount && (
                <p className='font-semibold text-green-600 lg:text-2xl'>
                  {data.discount}%
                  <span className='text-base text-neutral-500'> Discount</span>
                </p>
              )
            }
          </div>
        </div>
        {
          data.stock === 0 ? (
            <p className='text-lg text-red-500 my-2'>Out Of Stock</p>
          ) : (
            // <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>Add</button>
            <div className='my-4'>
              <AddToCartButton data={data} />
            </div>
          )
        }

        <h2 className='font-semibold'>Why Shp From Binkeyit ?</h2>
        <div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image1}
              alt='superfast delivery'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Superfast Delivery</div>
              <p>Get your orer delivered to your doorstep at the earliest from dark stores near you.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image2}
              alt='Best price & offers'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Best Prices & Offers</div>
              <p>Best price destination with offers directly from the nanufacturers.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image3}
              alt='Wide Assortment'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Wide Assortment</div>
              <p>Choose from 5000+ products across food personal care, household & other categories.</p>
            </div>
          </div>
        </div>
        {/* only mobile view */}
        <div className='my-4 grid lg:hidden gap-3'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              return (
                <div>
                  <p className='font-semibold'>{element}</p>
                  <p className='text-base'>{data?.more_details[element]}</p>
                </div>
              )
            })
          }
        </div>
      </div>

    </section>
  )
}

export default ProducDisplayPage
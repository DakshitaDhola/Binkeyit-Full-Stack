import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/uploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import SuccessAlert from '../utils/SuccessAlert.js';

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {}
  })

  const [imageLoading, setImageLoading] = useState(false)
  const [viewImageUrl, setViewImageUrl] = useState("")

  const allCategory = useSelector(state => state.product.allCategory)

  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")

  const allSubCategory = useSelector(state => state.product.allSubCategory)
  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")

  console.log("allSubCategory",allSubCategory)


  const handleChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }

    setImageLoading(true)
    const response = await uploadImage(file)
    const { data: ImageResponse } = response
    const imageUrl = ImageResponse.data.url

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl]
      }
    })
    setImageLoading(false)
  }

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: ""
        }
      }
    })
    setFieldName("")
    setOpenAddField(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log("data", data)

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data
      })
      const { data: responseData } = response
      if (responseData.success) {
        SuccessAlert(responseData.message)
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h1 className='font-semibold'>Upload Product</h1>
      </div>
      <div className='grid p-3'>
        <form action="" className='grid gap-4' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor='name' className='font-medium'>Name</label>
            <input
              id='name'
              name='name'
              type='text'
              required
              placeholder='Enter Product Name'
              value={data.name}
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='description' className='font-medium'>Description</label>
            <textarea
              id='description'
              name='description'
              type='text'
              required
              placeholder='Enter Product Description'
              value={data.description}
              onChange={handleChange}
              multiple
              rows={3}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
            />
          </div>
          <div>
            <p>
              Image
            </p>
            <div>
              <label htmlFor='productImage' className='bg-blue-50 font-medium border rounded h-24 flex justify-center items-center cursor-pointer'>
                <div className='text-center flex justify-center items-center flex-col'>
                  {
                    imageLoading ? <Loading /> : (
                      <>
                        <FaCloudUploadAlt size={35} />
                        <p>Upload Image</p>
                      </>
                    )
                  }
                </div>
                <input
                  type='file'
                  id='productImage'
                  className='hidden'
                  // accept='image/*'
                  onChange={handleUploadImage}
                />
              </label>
              {/* display Uploaded Image */}
              <div className='flex flex-wrap gap-4'>
                {
                  data.image.map((img, index) => {
                    return (
                      <div key={img + index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
                        <img
                          src={img}
                          alt={img}
                          className='w-full h-full object-scale-down cursor-pointer'
                          onClick={() => { setViewImageUrl(img) }}
                        />
                        <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 text-white hover:bg-red-600 rounded hidden group-hover:block cursor-pointer'>
                          <MdDelete />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor="category" className='font-medium'>Category</label>
            <div>
              <select className='bg-blue-50 border w-full p-2 rounded'
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const category = allCategory.find(el => el._id === value)

                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category]
                    }
                  })
                  setSelectCategory("")
                }}>
                <option value={""}>Select Category</option>
                {
                  allCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.category.map((c, index) => {
                    return (
                      <div key={c._id + index + "productSection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveCategory(index)}>
                          <IoClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor="subCategory" className='font-medium'>Sub Category</label>
            <div>
              <select className='bg-blue-50 border w-full p-2 rounded'
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const subCategory = allSubCategory.find(el => el._id === value)

                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory,subCategory]
                    }
                  })
                  setSelectSubCategory("")
                }}>
                <option value={""} className='text-neutral-600'>Select Sub Category</option>
                {
                  allSubCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.subCategory.map((c, index) => {
                    return (
                      <div key={c._id + index + "subCategorySection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveSubCategory(index)}>
                          <IoClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor='unit' className='font-medium'>Unit</label>
            <input
              id='unit'
              name='unit'
              type='text'
              required
              placeholder='Enter Product Unit'
              value={data.unit}
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='stock' className='font-medium'>Number Of Stock</label>
            <input
              id='stock'
              name='stock'
              type='number'
              required
              placeholder='Enter Product stock'
              value={data.stock}
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='price' className='font-medium'>Price</label>
            <input
              id='price'
              name='price'
              type='number'
              required
              placeholder='Enter Product price'
              value={data.price}
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='discount' className='font-medium'>Discount</label>
            <input
              id='discount'
              name='discount'
              type='number'
              required
              placeholder='Enter Product Discount'
              value={data.discount}
              onChange={handleChange}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>

          {/* add more fields */}
          {
            Object?.keys(data?.more_details)?.map((k, index) => {
              return (
                <div className='grid gap-1'>
                  <label htmlFor={k} className='font-medium'>{k}</label>
                  <input
                    id={k}
                    type='text'
                    required
                    value={data?.more_details[k]}
                    onChange={(e) => {
                      const value = e.target.value

                      setData((preve) => {
                        return {
                          ...preve,
                          more_details: {
                            ...preve.more_details,
                            [k]: value
                          }
                        }
                      })
                    }}
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                  />
                </div>
              )
            })
          }

          <div onClick={() => setOpenAddField(true)} className='bg-white hover:bg-primary-200 py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
            Add Fields
          </div>

          <button className='bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold'>
            Submit
          </button>
        </form>
      </div>
      {
        viewImageUrl && (
          <ViewImage url={viewImageUrl} close={() => setViewImageUrl("")} />
        )
      }
      {
        openAddField && (
          <AddFieldComponent close={() => setOpenAddField(false)}
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField} />
        )
      }
    </section>
  )
}

export default UploadProduct
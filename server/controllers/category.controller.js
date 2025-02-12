import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.js";
import ProductModel from "../models/product.model.js";

export const AddCategoryController = async(request,response) => {
    try {
        const {name,image} = request.body

        if(!name || !image){
            return response.status(400).json({
                message : "Enter Required Fields",
                error : true, 
                success : false
            })
        }

        const addCategory = new CategoryModel({
            name,
            image
        }) 

        const saveCategory = await addCategory.save()

        if(!saveCategory){
            return response.status(500).json({
                message : "Not Created",
                error : true,
                success : false
            })
        }

        return response.json({
            message : "Add Category Successfully....",
            error : false,
            success : true,
            data : saveCategory
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getCategoryController = async(request,response) => {
    try {
        const data = await CategoryModel.find().sort({ createdAt : -1 })

        return response.json({
            data : data,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const updateCategoryController = async(request,response) => {
    try {
        const {_id,name,image} = request.body

        const update = await CategoryModel.updateOne({
            _id : _id
        },{
            name,
            image
        })
        return response.json({
            message : "Update Category Successfully..",
            error : false,
            success : true,
            data : update
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteCategoryController = async(request,response) => {
    try {
        const { _id } = request.body

        const checkSubCategory = await SubCategoryModel.find({
            category : {
                "$in" : [ _id ]
            }
        }).countDocuments()

        const checkProduct = await ProductModel.find({
            category : {
                "$in" : [ _id ]
            }
        }).countDocuments()

        if(checkSubCategory > 0 || checkProduct > 0){
            return response.status(400).json({
                message : "Category Is Already Use Can't Delete.",
                error : true,
                success : false
            })
        }

        const deleteCategory = await CategoryModel.deleteOne({ _id : _id })

        return response.json({
            message : "Delete Category Successfully....",
            error : false,
            success : true,
            data : deleteCategory
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
import { prisma } from "../../lib/prisma";

const createCategoriesIntoDB = async(categoryName: string) => {    
    const isCategoryExists = await prisma.categories.findUnique({
        where: {categoryName}
    })
    if(isCategoryExists){
        throw new Error("Category already exists.")
    }

    const result = await prisma.categories.create({
        data: {
            categoryName
        }
    })

    return result;
}

const getAllCategoriesFromDB = async() => { 
    const categories = await prisma.categories.findMany({})

    const countCategories = categories.length
    return {
        total: countCategories,
        categories
    };
}

export const categoriesService = {
    createCategoriesIntoDB,
    getAllCategoriesFromDB
}
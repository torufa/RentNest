import { prisma } from "../../lib/prisma";

const createCategoriesIntoDB = async(categoryName: string) => {    
    const isCategoryExists = await prisma.categories.findUniqueOrThrow({
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

export const categoriesService = {
    createCategoriesIntoDB
}
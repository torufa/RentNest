import { prisma } from "../../lib/prisma";

const createCategoriesIntoDB = async(categoryName: string) => {    

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
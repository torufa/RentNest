import { PropertyStatus } from "../../../generated/prisma/enums";
import { PropertiesWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IPropertiesQuery } from "./properties.interface";

const getPropertyByIdFromDB = async (propertyId: string) => {
  const result = await prisma.properties.findUniqueOrThrow({
    where: { id: propertyId },
    include: {
      reviews: true,
      user: {
        omit: { password: true },
      },
    },
  });

  return result;
};

const getAllPropertiesFromDB = async (query: IPropertiesQuery) => {
  const limit = query.limit ? Number(query.limit) : 15;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy || "createdAt";
  const sortOrder = query.sortOrder || "desc";

  const amenities = query.amenities
    ? JSON.parse(query.amenities as string)
    : null;
  const amenitiesArray = Array.isArray(amenities) ? amenities : [];

  const andConditions: PropertiesWhereInput[] = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: [
        { propertyName: { contains: query.searchTerm, mode: "insensitive" } },
        { description: { contains: query.searchTerm, mode: "insensitive" } },
        { location: { contains: query.searchTerm, mode: "insensitive" } },
        { amenities: { hasSome: [query.searchTerm] } },
        {
          category: {
            categoryName: { contains: query.searchTerm, mode: "insensitive" },
          },
        },
      ],
    });
  }

  if (query.propertyName) {
    andConditions.push({
      propertyName: query.propertyName,
    });
  }
  if (query.location) {
    andConditions.push({
      location: query.location,
    });
  }
  if (query.amenities) {
    andConditions.push({
      amenities: {
        hasSome: amenitiesArray,
      },
    });
  }
  if (query.category) {
    andConditions.push({
      category: {
        categoryName: {
          equals: query.category as string,
          mode: "insensitive",
        },
      },
    });
  }
  if (query.price) {
    andConditions.push({
      price: {
        equals: Number(query.price),
      },
    });
  }
  if (query.minPrice) {
    andConditions.push({
      price: {
        gte: Number(query.minPrice),
      },
    });
  }
  if (query.maxPrice) {
    andConditions.push({
      price: {
        lte: Number(query.maxPrice),
      },
    });
  }
  if (query.status) {
    andConditions.push({
      status: query.status.toUpperCase() as PropertyStatus,
    });
  }

  const result = await prisma.properties.findMany({
    where: {
      AND: andConditions,
    },
    include: {
      category: {
        select: {
          categoryName: true,
        },
      },
      user: true,
      reviews: true,
    },

    take: limit,
    skip: skip,

    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const countProperties = result.length;
  return {
    total: countProperties,
    property: result,
  };
};

export const propertiesService = {
  getPropertyByIdFromDB,
  getAllPropertiesFromDB,
};

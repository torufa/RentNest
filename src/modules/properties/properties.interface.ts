import { PropertyStatus } from "../../../generated/prisma/enums";
import { PropertiesWhereInput } from "../../../generated/prisma/models";

export interface IPropertiesQuery extends PropertiesWhereInput{
    searchTerm? : string;
    page? : string;
    limit? : string;
    sortOrder? : string;
    sortBy? : string;

    minPrice?: string;
    maxPrice?:string;
    status: PropertyStatus
}
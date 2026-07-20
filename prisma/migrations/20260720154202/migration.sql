-- AlterTable
ALTER TABLE "properties" ALTER COLUMN "picture" DROP NOT NULL,
ALTER COLUMN "amenities" SET DEFAULT ARRAY[]::TEXT[];

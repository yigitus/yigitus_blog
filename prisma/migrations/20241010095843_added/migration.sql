-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "publish_date" TIMESTAMP(3),
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

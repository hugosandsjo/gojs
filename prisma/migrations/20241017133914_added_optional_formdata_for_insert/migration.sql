-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "image_url" DROP NOT NULL,
ALTER COLUMN "available_stock" DROP NOT NULL;

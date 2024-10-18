/*
  Warnings:

  - You are about to alter the column `height` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `width` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `depth` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `weight` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "height" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "width" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "depth" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION;

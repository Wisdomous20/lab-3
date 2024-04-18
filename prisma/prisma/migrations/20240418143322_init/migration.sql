/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "pogsId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pogs" (
    "id" SERIAL NOT NULL,
    "pogs_name" TEXT NOT NULL,
    "ticker_symbol" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "current_price" DOUBLE PRECISION NOT NULL,
    "previous_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pogs_pogs_name_key" ON "Pogs"("pogs_name");

-- CreateIndex
CREATE UNIQUE INDEX "Pogs_ticker_symbol_key" ON "Pogs"("ticker_symbol");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_pogsId_fkey" FOREIGN KEY ("pogsId") REFERENCES "Pogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

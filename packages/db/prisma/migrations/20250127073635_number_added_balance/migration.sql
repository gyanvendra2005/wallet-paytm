/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Balance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Balance" ADD COLUMN     "number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Balance_number_key" ON "Balance"("number");

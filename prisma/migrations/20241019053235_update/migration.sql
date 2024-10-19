/*
  Warnings:

  - You are about to drop the column `security` on the `hostels` table. All the data in the column will be lost.
  - Added the required column `security_fee` to the `hostels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hostels" DROP COLUMN "security",
ADD COLUMN     "security_fee" INTEGER NOT NULL;

/*
  Warnings:

  - You are about to drop the column `name` on the `SupportMember` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `TicketAuthor` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `TicketAuthor` table. All the data in the column will be lost.
  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstName` to the `SupportMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `SupportMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `TicketAuthor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `TicketAuthor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_resourceAssignedId_fkey";

-- AlterTable
ALTER TABLE "SupportMember" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TicketAuthor" DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Resource";

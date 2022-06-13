/*
  Warnings:

  - You are about to drop the column `email` on the `TicketAuthor` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `TicketAuthor` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `TicketAuthor` table. All the data in the column will be lost.
  - Added the required column `CUIT` to the `TicketAuthor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razonSocial` to the `TicketAuthor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TicketAuthor" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "CUIT" TEXT NOT NULL,
ADD COLUMN     "razonSocial" TEXT NOT NULL;

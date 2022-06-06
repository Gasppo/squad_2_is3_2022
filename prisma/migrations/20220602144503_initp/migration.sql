-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_productId_fkey";

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

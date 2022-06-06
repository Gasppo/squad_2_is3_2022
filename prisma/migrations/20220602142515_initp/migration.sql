-- AlterTable
CREATE SEQUENCE "ticketauthor_id_seq";
ALTER TABLE "TicketAuthor" ALTER COLUMN "id" SET DEFAULT nextval('ticketauthor_id_seq');
ALTER SEQUENCE "ticketauthor_id_seq" OWNED BY "TicketAuthor"."id";

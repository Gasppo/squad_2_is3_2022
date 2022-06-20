import { PrismaClient, TicketAuthor } from "@prisma/client";
import { Request, Response } from "express";


//Out of scope
type getManyTicketAuthorsData = {
    name?: string;
    message?: string;
    ticketAuthors?: TicketAuthor[];
}

type getSingleTicketAuthorData = {
    name?: string;
    message?: string;
    ticketAuthor?: TicketAuthor | null;
}

const prisma = new PrismaClient()

export async function getAllTicketAuthors(req: Request, res: Response<getManyTicketAuthorsData>) {
    try {
        const ticketAuthors = await prisma.ticketAuthor.findMany()
        res.json({
            ticketAuthors: ticketAuthors,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Error',
            message: e.message,
        })
    }
}

export async function getTicketAuthorById(req: Request, res: Response<getSingleTicketAuthorData>) {
    try {
        const { id } = req.params
        const ticketAuthor = await prisma.ticketAuthor.findFirst({
            where: {
                id: Number(id),
            },
        })
        res.json({
            ticketAuthor: ticketAuthor,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Error finding ticket author',
            message: e.message,
        })
    }
}

export async function createTicketAuthor(req: Request, res: Response<getSingleTicketAuthorData>) {
    const reqBody: TicketAuthor = req.body
    try {
        const ticketAuthor = await prisma.ticketAuthor.create({
            data: {
                razonSocial: reqBody.razonSocial,
                CUIT: reqBody.CUIT,
            },
        })
        res.json({
            ticketAuthor: ticketAuthor,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Error creating ticket author',
            message: e.message,
        })
    }
}

export async function deleteTicketAuthor(req: Request, res: Response<getSingleTicketAuthorData>) {
    try {
        const { id } = req.params
        const ticketAuthor = await prisma.ticketAuthor.delete({
            where: {
                id: Number(id),
            },
        })
        res.json({
            ticketAuthor: ticketAuthor,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Error deleting ticket author',
            message: e.message,
        })
    }
}

export async function updateTicketAuthor(req: Request, res: Response<getSingleTicketAuthorData>) {
    try {
        const { id } = req.params
        const ticketAuthor = await prisma.ticketAuthor.update({
            where: {
                id: Number(id),
            },
            data: {
                razonSocial: req.body.razonSocial,
                CUIT: req.body.CUIT,
            },
        })
        res.json({
            ticketAuthor: ticketAuthor,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Error updating ticket author',
            message: e.message,
        })
    }
}

export async function getAuthorByCUIT(req: Request, res: Response<getSingleTicketAuthorData>) {
    try {
        const { CUIT } = req.params
        const ticketAuthor = await prisma.ticketAuthor.findFirst({
            where: {
                CUIT: CUIT,
            },
        })
        res.json({
            ticketAuthor: ticketAuthor,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Error finding ticket author',
            message: e.message,
        })
    }
}
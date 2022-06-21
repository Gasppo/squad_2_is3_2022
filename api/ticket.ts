import { PrismaClient, Ticket } from "@prisma/client";
import { Request, Response } from "express";

type getManyTicketsData = {
    name?: string;
    message?: string;
    tickets?: Ticket[];
}

type getSingleTicketData = {
    name?: string;
    message?: string;
    ticket?: Ticket | null;
}

type CreationTicketsData = {
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    status: string;
    priority: number;
    asigneeId: number | null;
    authorId: number;
    productId: number | null;
    productLicenseId: number | null;
    internal: boolean;
}

const statuses = ["Abierto", "Cerrado", "En analisis", "Rechazado"]

const checkStatus = (status: string) => {
    if (!statuses.includes(status)) {
        throw new Error(`Invalid status: ${status}`);
    }
}

const checkTicketRequiredFields = (ticket: CreationTicketsData) => {
    if (!ticket.title) {
        throw new Error("Title is required");
    }
    if (!ticket.description) {
        throw new Error("Description is required");
    }
    if (!ticket.status) {
        throw new Error("Status is required");
    }
    if (!ticket.authorId) {
        throw new Error("Author ID is required");
    }
    if (!ticket.priority) {
        throw new Error("Priority is required");
    }
    checkStatus(ticket.status);
}


const prisma = new PrismaClient()

export async function getAllTickets(req: Request, res: Response<getManyTicketsData>) {
    try {
        const tickets = await prisma.ticket.findMany()
        res.json({
            tickets: tickets,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Error',
            message: e.message,
        })
    }
}

export async function getTicketById(req: Request, res: Response<getSingleTicketData>) {
    try {
        const { id } = req.params
        const ticket = await prisma.ticket.findFirst({
            where: {
                id: Number(id),
            },
        })
        res.json({
            ticket: ticket,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Error finding ticket',
            message: e.message,
        })
    }
}

export async function getAllTicketsByAuthor(req: Request, res: Response<getManyTicketsData>) {
    try {
        const { authorId } = req.params
        const tickets = await prisma.ticket.findMany({
            where: {
                authorId: Number(authorId),
            },
        })
        res.json({
            tickets: tickets,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Error finding tickets',
            message: e.message,
        })
    }
}

export async function getAllTicketsByProduct(req: Request, res: Response<getManyTicketsData>) {
    try {
        const { productId } = req.params
        const tickets = await prisma.ticket.findMany({
            where: {
                productId: Number(productId),
            },
        })
        res.json({
            tickets: tickets,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Error finding tickets',
            message: e.message,
        })
    }
}

export async function createTicket(req: Request, res: Response<getSingleTicketData>) {
    const reqBody: Ticket = req.body
    try {
        const newTicket = {
            createdAt: new Date(),
            updatedAt: new Date(),
            title: reqBody.title,
            description: reqBody.description,
            status: reqBody.status,
            priority: reqBody.priority,
            asigneeId: reqBody.asigneeId,
            authorId: reqBody.authorId,
            productId: reqBody.productId,
            productLicenseId: reqBody.productLicenseId,
            internal: reqBody.internal || false,
        }
        checkTicketRequiredFields(newTicket)

        const ticket = await prisma.ticket.create({
            data: newTicket
        })
        res.json({
            ticket: ticket,
        })
    }
    catch (e: any) {
        console.log(e.message)
        res.status(500).json({
            name: 'Error creating ticket',
            message: e.message,
        })
    }
}

export async function updateTicket(req: Request, res: Response<getSingleTicketData>) {
    const reqBody: Ticket = req.body
    const { id } = req.params
    try {
        if(reqBody.status) checkStatus(reqBody.status)
        const ticket = await prisma.ticket.update({
            where: {
                id: Number(id),
            },
            data: {
                createdAt: undefined,
                updatedAt: new Date(),
                title: reqBody.title || undefined,
                description: reqBody.description || undefined,
                status: reqBody.status || undefined,
                priority: reqBody.priority || undefined,
                asigneeId: reqBody.asigneeId || undefined,
                authorId: reqBody.authorId || undefined,
                productId: reqBody.productId || undefined,
                internal: reqBody.internal || undefined,
                productLicenseId: reqBody.productLicenseId || undefined
            }
        })
        res.json({
            ticket: ticket,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Error updating ticket',
            message: e.message,
        })
    }
}

export async function deleteTicket(req: Request, res: Response<getSingleTicketData>) {
    try {
        const { id } = req.params
        const ticket = await prisma.ticket.delete({
            where: {
                id: Number(id),
            },
        })
        res.json({
            ticket: ticket,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Error deleting ticket',
            message: e.message,
        })
    }
}

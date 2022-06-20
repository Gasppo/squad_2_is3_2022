import { PrismaClient, SupportMember } from "@prisma/client";
import { Request, Response } from "express";



//Out of scope
type getManySupportMembersData = {
    name?: string;
    message?: string;
    supportMembers?: SupportMember[];
}

type getSingleSupportMemberData = {
    name?: string;
    message?: string;
    supportMember?: SupportMember | null;
}

const prisma = new PrismaClient()

export async function getAllSupportMembers(req: Request, res: Response<getManySupportMembersData>) {
    try {
        const supportMembers = await prisma.supportMember.findMany()
        res.json({
            supportMembers: supportMembers,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Error',
            message: e.message,
        })
    }
}

export async function getSupportMemberById(req: Request, res: Response<getSingleSupportMemberData>) {
    try {
        const { id } = req.params
        const supportMember = await prisma.supportMember.findFirst({
            where: {
                id: Number(id),
            },
        })
        res.json({
            supportMember: supportMember,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Error finding user',
            message: e.message,
        })
    }
}

export async function createSupportMember(req: Request, res: Response<getSingleSupportMemberData>) {
    try {
        const supportMember = await prisma.supportMember.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            }
        })
        res.json({
            supportMember: supportMember,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Create Error',
            message: e.message,
        })
    }
}

export async function deleteSupportMember(req: Request, res: Response<getSingleSupportMemberData>) {
    try {
        const { id } = req.params
        const supportMember = await prisma.supportMember.delete({
            where: {
                id: Number(id),
            },
        })
        res.json({
            supportMember: supportMember,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Delete Error',
            message: e.message,
        })
    }
}

export async function updateSupportMember(req: Request, res: Response<getSingleSupportMemberData>) {
    try {
        const { id } = req.params
        const supportMember = await prisma.supportMember.update({
            where: {
                id: Number(id),
            },
            data: {
                firstName: req.body.firstName || undefined ,
                lastName: req.body.lastName || undefined,
                email: req.body.email || undefined,
            }
        })
        res.json({
            supportMember: supportMember,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Update Error',
            message: e.message,
        })
    }
}
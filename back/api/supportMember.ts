import { PrismaClient, SupportMember } from "@prisma/client";
import { Request, Response } from "express";

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
            name: 'Prueba',
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
            name: 'Prueba',
            message: e.message,
        })
    }
}

export async function createSupportMember(req: Request, res: Response<getSingleSupportMemberData>) {
    try {
        const supportMember = await prisma.supportMember.create({
            data: {
                name: req.body.name,
                email: req.body.email,
            }
        })
        res.json({
            supportMember: supportMember,
        })
    }
    catch (e: any) {
        res.status(500).json({
            name: 'Prueba',
            message: e.message,
        })
    }
}
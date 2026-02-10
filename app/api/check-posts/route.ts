import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany();
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}

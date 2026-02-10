import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            select: {
                id: true,
                title: true,
                slug: true
            }
        });

        return NextResponse.json({
            count: posts.length,
            posts
        });

    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}

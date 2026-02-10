import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const slug = 'alimentacion-cuyes-zonas-altura-granja-saosini';
        const post = await prisma.blogPost.findUnique({
            where: { slug }
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ post });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}

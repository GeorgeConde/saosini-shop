import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const slug = 'control-ectoparasitos-cuyes';
        const post = await prisma.blogPost.findUnique({
            where: { slug }
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const filePath = path.join(process.cwd(), 'temp_reference_content.txt');
        fs.writeFileSync(filePath, post.content);

        return NextResponse.json({ success: true, filePath });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}

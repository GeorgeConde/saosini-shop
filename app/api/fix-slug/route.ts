import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Buscar el post que probablemente tiene el título de Alimentación pero el slug mal
        // Podemos buscar por una parte del slug o por el título
        const post = await prisma.blogPost.findFirst({
            where: {
                title: {
                    contains: 'Alimentación'
                }
            }
        });

        if (!post) {
            return NextResponse.json({ error: "No se encontró el artículo de alimentación" }, { status: 404 });
        }

        const exactSlug = 'alimentacion-cuyes-zonas-altura-granja-saosini';

        // Actualizar el slug al correcto
        const updated = await prisma.blogPost.update({
            where: { id: post.id },
            data: {
                slug: exactSlug
            }
        });

        return NextResponse.json({
            success: true,
            message: "Slug restaurado correctamente",
            previousSlug: post.slug,
            newSlug: updated.slug
        });

    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}

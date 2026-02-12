import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Verifica que el usuario actual tiene rol ADMIN.
 * Usar al inicio de cada server action que requiera privilegios de administrador.
 * 
 * @throws Retorna un objeto de error si no está autenticado o no es admin.
 */
export async function requireAdmin() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return { authorized: false, error: "No autenticado" } as const;
    }

    if ((session.user as any).role !== "ADMIN") {
        return { authorized: false, error: "Acceso denegado" } as const;
    }

    return { authorized: true, userId: (session.user as any).id } as const;
}

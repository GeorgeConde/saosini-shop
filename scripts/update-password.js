const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function update() {
    const email = process.argv[2];
    const newPassword = process.argv[3];

    if (!email || !newPassword) {
        console.error('Uso: node scripts/update-password.js <email> <nueva_contraseña>');
        process.exit(1);
    }
    if (newPassword.length < 12) {
        console.error('La contraseña debe tener al menos 12 caracteres.');
        process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await prisma.user.update({
        where: { email },
        data: { password: hashedPassword }
    });
    console.log('Contraseña actualizada para:', user.email);
}

update().finally(() => prisma.$disconnect());

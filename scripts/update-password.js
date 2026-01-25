const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function update() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const user = await prisma.user.update({
        where: { email: 'admin@saosini.com' },
        data: { password: hashedPassword }
    });
    console.log('User password updated for:', user.email);
}

update().finally(() => prisma.$disconnect());

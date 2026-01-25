const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const user = await prisma.user.findUnique({
        where: { email: 'admin@saosini.com' }
    });
    console.log('User found:', user ? 'YES' : 'NO');
    if (user) {
        console.log('User Details:', JSON.stringify({ ...user, password: user.password ? '[SET]' : '[NOT SET]' }, null, 2));
    }
}

check().finally(() => prisma.$disconnect());

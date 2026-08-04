const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const email = process.argv[2];
    if (!email) {
        console.error('Uso: node scripts/check-user.js <email>');
        process.exit(1);
    }
    const user = await prisma.user.findUnique({
        where: { email }
    });
    console.log('User found:', user ? 'YES' : 'NO');
    if (user) {
        console.log('User Details:', JSON.stringify({ ...user, password: user.password ? '[SET]' : '[NOT SET]' }, null, 2));
    }
}

check().finally(() => prisma.$disconnect());

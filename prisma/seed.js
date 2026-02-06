const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@csecgwl.in';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create Admin User
    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    console.log('Admin user created/updated');

    // Create Default Settings
    await prisma.settings.upsert({
        where: { id: 'default' },
        update: {},
        create: {
            id: 'default',
            phone: '+91 99931 16644',
            email: 'csecgwl@gmail.com',
            address: 'Near Gwalior Trade Fair Ground, Gwalior, MP, India',
            facebook: 'https://facebook.com/csecgwl',
            instagram: 'https://instagram.com/csecgwl',
        },
    });

    console.log('Default settings created');

    // Create some courses
    const courses = [
        { title: 'MBBS', slug: 'mbbs', description: 'Bachelor of Medicine and Bachelor of Surgery' },
        { title: 'B.Tech', slug: 'btech', description: 'Bachelor of Technology in various streams' },
        { title: 'MBA', slug: 'mba', description: 'Master of Business Administration' },
        { title: 'BBA', slug: 'bba', description: 'Bachelor of Business Administration' },
    ];

    for (const course of courses) {
        await prisma.course.upsert({
            where: { slug: course.slug },
            update: {},
            create: course,
        });
    }

    console.log('Initial courses created');

    // Create some universities
    const universities = [
        { name: 'Jiwaji University', slug: 'jiwaji-university', location: 'Gwalior', description: 'One of the leading universities in MP' },
        { name: 'Amity University', slug: 'amity-university', location: 'Gwalior', description: 'Top private university' },
    ];

    for (const uni of universities) {
        await prisma.university.upsert({
            where: { slug: uni.slug },
            update: {},
            create: uni,
        });
    }

    console.log('Initial universities created');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create CEO department
    const ceoDepartment = await prisma.department.create({
      data: {
        name: 'CEO',
        description: 'Chief Executive Officer',
        managing_department_id: -1,
      },
    });

    // Create CTO department under CEO
    await prisma.department.create({
      data: {
        name: 'CTO',
        description: 'Chief Technology Officer',
        managing_department_id: ceoDepartment.id,
      },
    });

    // Create CMO department under CEO
    await prisma.department.create({
      data: {
        name: 'CMO',
        description: 'Chief Marketing Officer',
        managing_department_id: ceoDepartment.id,
      },
    });

    // Create CFO department under CEO
    await prisma.department.create({
      data: {
        name: 'CFO',
        description: 'Chief Financial Officer',
        managing_department_id: ceoDepartment.id,
      },
    });

    // Create COO department under CEO
    await prisma.department.create({
      data: {
        name: 'COO',
        description: 'Chief Operating Officer',
        managing_department_id: ceoDepartment.id,
      },
    });

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

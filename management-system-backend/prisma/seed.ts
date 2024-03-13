import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const departmentsData = [
    {
      name: 'Engineering',
      description: 'Responsible for software development and infrastructure',
    },
    {
      name: 'Marketing',
      description: 'Responsible for promoting the company and its products',
    },
    {
      name: 'Finance',
      description: 'Responsible for financial planning and management',
    },
  ];

  await prisma.department.createMany({
    data: departmentsData,
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create sample jobs
  const jobs = [
    {
      title: 'Software Engineer',
      description: 'Develop scalable web applications.',
      location: 'Lilongwe, Malawi',
      salary: 120000,
    },
    {
      title: 'Product Manager',
      description: 'Lead product development and strategy.',
      location: 'Blantyre, Malawi',
      salary: 150000,
    },
    {
      title: 'Data Scientist',
      description: 'Analyze and interpret complex data sets.',
      location: 'Zomba, Malawi',
      salary: 130000,
    },
    {
      title: 'UX Designer',
      description: 'Create user-centered design solutions.',
      location: 'Mangochi, Malawi',
      salary: 110000,
    },
    {
      title: 'DevOps Engineer',
      description: 'Implement and maintain CI/CD pipelines.',
      location: 'Mzuzu, Malawi',
      salary: 140000,
    },
  ];

  // Create jobs
  for (const job of jobs) {
    await prisma.job.create({
      data: {
        ...job,
        postedDate: new Date(),
      },
    });
  }

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

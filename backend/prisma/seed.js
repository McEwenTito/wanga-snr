const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const jobs = [
    {
      title: 'Software Engineer',
      description: 'Develop scalable web applications.',
      location: 'Lilongwe, Malawi',
      salary: '120000',
    },
    {
      title: 'Product Manager',
      description: 'Manage the product lifecycle.',
      location: 'Blantyre, Malawi',
      salary: '110000',
    },
    {
      title: 'Data Scientist',
      description: 'Analyze large datasets to inform business decisions.',
      location: 'Mzuzu, Malawi',
      salary: '130000',
    },
    {
      title: 'Frontend Developer',
      description: 'Build user-facing features and interfaces.',
      location: 'Zomba, Malawi',
      salary: '100000',
    },
    {
      title: 'Backend Developer',
      description: 'Develop server-side logic and APIs.',
      location: 'Mangochi, Malawi',
      salary: '105000',
    },
    {
      title: 'Full Stack Developer',
      description: 'Develop both frontend and backend code.',
      location: 'Kasungu, Malawi',
      salary: '115000',
    },
    {
      title: 'UX/UI Designer',
      description: 'Design user-friendly interfaces and experiences.',
      location: 'Salima, Malawi',
      salary: '90000',
    },
    {
      title: 'DevOps Engineer',
      description: 'Maintain cloud infrastructure and CI/CD pipelines.',
      location: 'Karonga, Malawi',
      salary: '120000',
    },
    {
      title: 'Product Designer',
      description: 'Design user-centered products and prototypes.',
      location: 'Lilongwe, Malawi',
      salary: '95000',
    },
    {
      title: 'Data Engineer',
      description: 'Build and maintain data pipelines.',
      location: 'Chintheche, Malawi',
      salary: '125000',
    },
  ];

  // Create job listings in the database
  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const users = [
  {
    email: 'ash@pokemon.com',
    password: 'pikachu123',
  },
  {
    email: 'oak@pokemon.com',
    password: 'research123',
  },
  {
    email: 'misty@pokemon.com',
    password: 'starmie123',
  },
];

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create users
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: { password: hashedPassword },
      create: {
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

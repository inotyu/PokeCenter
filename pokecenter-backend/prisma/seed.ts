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

async function fetchPokemonData(limit: number = 15) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await response.json();
  const pokemons = [];

  for (const pokemon of data.results) {
    const detailResponse = await fetch(pokemon.url);
    const detail = await detailResponse.json();

    const hp = detail.stats.find((stat: any) => stat.stat.name === 'hp')?.base_stat || 50;
    const type = detail.types[0]?.type.name || 'normal';
    const imageUrl = detail.sprites.other['official-artwork'].front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detail.id}.png`;

    pokemons.push({
      name: detail.name,
      type,
      level: Math.floor(Math.random() * 50) + 1,
      hp,
      pokedexNumber: detail.id,
      imageUrl,
    });
  }

  return pokemons;
}

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create users
  const createdUsers = [];
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: { password: hashedPassword },
      create: {
        email: user.email,
        password: hashedPassword,
      },
    });
    createdUsers.push(createdUser);
  }

  // Fetch and create Pokemon
  console.log('📡 Fetching Pokemon data from PokeAPI...');
  const pokemonData = await fetchPokemonData(15);

  for (let i = 0; i < pokemonData.length; i++) {
    const pokemon = pokemonData[i];
    const owner = createdUsers[i % createdUsers.length];

    await prisma.pokemon.create({
      data: {
        ...pokemon,
        ownerId: owner.id,
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

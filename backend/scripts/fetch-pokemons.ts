import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Lista dos Pokémons que queremos adicionar
const pokemonIds = [
  149, // Dragonite
  6,   // Charizard
  282, // Gardevoir
  25,  // Pikachu
  658, // Greninja
  384, // Rayquaza
  448, // Lucario
  150, // Mewtwo
  445, // Garchomp
  9,   // Blastoise
  3,   // Venusaur
  392, // Infernape
  248, // Tyranitar
  373, // Salamence
  376, // Metagross
];

interface PokemonData {
  name: string;
  type: string;
  level: number;
  hp: number;
  pokedexNumber: number;
  imageUrl: string;
}

async function fetchPokemonFromAPI(id: number): Promise<PokemonData | null> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      console.error(`Erro ao buscar Pokémon ${id}: ${response.status}`);
      return null;
    }

    const data = await response.json();

    // Extrair dados necessários
    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const types = data.types.map((t: any) => t.type.name.toLowerCase());
    const type = types.length > 1 ? types.join('/') : types[0];
    const level = Math.floor(Math.random() * 95) + 5; // Nível aleatório entre 5-100
    const hp = data.stats[0].base_stat;
    const pokedexNumber = data.id;
    const imageUrl = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;

    return {
      name,
      type,
      level,
      hp,
      pokedexNumber,
      imageUrl,
    };
  } catch (error) {
    console.error(`Erro ao fazer fetch do Pokémon ${id}:`, error);
    return null;
  }
}

async function main() {
  console.log('🌐 Fazendo fetch dos Pokémons da PokeAPI...');

  const pokemons: PokemonData[] = [];

  for (const id of pokemonIds) {
    console.log(`Buscando Pokémon ID: ${id}`);
    const pokemon = await fetchPokemonFromAPI(id);
    if (pokemon) {
      pokemons.push(pokemon);
      console.log(`✅ ${pokemon.name} (${pokemon.type}) - HP: ${pokemon.hp}, Level: ${pokemon.level}`);
    }
    // Pequena pausa para não sobrecarregar a API
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log(`\n📊 Total de Pokémons coletados: ${pokemons.length}`);

  // Agora vamos adicionar ao banco de dados
  const firstUser = await prisma.user.findFirst({
    where: { email: 'ash@pokemon.com' },
  });

  if (!firstUser) {
    console.error('❌ Usuário ash@pokemon.com não encontrado!');
    return;
  }

  console.log('\n💾 Adicionando Pokémons ao banco de dados...');

  for (const pokemon of pokemons) {
    try {
      await prisma.pokemon.create({
        data: {
          ...pokemon,
          ownerId: firstUser.id,
        },
      });
      console.log(`✅ ${pokemon.name} adicionado ao banco`);
    } catch (error) {
      console.error(`❌ Erro ao adicionar ${pokemon.name}:`, error);
    }
  }

  console.log('\n🎉 Todos os Pokémons foram adicionados com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro geral:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

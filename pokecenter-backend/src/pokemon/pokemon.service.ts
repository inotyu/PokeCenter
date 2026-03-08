import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePokemonDto, UpdatePokemonDto } from './dto/pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  async create(createPokemonDto: CreatePokemonDto, ownerId: string) {
    return this.prisma.pokemon.create({
      data: {
        ...createPokemonDto,
        ownerId,
      },
    });
  }

  async findAll() {
    return this.prisma.pokemon.findMany({
      include: {
        owner: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const pokemon = await this.prisma.pokemon.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto, userId: string) {
    // First check if pokemon exists and belongs to user
    const existingPokemon = await this.prisma.pokemon.findUnique({
      where: { id },
    });

    if (!existingPokemon) {
      throw new NotFoundException('Pokemon not found');
    }

    if (existingPokemon.ownerId !== userId) {
      throw new ForbiddenException('You can only update your own Pokemon');
    }

    return this.prisma.pokemon.update({
      where: { id },
      data: updatePokemonDto,
    });
  }

  async remove(id: string, userId: string) {
    // First check if pokemon exists and belongs to user
    const existingPokemon = await this.prisma.pokemon.findUnique({
      where: { id },
    });

    if (!existingPokemon) {
      throw new NotFoundException('Pokemon not found');
    }

    if (existingPokemon.ownerId !== userId) {
      throw new ForbiddenException('You can only delete your own Pokemon');
    }

    return this.prisma.pokemon.delete({
      where: { id },
    });
  }
}

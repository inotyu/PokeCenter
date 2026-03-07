import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto, UpdatePokemonDto } from './dto/pokemon.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@ApiTags('pokemon')
@Controller('pokemon')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Pokemons' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Pokemons retrieved successfully' })
  async findAll(@GetUser() user: any) {
    return this.pokemonService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Pokemon by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Pokemon retrieved successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Pokemon not found' })
  async findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new Pokemon' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Pokemon created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async create(
    @Body() createPokemonDto: CreatePokemonDto,
    @GetUser() user: { id: string },
  ) {
    return this.pokemonService.create(createPokemonDto, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Pokemon' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Pokemon updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Pokemon not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'You can only update your own Pokemon' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async update(
    @Param('id') id: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
    @GetUser() user: { id: string },
  ) {
    return this.pokemonService.update(id, updatePokemonDto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a Pokemon' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Pokemon deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Pokemon not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'You can only delete your own Pokemon' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async remove(
    @Param('id') id: string,
    @GetUser() user: { id: string },
  ) {
    return this.pokemonService.remove(id, user.id);
  }
}

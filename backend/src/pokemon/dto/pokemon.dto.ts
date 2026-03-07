import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  name!: string;

  @IsString()
  type!: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  level!: number;

  @IsNumber()
  @Min(1)
  @Max(999)
  hp!: number;

  @IsNumber()
  @Min(1)
  @Max(1000)
  pokedexNumber!: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}

export class UpdatePokemonDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  level?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(999)
  hp?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(1000)
  pokedexNumber?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}

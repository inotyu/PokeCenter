import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Pokemon (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token1: string;
  let token2: string;
  let user1Id: string;
  let user2Id: string;
  let pokemonId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    // Clean up test data
    await prisma.pokemon.deleteMany();
    await prisma.user.deleteMany();

    // Register and login user1
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'user1@example.com',
        password: 'password123',
      });

    const login1 = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'user1@example.com',
        password: 'password123',
      });

    token1 = login1.body.access_token;
    user1Id = login1.body.user.id;

    // Register and login user2
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'user2@example.com',
        password: 'password123',
      });

    const login2 = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'user2@example.com',
        password: 'password123',
      });

    token2 = login2.body.access_token;
    user2Id = login2.body.user.id;
  });

  it('should create a pokemon', async () => {
    const response = await request(app.getHttpServer())
      .post('/pokemon')
      .set('Authorization', `Bearer ${token1}`)
      .send({
        name: 'Pikachu',
        type: 'Elétrico',
        level: 25,
        hp: 100,
        pokedexNumber: 25,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Pikachu');
    expect(response.body.ownerId).toBe(user1Id);
    pokemonId = response.body.id;
  });

  it('should get all pokemons', async () => {
    // Create a pokemon first
    await request(app.getHttpServer())
      .post('/pokemon')
      .set('Authorization', `Bearer ${token1}`)
      .send({
        name: 'Pikachu',
        type: 'Elétrico',
        level: 25,
        hp: 100,
        pokedexNumber: 25,
      });

    const response = await request(app.getHttpServer())
      .get('/pokemon')
      .set('Authorization', `Bearer ${token1}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a pokemon by id', async () => {
    // Create a pokemon first
    const createRes = await request(app.getHttpServer())
      .post('/pokemon')
      .set('Authorization', `Bearer ${token1}`)
      .send({
        name: 'Pikachu',
        type: 'Elétrico',
        level: 25,
        hp: 100,
        pokedexNumber: 25,
      });

    const response = await request(app.getHttpServer())
      .get(`/pokemon/${createRes.body.id}`)
      .set('Authorization', `Bearer ${token1}`)
      .expect(200);

    expect(response.body.name).toBe('Pikachu');
  });

  it('should update own pokemon', async () => {
    // Create a pokemon first
    const createRes = await request(app.getHttpServer())
      .post('/pokemon')
      .set('Authorization', `Bearer ${token1}`)
      .send({
        name: 'Pikachu',
        type: 'Elétrico',
        level: 25,
        hp: 100,
        pokedexNumber: 25,
      });

    const response = await request(app.getHttpServer())
      .patch(`/pokemon/${createRes.body.id}`)
      .set('Authorization', `Bearer ${token1}`)
      .send({
        name: 'Raichu',
        level: 30,
      })
      .expect(200);

    expect(response.body.name).toBe('Raichu');
    expect(response.body.level).toBe(30);
  });

  it('should not update others pokemon', async () => {
    // Create a pokemon with user1
    const createRes = await request(app.getHttpServer())
      .post('/pokemon')
      .set('Authorization', `Bearer ${token1}`)
      .send({
        name: 'Pikachu',
        type: 'Elétrico',
        level: 25,
        hp: 100,
        pokedexNumber: 25,
      });

    // Try to update with user2
    await request(app.getHttpServer())
      .patch(`/pokemon/${createRes.body.id}`)
      .set('Authorization', `Bearer ${token2}`)
      .send({
        name: 'Raichu',
      })
      .expect(403);
  });

  it('should delete own pokemon', async () => {
    // Create a pokemon first
    const createRes = await request(app.getHttpServer())
      .post('/pokemon')
      .set('Authorization', `Bearer ${token1}`)
      .send({
        name: 'Pikachu',
        type: 'Elétrico',
        level: 25,
        hp: 100,
        pokedexNumber: 25,
      });

    await request(app.getHttpServer())
      .delete(`/pokemon/${createRes.body.id}`)
      .set('Authorization', `Bearer ${token1}`)
      .expect(204);

    // Check if deleted
    await request(app.getHttpServer())
      .get(`/pokemon/${createRes.body.id}`)
      .set('Authorization', `Bearer ${token1}`)
      .expect(404);
  });

  it('should not delete others pokemon', async () => {
    // Create a pokemon with user1
    const createRes = await request(app.getHttpServer())
      .post('/pokemon')
      .set('Authorization', `Bearer ${token1}`)
      .send({
        name: 'Pikachu',
        type: 'Elétrico',
        level: 25,
        hp: 100,
        pokedexNumber: 25,
      });

    // Try to delete with user2
    await request(app.getHttpServer())
      .delete(`/pokemon/${createRes.body.id}`)
      .set('Authorization', `Bearer ${token2}`)
      .expect(403);
  });
});

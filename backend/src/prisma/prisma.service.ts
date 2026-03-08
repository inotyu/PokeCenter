import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaService | undefined;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: { db: { url: process.env.DATABASE_URL } },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

// Factory function para serverless
export const createPrismaService = (): PrismaService => {
  if (process.env.NODE_ENV === 'production') {
    // Para serverless, cria sempre 1 instância
    return new PrismaService();
  } else {
    // Para dev, evita criar múltiplas instâncias durante hot reload
    if (!global.prisma) {
      global.prisma = new PrismaService();
    }
    return global.prisma;
  }
};

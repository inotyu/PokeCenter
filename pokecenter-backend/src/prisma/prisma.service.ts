import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

declare global {
  // Para evitar múltiplas instâncias no serverless
  var prisma: PrismaService | undefined;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super({
      datasources: { db: { url: process.env.DATABASE_URL } },
      log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'info', 'warn', 'error'],
    });

    // Serverless-safe: reutiliza a instância global
    if (process.env.NODE_ENV === 'production') {
      if (!global.prisma) {
        global.prisma = this;
      }
      return global.prisma;
    }
  }

  async onModuleDestroy() {
    // No dev, desconecta normalmente
    if (process.env.NODE_ENV !== 'production') {
      await this.$disconnect();
    }
  }
}

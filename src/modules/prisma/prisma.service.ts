import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Service constructor.
   * Calls the PrismaClient constructor.
   * @see https://www.prisma.io/docs/reference/api-reference/prisma-client#constructor
   */
  constructor() {
    super();
  }

  /**
   * Initializes the Prisma client.
   * This method is called when the application is starting.
   * @see https://docs.nestjs.com/fundamentals/lifecycle-events#lifecycle-events
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Disconnects the Prisma client when the application is shutting down.
   * This method is called when the application is stopping.
   * @see https://docs.nestjs.com/fundamentals/lifecycle-events#lifecycle-events
   */
  async onApplicationShutdown() {
    await this.$disconnect();
  }
}

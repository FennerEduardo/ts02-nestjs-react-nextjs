import { Module } from '@nestjs/common';
import type { Pool } from 'pg';
import { CommandService } from '../runtime/command-service';
import { PG_POOL } from '../runtime/runtime.module';
import { OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsController } from './orquestacion-de-pedidos-event-driven-en-nest-js-y-renderizado-next-js.controller';

@Module({
  controllers: [OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsController],
  providers: [{ provide: CommandService, useFactory: (pool: Pool) => new CommandService(pool), inject: [PG_POOL] }]
})
export class OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsModule {}

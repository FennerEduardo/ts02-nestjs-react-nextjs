import { Module } from '@nestjs/common';
import { RuntimeModule } from './runtime/runtime.module';
import { OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsModule } from './orquestacion-de-pedidos-event-driven-en-nest-js-y-renderizado-next-js/orquestacion-de-pedidos-event-driven-en-nest-js-y-renderizado-next-js.module';

@Module({
  imports: [RuntimeModule, OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsModule]
})
export class AppModule {}

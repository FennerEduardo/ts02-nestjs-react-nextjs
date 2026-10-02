import { Module } from '@nestjs/common';
import { ApplicationCqrsModule } from './orquestacion-de-pedidos-event-driven-en-nest-js-y-renderizado-next-js/orquestacion-de-pedidos-event-driven-en-nest-js-y-renderizado-next-js.cqrs';

@Module({
  imports: [ApplicationCqrsModule]
})
export class AppModule {}

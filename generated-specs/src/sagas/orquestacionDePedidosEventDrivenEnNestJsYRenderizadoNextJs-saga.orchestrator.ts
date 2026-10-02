import { Injectable, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import { PrismaService } from '../prisma/prisma.service';
import {
  OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsInitiatedEvent,
  OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsAuthorizedEvent,
  OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsCompletedEvent,
  OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsFailedEvent,
  AuthorizeOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsCommand,
  CompleteOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsCommand,
  CompensateOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsCommand,
} from './orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs-saga.contracts';

@Injectable()
export class OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsSagaOrchestrator {
  private readonly logger = new Logger(OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsSagaOrchestrator.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  /**
   * Main entry point for events into the saga.
   * This acts as the state machine transition engine.
   */
  async handleEvent(event: any) {
    if (event instanceof OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsInitiatedEvent) {
      await this.handleInitiated(event);
    } else if (event instanceof OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsAuthorizedEvent) {
      await this.handleAuthorized(event);
    } else if (event instanceof OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsCompletedEvent) {
      await this.handleCompleted(event);
    } else if (event instanceof OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsFailedEvent) {
      await this.handleFailed(event);
    }
  }

  private async handleInitiated(event: OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsInitiatedEvent) {
    this.logger.log(`Saga initiated: ${event.correlationId}`);
    
    // Save initial state to DB
    await this.prisma.sagaInstance.create({
      data: {
        id: event.correlationId,
        sagaType: 'OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs',
        currentState: 'STARTED',
        entityId: event.orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsId,
        metadata: JSON.stringify(event.metadata),
      },
    });

    // Dispatch next command via EventBus (or Outbox)
    this.eventBus.publish(new AuthorizeOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsCommand(event.orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsId, event.metadata));
  }

  private async handleAuthorized(event: OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsAuthorizedEvent) {
    this.logger.log(`Saga authorized: ${event.correlationId}`);

    const saga = await this.prisma.sagaInstance.findUnique({ where: { id: event.correlationId } });
    if (!saga) throw new Error(`Saga not found: ${event.correlationId}`);

    await this.prisma.sagaInstance.update({
      where: { id: event.correlationId },
      data: { currentState: 'COMPLETING', updatedAt: new Date() },
    });

    this.eventBus.publish(new CompleteOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsCommand(saga.entityId));
  }

  private async handleCompleted(event: OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsCompletedEvent) {
    this.logger.log(`Saga completed: ${event.correlationId}`);
    await this.prisma.sagaInstance.update({
      where: { id: event.correlationId },
      data: { currentState: 'COMPLETED', updatedAt: new Date() },
    });
  }

  private async handleFailed(event: OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsFailedEvent) {
    this.logger.warn(`Saga failed: ${event.correlationId}, reason: ${event.reason}`);
    
    const saga = await this.prisma.sagaInstance.findUnique({ where: { id: event.correlationId } });
    if (!saga) throw new Error(`Saga not found: ${event.correlationId}`);

    await this.prisma.sagaInstance.update({
      where: { id: event.correlationId },
      data: { 
        currentState: 'COMPENSATING', 
        errorReason: event.reason,
        updatedAt: new Date() 
      },
    });

    this.eventBus.publish(new CompensateOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsCommand(saga.entityId, event.reason));
    
    // Once compensation command is sent, we can mark it failed
    await this.prisma.sagaInstance.update({
      where: { id: event.correlationId },
      data: { currentState: 'FAILED', updatedAt: new Date() },
    });
  }
}

// Global Event Handler to route events into the Saga Orchestrator
@EventsHandler(
  OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsInitiatedEvent,
  OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsAuthorizedEvent,
  OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsCompletedEvent,
  OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsFailedEvent,
)
export class OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsSagaEventHandler implements IEventHandler<any> {
  constructor(private readonly orchestrator: OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsSagaOrchestrator) {}

  async handle(event: any) {
    await this.orchestrator.handleEvent(event);
  }
}

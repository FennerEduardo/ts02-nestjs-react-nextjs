import { Body, Controller, Headers, HttpException, HttpStatus, Inject, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CommandService } from '../runtime/command-service';
import { DomainValidationError } from './domain/orquestacion-de-pedidos-event-driven-en-nest-js-y-renderizado-next-js.aggregate';
import { JwtTenantGuard } from '../auth/jwt-tenant.guard';

const STATUS = { created: HttpStatus.ACCEPTED, replayed: HttpStatus.OK, 'in-progress': HttpStatus.CONFLICT } as const;

// ghk:implements OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs
@Controller('api/v1/orquestacion-de-pedidos-event-driven-en-nest-js-y-renderizado-next-js')
@UseGuards(JwtTenantGuard)
export class OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsController {
  constructor(@Inject(CommandService) private readonly commands: CommandService) {}

  /** POST /api/v1/orquestacion-de-pedidos-event-driven-en-nest-js-y-renderizado-next-js/:id/:command (process_orquestacion_de_pedidos_event_driven_en_nest_js_y_renderizado_next_js) */
  @Post(':id/:command')
  async handle(
    @Param('id') id: string,
    @Param('command') command: string,
    @Body() payload: Record<string, unknown> | undefined,
    @Headers('idempotency-key') idempotencyKey: string | undefined,
    @Headers('traceparent') traceparent: string | undefined,
    @Req() req: { tenantId: string },
    @Res({ passthrough: true }) res: { status(code: number): unknown }
  ) {
    try {
      const result = await this.commands.handle({ tenantId: req.tenantId, aggregateType: 'OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs', aggregateId: id, command, payload: payload ?? {}, idempotencyKey, traceparent });
      res.status(STATUS[result.status]);
      return result;
    } catch (err) {
      // By name: every feature's domain module declares its own DomainValidationError class.
      if (err instanceof DomainValidationError || (err as Error)?.name === 'DomainValidationError') throw new HttpException((err as Error).message, HttpStatus.UNPROCESSABLE_ENTITY);
      throw err;
    }
  }
}

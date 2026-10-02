// --------------------------------------------------------------------------
// Saga Contracts for OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs
// --------------------------------------------------------------------------

// === Events ===
export class OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsInitiatedEvent {
  constructor(public readonly correlationId: string, public readonly orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsId: string, public readonly metadata: any) {}
}
export class OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsAuthorizedEvent {
  constructor(public readonly correlationId: string) {}
}
export class OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsCompletedEvent {
  constructor(public readonly correlationId: string) {}
}
export class OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsFailedEvent {
  constructor(public readonly correlationId: string, public readonly reason: string) {}
}

// === Commands ===
export class AuthorizeOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsCommand {
  constructor(public readonly orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsId: string, public readonly metadata: any) {}
}
export class CompleteOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsCommand {
  constructor(public readonly orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsId: string) {}
}
export class CompensateOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsCommand {
  constructor(public readonly orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsId: string, public readonly reason: string) {}
}

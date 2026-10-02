import { OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsAggregate, DomainValidationError } from './orquestacion-de-pedidos-event-driven-en-nest-js-y-renderizado-next-js.aggregate';

describe('OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsAggregate', () => {
  it('starts in the initial state with no events', () => {
    const aggregate = new OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsAggregate('agg-1');
    expect(aggregate.state).toBe('PENDING');
    expect(aggregate.version).toBe(0);
    expect(aggregate.pendingEvents).toHaveLength(0);
  });

  it('rejects an aggregate without id', () => {
    expect(() => new OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsAggregate('')).toThrow(DomainValidationError);
  });

  it('processOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs records CanonicalOrderCreated and bumps the version', () => {
    const aggregate = new OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsAggregate('agg-1');
    const event = aggregate.processOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs({ id: 'agg-1', payload: { source: 'test' } });
    expect(event.type).toBe('CanonicalOrderCreated');
    expect(event.version).toBe(1);
    expect(aggregate.version).toBe(1);
    expect(aggregate.pendingEvents).toEqual([event]);
  });

  it('processOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs rejects a command without id', () => {
    const aggregate = new OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsAggregate('agg-1');
    expect(() => aggregate.processOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs({ id: '' })).toThrow(DomainValidationError);
    expect(aggregate.pendingEvents).toHaveLength(0);
  });
});

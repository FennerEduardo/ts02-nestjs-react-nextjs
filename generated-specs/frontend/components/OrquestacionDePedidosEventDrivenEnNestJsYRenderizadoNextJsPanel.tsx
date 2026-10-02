'use client';

import { useMemo, useState } from 'react';
import { COMMANDS, CommandName, CommandResult, createOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsClient, OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsClient } from '../lib/orquestacion-de-pedidos-event-driven-en-nest-js-y-renderizado-next-js-client';

export function OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsPanel({ client }: { client?: OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsClient }) {
  const api = useMemo(() => client ?? createOrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsClient(), [client]);
  const [aggregateId, setAggregateId] = useState('');
  const [events, setEvents] = useState<CommandResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function run(command: CommandName) {
    setLoading(true);
    setError(null);
    try {
      const event = await api.execute(aggregateId, command, undefined, { idempotencyKey: crypto.randomUUID() });
      setEvents(prev => [...prev, event]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section aria-label="Orquestación de Pedidos Event-Driven en NestJS y Renderizado Next.js">
      <h1>Orquestación de Pedidos Event-Driven en NestJS y Renderizado Next.js</h1>
      <label>
        Aggregate id
        <input value={aggregateId} onChange={e => setAggregateId(e.target.value)} />
      </label>
      {COMMANDS.map(command => (
        <button key={command} disabled={!aggregateId || loading} onClick={() => run(command)}>
          {command}
        </button>
      ))}
      {error && <p role="alert">{error}</p>}
      <ul aria-label="events">
        {events.map(e => (
          <li key={`${e.aggregateId}-${e.version}`}>
            {e.type} v{e.version}
          </li>
        ))}
      </ul>
    </section>
  );
}

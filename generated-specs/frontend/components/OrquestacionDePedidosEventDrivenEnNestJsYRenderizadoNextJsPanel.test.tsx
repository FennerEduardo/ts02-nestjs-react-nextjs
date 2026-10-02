import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsPanel } from './OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsPanel';
import type { OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsClient } from '../lib/orquestacion-de-pedidos-event-driven-en-nest-js-y-renderizado-next-js-client';

describe('OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsPanel', () => {
  it('executes a command and lists the resulting event', async () => {
    const execute = vi.fn().mockResolvedValue({ type: 'CanonicalOrderCreated', aggregateId: 'agg-1', version: 1 });
    render(<OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsPanel client={{ execute } as unknown as OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsClient} />);

    await userEvent.type(screen.getByLabelText('Aggregate id'), 'agg-1');
    await userEvent.click(screen.getByRole('button', { name: 'process_orquestacion_de_pedidos_event_driven_en_nest_js_y_renderizado_next_js' }));

    expect(await screen.findByText('CanonicalOrderCreated v1')).toBeInTheDocument();
  });

  it('shows the backend error', async () => {
    const execute = vi.fn().mockRejectedValue(new Error('Command id is required'));
    render(<OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsPanel client={{ execute } as unknown as OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsClient} />);

    await userEvent.type(screen.getByLabelText('Aggregate id'), 'agg-1');
    await userEvent.click(screen.getByRole('button', { name: 'process_orquestacion_de_pedidos_event_driven_en_nest_js_y_renderizado_next_js' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Command id is required');
  });
});

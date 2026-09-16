# language: es
Característica: Orquestación de Pedidos Event-Driven en NestJS y Renderizado Next.js

  Escenario: Generación de Pedido e Ingesta de Evento Canonical
    Dado que se envía un Payload JSON de Shopify a NestJS
    Cuando el adaptador de integración normaliza el evento a "CanonicalOrderCreated"
    Entonces el Command Bus de NestJS debe procesar la instrucción de forma idempotente
    Y Next.js App Router debe recibir la actualización mediante Server-Sent Events (SSE)
    Y la vista de Next.js debe actualizar la línea de tiempo transaccional en tiempo real

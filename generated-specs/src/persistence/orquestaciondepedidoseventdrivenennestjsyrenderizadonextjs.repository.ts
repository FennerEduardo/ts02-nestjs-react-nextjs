import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { currentTenant } from '../infrastructure/multitenancy/tenant.storage';
import type { OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs } from '@prisma/client';

@Injectable()
export class OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs | null> {
    return this.prisma.tenant.orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs.findUnique({ where: { id } });
  }

  /** Creates a row for the tenant of the authenticated request (never a default tenant). */
  async save(data: Omit<OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>): Promise<OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs> {
    return this.prisma.tenant.orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs.create({
      data: { ...data, tenantId: currentTenant() },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tenant.orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs.delete({ where: { id } });
  }
}

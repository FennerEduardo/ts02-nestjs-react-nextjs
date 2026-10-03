import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs } from '@prisma/client';

@Injectable()
export class OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs | null> {
    return this.prisma.tenant.orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs.findUnique({ where: { id } });
  }

  async save(data: Omit<OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>): Promise<OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs> {
    return this.prisma.tenant.orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs.create({
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tenant.orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs.delete({ where: { id } });
  }
}

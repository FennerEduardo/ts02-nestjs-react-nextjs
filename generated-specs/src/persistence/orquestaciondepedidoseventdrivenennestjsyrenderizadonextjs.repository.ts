import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs } from '@prisma/client';

@Injectable()
export class OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs | null> {
    return this.prisma.orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs.findUnique({ where: { id } });
  }

  async save(data: Omit<OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs, 'id' | 'createdAt' | 'updatedAt'>): Promise<OrquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs> {
    return this.prisma.orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs.create({
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.orquestacionDePedidosEventDrivenEnNestJsYRenderizadoNextJs.delete({ where: { id } });
  }
}

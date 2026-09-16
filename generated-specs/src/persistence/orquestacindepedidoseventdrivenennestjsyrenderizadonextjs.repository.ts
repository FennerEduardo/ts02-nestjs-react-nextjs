import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OrquestacindePedidosEventDrivenenNestJSyRenderizadoNextjs } from '@prisma/client';

@Injectable()
export class OrquestacindePedidosEventDrivenenNestJSyRenderizadoNextjsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<OrquestacindePedidosEventDrivenenNestJSyRenderizadoNextjs | null> {
    return this.prisma.orquestacindepedidoseventdrivenennestjsyrenderizadonextjs.findUnique({ where: { id } });
  }

  async save(data: Omit<OrquestacindePedidosEventDrivenenNestJSyRenderizadoNextjs, 'id' | 'createdAt' | 'updatedAt'>): Promise<OrquestacindePedidosEventDrivenenNestJSyRenderizadoNextjs> {
    return this.prisma.orquestacindepedidoseventdrivenennestjsyrenderizadonextjs.create({
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.orquestacindepedidoseventdrivenennestjsyrenderizadonextjs.delete({ where: { id } });
  }
}

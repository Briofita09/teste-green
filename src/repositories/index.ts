import { prisma } from "../database";
import { BoletoInterface } from "../interfaces";
import { Lote, Boleto } from "@prisma/client";

export async function getLots(): Promise<Lote[]> {
  return await prisma.lote.findMany();
}

export async function saveBoleto(boleto: BoletoInterface) {
  return await prisma.boleto.create({
    data: {
      nome_sacado: boleto.nome_sacado,
      id_lote: boleto.id_lote,
      valor: boleto.valor,
      linha_digitavel: boleto.linha_digitavel,
      ativo: boleto.ativo,
      criado_em: boleto.criado_em,
    },
  });
}

export async function getBoletos(filter: any): Promise<Boleto[]> {
  return await prisma.boleto.findMany({ where: { ...filter } });
}

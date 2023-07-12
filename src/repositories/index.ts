import { prisma } from "../database";
import { Boleto } from "../interfaces";

export async function getLots() {
  return await prisma.lote.findMany();
}

export async function saveBoleto(boleto: Boleto) {
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

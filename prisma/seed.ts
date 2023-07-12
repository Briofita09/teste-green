import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const Lots = await prisma.lote.findMany();
  if (Lots.length > 0) return;
  const currentDate = new Date();
  const createdLot = await prisma.lote.createMany({
    data: [
      {
        nome: "0017",
        ativo: true,
        criado_em: currentDate.toISOString(),
      },
      {
        nome: "0018",
        ativo: true,
        criado_em: currentDate.toISOString(),
      },
      {
        nome: "0019",
        ativo: true,
        criado_em: currentDate.toISOString(),
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

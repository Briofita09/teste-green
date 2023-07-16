import { prisma } from "../../src/database";
import { IncorrectFile } from "../../src/errors";
import {
  checkUnit,
  generateBoletosPdf,
  generateReport,
} from "../../src/services";
import { pdfGenerator } from "../../src/utils";

describe("checkUnit suite", () => {
  it("Should return error when a incorrect file is passed", async () => {
    const file = "../../boletos.csv";
    const findLots = jest
      .spyOn(prisma.lote, "findMany")
      .mockImplementationOnce((): any => {
        return [];
      });
    try {
      await checkUnit(file);
      expect("Function should throw an error").toBe("but it didn't");
    } catch (err: any) {
      expect(err.message).toBe(
        "O arquivo enviado não possui as informações corretas. Envie um arquivo contendo todas as informações corretas"
      );
    }
    expect(findLots).toHaveBeenCalledTimes(1);
  });
});

describe("generatePdf suite", () => {
  it("Should return a pdf", async () => {
    const boletos = [
      {
        id: 1,
        nome_sacado: "JOAO",
        id_lote: 1,
        valor: 1,
        linha_digitavel: "1234",
        ativo: true,
        criado_em: new Date(),
      },
      {
        id: 2,
        nome_sacado: "JOAO",
        id_lote: 1,
        valor: 2,
        linha_digitavel: "1235",
        ativo: true,
        criado_em: new Date(),
      },
    ];
    const findManySpy = jest
      .spyOn(prisma.boleto, "findMany")
      .mockImplementationOnce((): any => {
        return boletos;
      });
    const result = await generateBoletosPdf();
    expect(findManySpy).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});

describe("generateReport", () => {
  it("Should return a pdf buffer", async () => {
    const fakeBoletos = [
      {
        id: 1,
        nome_sacado: "JOAO",
        id_lote: 1,
        valor: 1,
        linha_digitavel: "1234",
        ativo: true,
        criado_em: new Date(),
      },
      {
        id: 2,
        nome_sacado: "MARIA",
        id_lote: 2,
        valor: 2,
        linha_digitavel: "5678",
        ativo: true,
        criado_em: new Date(),
      },
    ];
    const findManySpy = jest
      .spyOn(prisma.boleto, "findMany")
      .mockImplementationOnce((): any => {
        return fakeBoletos;
      });
    const result = await generateReport();
    expect(findManySpy).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});

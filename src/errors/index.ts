import { BoletoInterface, CustomError } from "../interfaces";

export function NotFoundCsv(): CustomError {
  return {
    message: "Insira um arquivo .csv para completar a requisição",
    status: 406,
  };
}

export function IncorrectFileType(): CustomError {
  return {
    message: "O arquivo enviado não é um arquivo do tipo esperado.",
    status: 406,
  };
}

export function IncorrectFile(): CustomError {
  return {
    message:
      "O arquivo enviado não possui as informações corretas. Envie um arquivo contendo todas as informações corretas",
    status: 406,
  };
}

export function BoletoDbError(boleto: BoletoInterface): CustomError {
  return {
    message: `Erro ao salvar o boleto ${boleto} no banco de dados`,
    status: 500,
  };
}

export function PdfGenerationError(): CustomError {
  return {
    message: "Erro ao criar o arquivo pdf",
    status: 500,
  };
}

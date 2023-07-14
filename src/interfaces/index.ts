export interface CsvElement {
  nome: string;
  unidade: string;
  valor: string;
  linha_digitavel: string;
}

export interface BoletoInterface {
  nome_sacado: string;
  id_lote: number;
  valor?: string;
  linha_digitavel?: string;
  ativo?: boolean;
  criado_em?: string;
}

export interface ErrorHandler extends Error {
  status?: number;
}

export interface CustomError {
  message: string;
  status: number;
}

export type PDF = {
  filePath: string;
  fileSize: number;
};

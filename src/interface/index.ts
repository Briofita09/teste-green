export interface CsvElement {
  nome: string;
  unidade: string;
  valor: string;
  linha_digitavel: string;
}

export interface Boleto {
  nome_sacado: string;
  id_lote: number;
  valor?: string;
  linha_digitavel?: string;
  ativo?: boolean;
  criado_em?: string;
}

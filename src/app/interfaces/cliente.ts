export interface ICliente {
  nome: string;
  cpf: number;
  telefone: number;
  rua: string;
  numero: number;
  complemento?: string;
  cep: number;
  rendimentoMensal: number;
}

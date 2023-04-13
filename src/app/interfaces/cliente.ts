export interface ICliente {
  nome: string;
  cpf: number;
  telefone: string;
  endereco: {
    rua: string;
    numero: number;
    cep: string;
  }
  rendimentoMensal: number;
  emprestimo: Array<[]>;
}

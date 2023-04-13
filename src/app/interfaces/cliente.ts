export interface ICliente {
  nome: string;
  cpf: string;
  telefone: string;
  endereco: {
    rua: string;
    numero: number;
    cep: string;
  }
  rendimentoMensal: number;
  emprestimo: Array<[]>;
}

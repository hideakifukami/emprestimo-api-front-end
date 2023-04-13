import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { ICliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  endpoint = 'clientes'
  api = environment.api;
  constructor(private http: HttpClient) { }

  cadastrarCliente(cliente: ICliente) {
    return this.http.post(`${this.api}/${this.endpoint}`, cliente);
  }

  retornarTodosOsClientes() {
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}`)
  }

  retornarCliente(cpf: number) {
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${cpf}`)
  }

  deletarCliente(cpf: number) {
    return this.http.delete<ICliente>(`${this.api}/${this.endpoint}/${cpf}`)
  }

  alterarCliente(cpf: number, cliente: ICliente) {
    return this.http.put<ICliente>(`${this.api}/${this.endpoint}/${cpf}`, cliente)
  }
}

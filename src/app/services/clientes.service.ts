import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { ICliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  endpoint = 'clientes'
  api = environment.api;
  constructor(private http: HttpClient) { }

  retornarTodosOsClientes() {
    return this.http.get<ICliente[]>(`${this.api}/${this.endpoint}`)
  }

  cadastrarCliente(cliente: ICliente) {
    return this.http.post(`${this.api}/${this.endpoint}`, cliente);
  }

  retornarCliente(cpf: number) {
    return this.http.get<ICliente>(`${this.api}/${this.endpoint}/${cpf}`)
  }

}

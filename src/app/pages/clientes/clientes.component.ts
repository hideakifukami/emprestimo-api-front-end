import { Component } from '@angular/core';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes: ICliente[] = [];
  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
    this.clientesService.retornarTodosOsClientes().subscribe((result: ICliente[]) => {
      this.clientes = result;
    });
  }

  deletar(cpf: number) {
    this.clientesService.retornarCliente(cpf).subscribe(result => {
      Swal.fire({
        title: 'Tem certeza que gostaria de deletar este cliente?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Deletar',
        denyButtonText: `Não deletar`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.clientesService.deletarCliente(cpf).subscribe(result => {
            Swal.fire('Cliente deletado com sucesso!', '', 'success').then((recarregar) => {window.location.reload();})
          })
        } else if (result.isDenied) {
          Swal.fire('Cliente não deletado.', '', 'info').then((recarregar) => {window.location.reload();})
        }
      })
    }), (error: any) => {
      console.error(error);
    };
  }
}

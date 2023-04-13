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

  deletar(cpf: string) {
    this.clientesService.retornarCliente(cpf).subscribe(result => {
      Swal.fire({
        title: 'Cuidado! Tem certeza que deseja deletar o cliente?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Deletar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.clientesService.deletarCliente(cpf).subscribe(result => {
            Swal.fire('Parabéns!', 'Cliente deletado com sucesso!', 'success').then((recarregar) => {window.location.reload();})
          })
        } else if (result.isDenied) {
          Swal.fire('Cuidado!', 'Clientes deletados não podem ser recuperados!', 'info')
        }
      })
    }), (error: any) => {
      console.error(error);
    };
  }
}

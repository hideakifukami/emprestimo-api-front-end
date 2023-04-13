import { Component, Self } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-atualizar-clientes',
  templateUrl: './cadastrar-atualizar-clientes.component.html',
  styleUrls: ['./cadastrar-atualizar-clientes.component.css']
})
export class CadastrarAtualizarClientesComponent {

  clienteForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl(12345678910, Validators.required),
    telefone: new FormControl('', Validators.required),
    endereco: new FormGroup({
      rua: new FormControl('', Validators.required),
      numero: new FormControl(123, Validators.required),
      cep: new FormControl('', Validators.required)
    }),
    rendimentoMensal: new FormControl(1000, Validators.required)
  })

  constructor(private clientesService: ClientesService, private route: ActivatedRoute) {}
  clienteCpf = 0;

  ngOnInit() {
    this.clienteCpf = Number(this.route.snapshot.paramMap.get('cpf'));
    if (this.clienteCpf) {
        this.clientesService.retornarCliente(this.clienteCpf).subscribe((cliente: ICliente) => {
        this.clienteForm.setValue({
          nome: cliente.nome || '',
          cpf: cliente.cpf || 0,
          telefone: cliente.telefone || '',
          endereco: {
            rua: cliente.endereco.rua || '',
            numero: cliente.endereco.numero || null,
            cep: cliente.endereco.cep || ''
          },
          rendimentoMensal: cliente.rendimentoMensal || null
        })
      });
    }
  }

  cadastrar() {
    this.clienteCpf = Number(this.route.snapshot.paramMap.get('cpf'));
    const cliente: ICliente = this.clienteForm.value as ICliente;
    if (this.clienteCpf) {
      this.clientesService.alterarCliente(this.clienteCpf, cliente).subscribe(result => {
        Swal.fire(
          'Parabéns!',
          'Cliente editado com sucesso!',
          'success'
        ).then((retornar) => {window.open("http://localhost:4200/clientes", "_self")})
      }), (error: any) => {
        console.error(error);
      }
    } else {
      if (!this.clienteForm.valid) {
        Swal.fire(
          'Erro!',
          'Favor preencher todos os dados!',
          'info'
        )
      } else{
        this.clientesService.cadastrarCliente(cliente).subscribe(result => {
          Swal.fire(
            'Parabéns!',
            'Cliente cadastrado com sucesso!',
            'success'
          ).then((retornar) => {window.open("http://localhost:4200/clientes", "_self")})
        }), (error: any) => {
          console.error(error);
        }
      }
    }

  }


}



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
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    telefone: new FormControl('', [Validators.required, Validators.pattern(/^\d{7,14}$/)]),
    endereco: new FormGroup({
      rua: new FormControl('', Validators.required),
      numero: new FormControl(0, Validators.required),
      cep: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)])
    }),
    rendimentoMensal: new FormControl(0, Validators.required)
  })

  constructor(private clientesService: ClientesService, private route: ActivatedRoute) {}
  clienteCpf = 0;

  ngOnInit() {
    this.clienteCpf = Number(this.route.snapshot.paramMap.get('cpf'));
    if (this.clienteCpf) {
        this.clientesService.retornarCliente(String(this.clienteCpf)).subscribe((cliente: ICliente) => {
        this.clienteForm.setValue({
          nome: cliente.nome || '',
          cpf: cliente.cpf || '',
          telefone: cliente.telefone || '',
          endereco: {
            rua: cliente.endereco.rua || '',
            numero: cliente.endereco.numero || 0,
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
      const cpfArmazenado: number = Number(this.clienteForm.value.cpf);
      this.clientesService.alterarCliente(String(this.clienteCpf), cliente).subscribe(result => {
        Swal.fire(
          'Parabéns!',
          'Cliente editado com sucesso!',
          'success'
        ).then((retornar) => {
          if (cpfArmazenado != this.clienteCpf) {
            this.clientesService.deletarCliente(String(this.clienteCpf)).subscribe(result => {
              window.open("http://localhost:4200/clientes", "_self");
            });
          }

          window.open("http://localhost:4200/clientes", "_self");

          }
        )
      }), (error: any) => {
        console.error(error);
      }
    } else {
      const cpfArmazenado: number = Number(this.clienteForm.value.cpf);
      this.clientesService.retornarCliente(String(this.clienteForm.value.cpf)).subscribe(clienteEncontrado => {
        if (Number(clienteEncontrado.cpf) == cpfArmazenado) {
          Swal.fire(
            'Algo está errado!',
            'Este CPF está associado a um cliente cadastrado.',
            'info'
          )
        }
      });

      if (!this.clienteForm.valid) {
        Swal.fire(
          'Algo está errado!',
          'Verifique se os dados estão preenchidos corretamente.',
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



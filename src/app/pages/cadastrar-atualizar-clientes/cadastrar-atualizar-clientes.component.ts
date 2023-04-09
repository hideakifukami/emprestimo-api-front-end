import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    rua: new FormControl('', Validators.required),
    numero: new FormControl(123, Validators.required),
    complemento: new FormControl('', Validators.required),
    cep: new FormControl('', Validators.required),
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
          rua: cliente.endereco.rua || '',
          numero: cliente.endereco.numero || null,
          complemento: cliente.endereco.complemento || '',
          cep: cliente.endereco.cep || '',
          rendimentoMensal: cliente.rendimentoMensal || null
        })
      });
    }
  }

  cadastrar() {
    const cliente: ICliente = this.clienteForm.value as ICliente;
    this.clientesService.cadastrarCliente(cliente).subscribe(result => {
      Swal.fire(
        'Parabéns!',
        'Cliente cadastrado com sucesso!',
        'success'
      )
    }), (error: any) => {
      console.error(error);
    }
  }
}



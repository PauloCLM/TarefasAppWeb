import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TarefasCadastroComponent } from '../tarefas-cadastro/tarefas-cadastro.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-tarefas-consulta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TarefasCadastroComponent,
  ],
  templateUrl: './tarefas-consulta.component.html',
  styleUrl: './tarefas-consulta.component.css',
})
export class TarefasConsultaComponent {
  //variáveis
  tarefas: any[] = [];
  mensagem: string = '';


  //método construtor (injeção de dependência)
  constructor(private httpClient: HttpClient) {}


  //objeto do formulário
  form = new FormGroup({
    dataMin: new FormControl('', [Validators.required]),
    dataMax: new FormControl('', [Validators.required]),
  });


  //função auxiliar para exibir os erros de validação
  get f(): any {
    return this.form.controls;
  }


  /*
    Função para capturar o SUBMIT do formulário
  */
  onSubmit(): void {
    const dataMin = this.form.value.dataMin;
    const dataMax = this.form.value.dataMax;


    //executando a consulta de tarefas na API
    this.httpClient
      .get(`http://localhost:5079/api/tarefas/${dataMin}/${dataMax}`)
      .subscribe({
        //capturando a resposta obtida da API
        next: (data) => {
          //armazenar os dados obtidos da consulta
          this.tarefas = data as any[];
          if (this.tarefas.length > 0) {
            this.mensagem = 'Consulta realizada com sucesso.';
          } else {
            this.mensagem =
              'Nenhum registro foi encontrado para as datas selecionadas.';
          }
        },
      });
  }


  //função para exclusão da tarefa
  onDelete(id: string) : void {
    if(confirm('Deseja realmente excluir a tarefa?')) {
      this.httpClient.delete(`http://localhost:5079/api/tarefas/${id}`)
        .subscribe({
          next: (data) => {
            this.onSubmit();
            this.mensagem = 'Tarefa excluída com sucesso.';
             //recarregar a consulta
          },
          error: (e) => {
            this.mensagem = 'Erro ao excluir tarefa.';
            console.log(e.error);
          }
        })
    }
  }


}





import { Routes } from '@angular/router';
import { TarefasCadastroComponent } from './pages/tarefas-cadastro/tarefas-cadastro.component';
import { TarefasConsultaComponent } from './pages/tarefas-consulta/tarefas-consulta.component';


export const routes: Routes = [
    {
        path: 'pages/tarefas-cadastro',
        component: TarefasCadastroComponent
    },
    {
        path: 'pages/tarefas-consulta',
        component: TarefasConsultaComponent
    }
];






import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksComponent } from './components/tasks/tasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

const routes: Routes = [
    { path: '', redirectTo: 'tareas', pathMatch: 'full' },
    { path: 'tareas', component: TasksComponent },
    { path: 'tarea/:id', component: AddTaskComponent }
];

@NgModule({
    imports: [ RouterModule .forRoot( routes ) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule{}

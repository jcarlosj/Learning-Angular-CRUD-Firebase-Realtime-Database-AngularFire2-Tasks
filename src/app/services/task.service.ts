import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private dbPath = '/tasks';
  taskRef : AngularFireList<Task>;

  constructor( private db: AngularFireDatabase ) {
    this .taskRef = db .list( this .dbPath );
  }

  getTasks() : AngularFireList <Task> {
    return this .taskRef;
  }

  createTask( task: Task ): void {
    this .taskRef .push( task );
  }

  editTask( task: Task ): void {
    console .log( 'Service: (editTask)', task );
    this .taskRef .set( 
      task .key, 
      { 
        title: task .title, 
        description: task .description, 
        status: task .status, 
        active: task .active 
      } 
    ) 
    .then( _ => console .log( 'Registro Actualizado!' ) )
    .catch( error => this .handleError( error ) );
    console .log( 'Service: ', task );
  }

  deleteTask( id ): void {
    this .taskRef .remove( id )
      .then( _ => console .log( 'Registro eliminado exitosamente!' ) )
      .catch( error => this .handleError( error ) );
  }

  deleteAllTasks(): void {
    this .taskRef .remove()
      .catch( error => this .handleError( error ) );
  }

  private handleError( error ) {
    console .log( error );
  }
}

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

  deleteTask( id: string ): void {
    this .taskRef .remove( id )
      .catch( error => this .handleError( error ) );
  }

  private handleError( error ) {
    console .log( error );
  }
}

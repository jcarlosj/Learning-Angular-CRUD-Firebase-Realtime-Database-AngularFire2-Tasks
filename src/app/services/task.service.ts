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
}

import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any;

  constructor( private taskService: TaskService ) { }

  ngOnInit() {
    this .getTasksList();
  }

  getTasksList() {
    // Use snapshotChanges() .map() para almacenar el ID
    this .taskService .getTasks()
      .snapshotChanges()
      .pipe(
        map( changes => { 
          return changes .map( c => ({ key: c.payload.key, ...c.payload.val() })); 
        })
      )
      .subscribe( tasks => {
        if( this.existsTasks( tasks ) ) {
          console .log( tasks );
          this .tasks = tasks;
          return;
        }
        console .log( 'No hay registros!' );
      });
  }

  existsTasks( tasks ) {
    return 0 < tasks .length; 
  }

}

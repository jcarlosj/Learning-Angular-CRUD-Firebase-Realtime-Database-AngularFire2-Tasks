import { Component, OnInit, Input } from '@angular/core';

import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  @Input() taskDetail: Task;

  constructor( private taskService: TaskService ) { }

  ngOnInit() { 
    console .log( 'TaskDetailsComponent', this .taskDetail );
  }

  deleteTask() {
    this .taskService .deleteTask( this .taskDetail .key );
  }

  updateActiveField( isActive: boolean ) {
    this .taskService .updateActiveField( 
      this .taskDetail. key, 
      {
        active: isActive
      }
    );
  }

}

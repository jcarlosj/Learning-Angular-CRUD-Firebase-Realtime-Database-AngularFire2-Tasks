import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task: Task = new Task();
  submitted = false;

  constructor( private taskService: TaskService ) { }

  ngOnInit() {
  }

  newTask(): void {
    this .submitted = false;
    this .task = new Task();
  }

  save() {
    this .taskService .createTask( this .task );
    this .task = new Task();
  }

  onSubmit() {
    this .submitted = true;
    this .save();
  }

}

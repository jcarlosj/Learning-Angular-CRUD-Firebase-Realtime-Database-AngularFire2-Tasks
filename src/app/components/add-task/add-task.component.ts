import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  id: any;
  task: Task = new Task();
  submitted = false;
  btn_message : string;

  constructor( private taskService: TaskService, private route: ActivatedRoute ) { 
    console .log( 'id: ', this .route .snapshot .params[ 'id' ] );
    this .id = this .route .snapshot .params[ 'id' ];               // Asignamos el 'id' (key) que nos acaba de llegar por la URL

    if( this .id != 'nueva' ) {
      this .editTask( this .id );
      this .btn_message = 'modificar';
      return;
    }
    this .btn_message = 'crear';
  }

  ngOnInit() {
  }

  newTask(): void {
    this .submitted = false;
    this .task = new Task();
  }

  private editTask( id ): void {
    this .submitted = false;
    this .getTaskById( id );
  }

  save() {

    if( this .id != 'nueva' ) {
      console .log( 'Save (Edit)', this .task );
      this .taskService .editTask( this .task );
    } 
    else {
      console .log( 'Save (New)', this .task );
      this .taskService .createTask( this .task );
    }
    this .task = new Task();
  }

  onSubmit() {
    this .submitted = true;
    this .save();
  }

  getTaskById( id ) {
    this .findTaskById( id );
  }

  findTaskById( id ) {
    // Use snapshotChanges() .map() para almacenar el ID
    this .taskService .getTasks()
      .snapshotChanges()
      .pipe(
        map( changes => { 
          return changes .map( c => ({ key: c.payload.key, ...c.payload.val() })); 
        })
      )
      .subscribe( task => {
        if( this .existsTasks( task ) ) {
          console .log( 'Tarea:', task[ 0 ] );
          this .task = task[ 0 ];
          //debugger;
          return;
        }
        console .log( 'No hay registros!' );
      });

  }

  existsTasks( tasks ) {
    return 0 < tasks .length; 
  }

}

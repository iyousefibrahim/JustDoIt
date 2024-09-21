import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from '../../core/services/todo.service';
import { Todo } from '../../core/interfaces/todo';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly _ToastrService = inject(ToastrService);
  private readonly _TodoService = inject(TodoService);
  private readonly _FormBuilder = inject(FormBuilder);
  userName = JSON.parse(localStorage.getItem('userName')!);
  apiKey = JSON.parse(localStorage.getItem('apiKey')!);
  allTodos!: Todo[];
  todosCount!: number;

  todoForm: FormGroup = this._FormBuilder.group({
    todoName: [null, [Validators.required]],
  })

  getTodos(): void {
    this._TodoService.getallTodos(this.apiKey).subscribe({
      next: (res) => {
        this.allTodos = res.todos;
        this.todosCount = res.todos.length;
      }
    });
  }


  addTodo() {
    if (this.todoForm.valid) {
      this._TodoService.addTodo(this.todoForm.value.todoName, this.apiKey).subscribe({
        next: (res) => {
          this.getTodos();
          this._ToastrService.success('Todo added successfully', 'Success');
        }
      })
    }
  }

  deleteTodo(todoId: string): void {
    this._TodoService.deleteTodo(todoId).subscribe({
      next: (res) => {
        this.getTodos();
        this._ToastrService.success('Your Todo is successfuly deleted');
      }
    })
  }

  markComplete(todoid: string): void {
    this._TodoService.markCompleted(todoid).subscribe({
      next: (res) => {
        this.getTodos();
        this._ToastrService.success('Congrats! You have Compleated your Todo!')
      }
    });
  }

  ngOnInit(): void {
    this.getTodos();
  }

}

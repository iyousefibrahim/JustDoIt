import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../core/services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _TodoService = inject(TodoService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);

  userForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  });

  submitform() {
    if (this.userForm.valid) {
      localStorage.setItem('userName', JSON.stringify(this.userForm.value.name));
      this._TodoService.getApiKey().subscribe({
        next: (response) => {
          localStorage.setItem('apiKey', JSON.stringify(response.apiKey))
          this._ToastrService.success(`Welcome To JustDoIt ${this.userForm.value.name}`);
          setTimeout(() => {
            this._Router.navigate(['/todos']);
          }, 2500);
        },
      })

    }
  }

}

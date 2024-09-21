import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private _HttpClient: HttpClient) { }

  addTodo(title: string, apiKey: string): Observable<any> {
    return this._HttpClient.post(baseUrl + 'api/v1/todos', {
      "title": title,
      "apiKey": apiKey
    })
  }

  markCompleted(todoId: string): Observable<any> {
    return this._HttpClient.put(baseUrl + 'api/v1/todos', {
      "todoId": todoId,
    })
  }

  deleteTodo(todoId: string): Observable<any> {
    return this._HttpClient.delete(baseUrl + 'api/v1/todos', {
      body: {
        "todoId": todoId
      }
    })
  }

  getallTodos(apiKey: string): Observable<any> {
    return this._HttpClient.get(baseUrl + `api/v1/todos/${apiKey}`)
  }

  getApiKey(): Observable<any> {
    return this._HttpClient.get(baseUrl + `api/v1/getApiKey`)
  }
}

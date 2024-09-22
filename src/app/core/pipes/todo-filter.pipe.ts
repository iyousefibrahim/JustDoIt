import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoFilter',
  standalone: true
})
export class TodoFilterPipe implements PipeTransform {

  transform(todos: any[], filter: string): any[] {
    if (!todos || !filter) {
      return todos;
    }

    return todos.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      if (filter === 'newest') {
        return dateB - dateA;
      } else if (filter === 'oldest') {
        return dateA - dateB;
      }

      return 0;
    });
  }

}

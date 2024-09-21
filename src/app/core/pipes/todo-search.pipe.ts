import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoSearch',
  standalone: true
})
export class TodoSearchPipe implements PipeTransform {

  transform(data: any[], term: string): any[] {
    if (!term) {
      return data;
    }
    return data.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
  }

}

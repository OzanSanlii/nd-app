import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any, input: any): any {
    if (input) {
       return value.filter((val: string | any[]) => val.indexOf(input)) >= 0;
     } else {
       return value;
     }
    }}

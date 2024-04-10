import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusCount'
})
export class StatusCountPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 0 && value < 10) {
      return `0${value}`;
    } else if (value < 0) {
      return 'No value found';
    } else {
      return value.toString();
    }
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nopay'
})
export class NopayPipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value.filter(i=>i.isPaid===false);
  }

}

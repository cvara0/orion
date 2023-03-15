import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(value: any[], search:string=''): any[] {

    

    const filteredValues=value.filter(i=>i.name.includes(search));

    return filteredValues;
  }

}

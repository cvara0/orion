import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], search:string=''): any[] {

    
    const filteredValues=value.filter(i=>
      {
        if(i.name)
          return i.name.includes(search);
        if(i.studentId)
          return i.studentId.includes(search);
      });

    return filteredValues;
  }

}

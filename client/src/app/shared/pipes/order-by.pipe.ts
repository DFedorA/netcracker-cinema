import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    transform(filteredList: any[], value: string): any[] {
        if (value==='name') 
            return filteredList.sort((a, b) => a[value].toLowerCase() !== b[value].toLowerCase() ?
                a[value].toLowerCase() < b[value].toLowerCase() ? -1 : 1 : 0);
        else if (value==='rating') 
            return filteredList.sort((a: any, b: any) => b[value]-a[value]);
        else return filteredList;
    }

}
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filtering'
})

export class FilteringPipe implements PipeTransform {
    transform(filteredList, value) {
        if (value=="all") return filteredList;
        else return filteredList.filter(product => {
            return product.type==value;
        });
    }
}
import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { ICategory } from '../../Model/Category';

@Pipe({
    name: 'categoryFilter'
})

@Injectable()
export class CategoryFilterPipe implements PipeTransform {

    transform(value: ICategory[], filter: string): ICategory[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: ICategory) =>
            app.CategoryCode != null && app.CategoryCode.toLocaleLowerCase().indexOf(filter) != -1
            || app.CategoryName != null && app.CategoryName.toLocaleLowerCase().indexOf(filter) != -1
//            || app.CategoryDesc != null && app.CategoryDesc.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;
    }

}
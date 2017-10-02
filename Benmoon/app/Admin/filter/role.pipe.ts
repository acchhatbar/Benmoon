import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { IRole } from '../../Model/Role';

@Pipe({
    name: 'roleFilter'
})

@Injectable()
export class RoleFilterPipe implements PipeTransform {

    transform(value: IRole[], filter: string): IRole[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IRole) =>
            app.RoleName != null && app.RoleName.toLocaleLowerCase().indexOf(filter) != -1
            || app.RoleDesc != null && app.RoleDesc.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;
    }

}
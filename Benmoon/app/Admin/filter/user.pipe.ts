import { PipeTransform, Pipe, Injectable } from '@angular/core';
import { IUser } from '../../Model/User';

@Pipe({
    name: 'userFilter'
})

@Injectable()
export class UserFilterPipe implements PipeTransform {

    transform(value: IUser[], filter: string): IUser[] {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter((app: IUser) =>
            app.LoginName != null && app.LoginName.toLocaleLowerCase().indexOf(filter) != -1
            || app.UserName != null && app.UserName.toLocaleLowerCase().indexOf(filter) != -1
            || app.Email != null && app.Email.toLocaleLowerCase().indexOf(filter) != -1
            || app.Mobile != null && app.Mobile.toLocaleLowerCase().indexOf(filter) != -1
        ) : value;
    }

}
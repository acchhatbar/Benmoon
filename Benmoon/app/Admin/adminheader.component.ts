import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
    Router,
    // import as RouterEvent to avoid confusion with the DOM Event
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';

@Component({
    selector: 'admin-header',
    templateUrl: 'app/Admin/adminheader.component.html',
})

export class AdminHeaderComponent {

}
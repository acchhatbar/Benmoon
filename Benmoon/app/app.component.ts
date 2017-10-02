import { Component } from "@angular/core"
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
    selector: "login-app",
    template: `
                <div>
                  
                   <div class='container'>
                       <router-outlet><div class="loading-overlay" *ngIf="loading">
                    <!-- show something fancy here, here with Angular 2 Material's loading bar or circle -->
                    <md-progress-bar mode="indeterminate"></md-progress-bar>
                      </div></router-outlet>
                   </div>
                </div>
                `
})

export class AppComponent {
    loading: boolean = true;

    constructor(private router: Router) {

        router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });
    }


    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        if (event instanceof NavigationEnd) {
            setTimeout(() => { this.loading = false; }, 1000)
            // this.loading = false;
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof NavigationError) {
            this.loading = false;
        }
    }
}
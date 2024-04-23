import { Component } from '@angular/core';
import { NgToastModule } from 'ng-angular-popup';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [RouterOutlet, NgToastModule]
})
export class AppComponent {
  title = 'ecommerce_admin_dashboard';
}

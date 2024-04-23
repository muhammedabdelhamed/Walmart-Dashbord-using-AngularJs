import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileSideNavComponent } from '../mobile-side-nav/mobile-side-nav.component';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
    selector: 'app-group-of-routes',
    templateUrl: './group-of-routes.component.html',
    styleUrl: './group-of-routes.component.scss',
    standalone: true,
    imports: [SideNavComponent, MobileSideNavComponent, RouterOutlet]
})
export class GroupOfRoutesComponent {

}

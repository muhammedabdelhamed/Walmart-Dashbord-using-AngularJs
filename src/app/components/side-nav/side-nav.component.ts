import { AdminAuthService } from './../../services/admin-auth.service';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrl: './side-nav.component.scss',
    standalone: true,
    imports: [RouterLink, RouterLinkActive]
})
export class SideNavComponent {
  constructor(private adminAuth:AdminAuthService){}

  signOut(){
    this.adminAuth.logout()
  }
}

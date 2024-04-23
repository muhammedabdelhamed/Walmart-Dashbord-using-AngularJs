import { Component } from '@angular/core';
import { AdminAuthService } from '../../services/admin-auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-mobile-side-nav',
    templateUrl: './mobile-side-nav.component.html',
    styleUrl: './mobile-side-nav.component.scss',
    standalone: true,
    imports: [RouterLink, RouterLinkActive]
})
export class MobileSideNavComponent {
  constructor(private adminAuth:AdminAuthService){}

  signOut(){
    this.adminAuth.logout()
  }
}


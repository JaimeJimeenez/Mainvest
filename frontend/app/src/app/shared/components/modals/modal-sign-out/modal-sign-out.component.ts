import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/core/libs/local.storage';

@Component({
  selector: 'mainvest-modal-sign-out',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-sign-out.component.html',
  styleUrls: ['./modal-sign-out.component.scss']
})
export class ModalSignOutComponent {

  constructor(private router: Router) {}

  onSignOut(): void {
    LocalStorage.eraseUser();
    this.router.navigate(['/auth/login']);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lastValueFrom } from 'rxjs';

import { ASSETS } from 'src/app/const/asset';
import { UserRepositoryImpl } from 'src/app/infraestructure/data/repositories/user.repository.impl';
import { Error } from 'src/app/core/interfaces/client';

@Component({
  selector: 'mainvest-header-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public searchFilter: string = 'Activos';
  public searchForm: FormGroup;

  public error: Error = {
    error: false,
    message: ''
  };

  constructor(private router: Router, private userRepository: UserRepositoryImpl) {
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.required])
    });
  }

  private _searchAsset(search: string): void {
    const index = ASSETS.findIndex((asset: string) => asset === search);
    if (index !== -1) {
      this.router.navigate([`/dashboard/market/asset/${search}`]);
    } else {
      this.error.error = true;
      this.error.message = `No se ha encontrado ningún activo: ${search}`;
      setTimeout(() => this.error.error = false, 2500);
    }
  }

  private async _searchUser(search: string): Promise<void> {
    try {
      const user = await lastValueFrom(this.userRepository.getUser$(search));
      this.router.navigate([`/dashboard/social/home/${user[0].id}`]);
    } catch (error: any) {
      this.error.error = true;
      this.error.message = `${error.message}: ${search}`;
      setTimeout(() => this.error.error = false, 2500);
    }
  }

  onFilterChange(filter: string): void {
    this.searchFilter = filter;
  }

  onSubmit() {
    const { search } = this.searchForm.value;

    try {
      if (this.searchFilter === 'Activos') {
        this._searchAsset(search);
      } else {
        this._searchUser(search);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

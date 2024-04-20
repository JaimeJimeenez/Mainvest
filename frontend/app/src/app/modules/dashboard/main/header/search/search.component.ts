import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor() {
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.required])
    });
  }

  onFilterChange(filter: string): void {
    this.searchFilter = filter;
  }

  onSubmit() {
    const { search } = this.searchForm.value;
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchObservableService } from 'src/app/service/observables/search-observable.service';

@Component({
  imports: [ReactiveFormsModule],
  standalone: true,
  selector: 'mainvest-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public searchForm : FormGroup;

  constructor(private searchObservable : SearchObservableService) {
    this.searchForm = new FormGroup({
      search : new FormControl('')
    });

    this.searchForm.valueChanges.subscribe(
      (searchValue) => {
        const { search } = this.searchForm.controls;
        this.searchObservable.searchItem(search.value);
      }
    )
  }

}

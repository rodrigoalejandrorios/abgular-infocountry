import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CountryService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-country',
  templateUrl: './search-country.component.html',
  styles: [],
})
export class SearchCountryComponent implements OnInit {
  constructor(private countryService: CountryService) {}

  public debouncer: Subject<string> = new Subject();
  public search: string = '';

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(300)).subscribe((valor) => {
      this.onDebounce.emit(valor);
    });
  }

  @Input() placeholder: string = '';

  @Output() onSubmit: EventEmitter<string> = new EventEmitter();
  @Output() onRecords: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  get getRecords() {
    return this.countryService.showRecords;
  }

  public goToSearch() {
    this.onSubmit.emit(this.search);
  }

  public goRecords(w: string) {
    this.onRecords.emit(w);
  }

  keyPress() {
    this.debouncer.next(this.search);
  }
}

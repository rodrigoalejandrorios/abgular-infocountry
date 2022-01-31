import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryClient } from '../../interfaces/country.interface';

@Component({
  selector: 'app-table-country',
  templateUrl: './table-country.component.html',
  styles: [],
})
export class TableCountryComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  @Input()
  public results: CountryClient[] = [];

  @Input()
  public loading: boolean = false;

  @Input()
  public notFoundActive: boolean = false;

  @Input()
  toNavigate(r: string) {
    this.router.navigate(['country', r]);
  }
}

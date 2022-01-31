import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryClient } from '../../interfaces/country.interface';
import { CountryService } from '../../services';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styles: [],
})
export class CountryComponent implements OnInit {
  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {}

  public search: string = '';
  public countryRecommended: CountryClient[] = [];
  public results: CountryClient[] = [];
  public loading: boolean = false;
  public notFoundActive: boolean = false;

  get getRecords() {
    return this.countryService.showRecords;
  }

  goRecords(w: string) {
    if (w === '') {
      return;
    }
    this.loading = true;
    this.notFoundActive = false;
    this.countryService.searchCountries(w).subscribe(
      (res) => {
        this.results = res;
        this.loading = false;
      },
      (err) => {
        this.notFoundActive = true;
        console.error(err);
      }
    );
  }

  toNavigate(r: string) {
    this.router.navigate(['country', r]);
  }

  recommended(event: string) {
    if (event === '') {
      return;
    }
    this.notFoundActive = false;
    this.loading = false;

    this.countryService.searchCountries(event).subscribe(
      (res) => (this.countryRecommended = res.splice(0, 5)),
      (err) => (this.countryRecommended = [])
    );
  }

  goToSearch(event: string) {
    this.search = event;
    if (this.search === '') {
      return;
    }
    this.loading = true;
    this.notFoundActive = false;
    this.countryService.searchCountries(this.search).subscribe(
      (res) => {
        console.log(res[0].area);
        this.results = res;
        this.loading = false;
      },
      (err) => {
        this.notFoundActive = true;
        console.error(err);
      }
    );
  }
}

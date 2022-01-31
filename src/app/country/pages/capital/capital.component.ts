import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryClient, CapitalInfo } from '../../interfaces/country.interface';
import { CountryService } from '../../services';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styles: [],
})
export class CapitalComponent implements OnInit {
  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {}

  public search: string = '';
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
    this.countryService.searchCapital(w).subscribe(
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

  toNavigate(r: string) {
    this.router.navigate(['country', r]);
  }

  recomended(event: string) {
    this.notFoundActive = false;
    this.loading = false;
    console.log(this.notFoundActive);
  }

  goToSearch(event: string) {
    this.search = event;
    if (this.search === '') {
      return;
    }
    this.loading = true;
    this.notFoundActive = false;
    this.countryService.searchCapital(this.search).subscribe(
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

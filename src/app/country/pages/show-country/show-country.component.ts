import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { CountryClient } from '../../interfaces/country.interface';
import { CountryService } from '../../services';

@Component({
  selector: 'app-show-country',
  templateUrl: './show-country.component.html',
  styles: [],
})
export class ShowCountryComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly countryService: CountryService
  ) {}

  public trans: string[] = [];
  public loading: boolean = true;
  public getCountry!: CountryClient;

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.countryService.getCountry(id)))
      .subscribe((res: CountryClient[]) => {
        this.loading = false;

        for (const key in res[0].translations) {
          this.trans.push(res[0].translations[key].official);
          //console.log(this.trans);
        }
        return (this.getCountry = res[0]);
      });
  }
}

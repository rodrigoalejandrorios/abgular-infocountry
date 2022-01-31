import { Component, OnInit } from '@angular/core';
import { CountryClient } from '../../interfaces/country.interface';
import { CountryService } from '../../services';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styles: [],
})
export class RegionComponent implements OnInit {
  constructor(private countryService: CountryService) {}

  notFoundActive: boolean = false;
  messageError: string = '';
  loading: boolean = true;
  results: CountryClient[] = [];
  activeRegion: string = '';
  regions: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

  ngOnInit(): void {}

  changeClass(region: any) {
    return region === this.activeRegion
      ? 'btn btn-primary me-2'
      : 'btn btn-outline-primary me-2';
  }

  onRegion(region: string): void {
    if (region === this.activeRegion) {
      return;
    }
    this.activeRegion = region;

    this.countryService.getRegion(region).subscribe(
      (res) => {
        this.results = res;
        this.results.sort((a, b) => a.capital[0].localeCompare(b.capital[0]));
        this.loading = false;
      },
      (err) => {
        // console.error(err);
        this.messageError = err.message;
        this.notFoundActive = true;
      }
    );
  }
}

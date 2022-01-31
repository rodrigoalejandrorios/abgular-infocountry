import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/country/services/country.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  constructor(private readonly countryService: CountryService) {}

  ngOnInit(): void {}

  getDeleteRecords(): void {
    this.countryService.deleteRecords();
  }
}

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapitalComponent } from './pages/capital/capital.component';
import { CountryComponent } from './pages/country/country.component';
import { RegionComponent } from './pages/region/region.component';
import { ShowCountryComponent } from './pages/show-country/show-country.component';
import { RouterModule } from '@angular/router';
import { TableCountryComponent } from './components/table-country/table-country.component';
import { SearchCountryComponent } from './components/search-country/search-country.component';

@NgModule({
  declarations: [
    CapitalComponent,
    CountryComponent,
    RegionComponent,
    ShowCountryComponent,
    TableCountryComponent,
    SearchCountryComponent,
  ],
  exports: [
    CapitalComponent,
    CountryComponent,
    RegionComponent,
    ShowCountryComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
})
export class CountryModule {}
